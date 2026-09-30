"""
Retrieval Service — StandardSync AI

Pipeline:
  Query → Embedding → FAISS Top-K → Similarity Threshold → Metadata Lookup → Result

DEMO_MODE=true: Uses TF-IDF-like keyword similarity with seed data (no GPU, no model download).
DEMO_MODE=false: Uses sentence-transformers + FAISS (requires model & index).

The threshold is always read from settings — never hardcoded here.
"""

from __future__ import annotations

import logging
import math
import re
import time
from typing import List, Optional, Tuple

from app.config import get_settings
from app.data.seed_data import MULTILINGUAL_DEMO_MAPPINGS, STANDARDS_DATA
from app.models.schemas import (
    Certification,
    Evidence,
    RelatedStandard,
    SearchResult,
    Standard,
)
from app.services.bis import BISAdapter

logger = logging.getLogger(__name__)
settings = get_settings()


# ── Helpers ────────────────────────────────────────────────────────────────────


def _sanitize(text: str) -> str:
    """Strip control chars and excessively long queries."""
    text = text.strip()
    text = re.sub(r"[^\w\s\-\(\)\.\,\/\:]+", " ", text)
    return text[:500]


def _tokenize(text: str) -> List[str]:
    return re.findall(r"\w+", text.lower())


# High-value procurement/material terms — matching these carries more weight
_DOMAIN_TERMS = {
    "copper": 3.0, "wire": 2.5, "cable": 2.5, "insulated": 2.0, "electrical": 2.0,
    "conductor": 3.0, "flexible": 1.5, "cord": 1.5, "hospital": 2.5, "grade": 2.0,
    "building": 1.8, "wiring": 2.5, "installation": 1.5, "industrial": 2.0,
    "pvc": 2.5, "pipe": 2.5, "water": 2.0, "supply": 1.5, "plastic": 1.5,
    "steel": 2.5, "stainless": 2.5, "structural": 2.0, "mild": 1.8,
    "helmet": 3.0, "safety": 2.5, "hard": 1.5, "hat": 1.5, "ppe": 2.5, "protection": 2.0,
    "led": 2.5, "light": 2.0, "luminaire": 2.5, "lamp": 2.0, "lighting": 1.8,
    "bolt": 2.5, "nut": 2.0, "screw": 2.0, "fastener": 2.5, "threaded": 2.0,
    "drinking": 2.0, "packaged": 2.0, "bottled": 2.0,
    "rubber": 2.5, "glove": 2.5, "insulating": 2.0,
    "drainage": 2.0, "soil": 1.5, "waste": 1.5, "discharge": 1.5,
    "tank": 2.0, "sink": 2.5, "domestic": 1.5,
}


def _demo_similarity(query_tokens: List[str], doc_tokens: List[str]) -> float:
    """
    Weighted recall-dominant similarity for demo mode.

    We measure: how much of the query (by term weight) is covered by the document.
    A light uniqueness bonus rewards fewer irrelevant doc terms.

    Score is in [0, 1].
    """
    if not query_tokens or not doc_tokens:
        return 0.0

    doc_set = set(doc_tokens)
    q_set = set(query_tokens)

    if not (q_set & doc_set):
        return 0.0

    def weight(tok: str) -> float:
        return _DOMAIN_TERMS.get(tok, 1.0)

    # Weighted recall: portion of query weight matched in doc
    query_weight = sum(weight(t) for t in q_set)
    matched_weight = sum(weight(t) for t in q_set if t in doc_set)

    if query_weight == 0:
        return 0.0

    recall = matched_weight / query_weight

    # Token overlap ratio (simple count, for bonus)
    match_ratio = len(q_set & doc_set) / len(q_set)

    # Final score: recall with a bonus when majority of tokens match
    score = recall
    if match_ratio >= 0.5:
        score = min(score + 0.15, 1.0)
    if match_ratio >= 0.75:
        score = min(score + 0.10, 1.0)

    # Scale to realistic demo range [0.60, 0.97] so scores don't show as 100%
    score = 0.60 + score * 0.37

    return round(min(score, 0.97), 4)


def _build_why_matched(query: str, standard: dict, score: float) -> str:
    """
    Generate a human-readable explanation of why this standard was matched.
    Derived from the standard's application and description fields only —
    no fabricated facts.
    """
    return (
        f"The procurement requirement '{query}' aligns with {standard['is_code']}: "
        f"{standard['title']}. {standard['application']} "
        f"The retrieval confidence score was {round(score * 100)}%, "
        f"meeting the configured threshold."
    )


def _no_match_suggestions(query: str) -> List[str]:
    tokens = _tokenize(query)
    suggestions = [
        "Try describing the material (e.g., copper, steel, PVC, rubber).",
        "Include the intended use or application (e.g., building wiring, water supply).",
        "Specify the product type more precisely (e.g., cable, pipe, helmet, tank).",
        "Check if the product has a common industry classification.",
    ]
    if len(tokens) <= 2:
        suggestions.insert(0, "Your query is very short — add more context about the product.")
    return suggestions


def _dict_to_standard(d: dict) -> Standard:
    return Standard(**d)


# ── Demo retrieval ─────────────────────────────────────────────────────────────


class DemoRetriever:
    """
    Deterministic retrieval using keyword similarity over seed data.
    Used when DEMO_MODE=true. No external dependencies required.
    """

    def __init__(self) -> None:
        self._index: List[Tuple[dict, List[str]]] = []
        self._build_index()
        logger.info("DemoRetriever: index built with %d records", len(self._index))

    def _build_index(self) -> None:
        for std in STANDARDS_DATA:
            search_text = std.get("search_text", "")
            all_text = " ".join([
                std.get("title", ""),
                std.get("description", ""),
                std.get("application", ""),
                std.get("category", ""),
                search_text,
            ])
            tokens = _tokenize(all_text)
            self._index.append((std, tokens))

    def search(self, query: str, top_k: int = 5) -> List[Tuple[dict, float]]:
        query_tokens = _tokenize(query)
        scored = [
            (std, _demo_similarity(query_tokens, doc_tokens))
            for std, doc_tokens in self._index
        ]
        scored.sort(key=lambda x: x[1], reverse=True)
        return scored[:top_k]


# ── FAISS retriever (loaded lazily when DEMO_MODE=false) ──────────────────────


class FAISSRetriever:
    """
    Production retriever: sentence-transformers embedding + FAISS ANN search.
    Loaded once at startup. Not used in DEMO_MODE.
    """

    _model = None
    _index = None
    _id_map: List[str] = []

    @classmethod
    def load(cls, model_name: str) -> None:
        try:
            from sentence_transformers import SentenceTransformer
            import faiss
            import numpy as np

            logger.info("Loading embedding model: %s", model_name)
            cls._model = SentenceTransformer(model_name)

            # Build index from seed data (in production, load a persisted index)
            texts = []
            ids = []
            for std in STANDARDS_DATA:
                search_text = " ".join([
                    std.get("title", ""),
                    std.get("description", ""),
                    std.get("application", ""),
                    std.get("search_text", ""),
                ])
                texts.append(search_text)
                ids.append(std["id"])

            logger.info("Encoding %d documents...", len(texts))
            embeddings = cls._model.encode(texts, normalize_embeddings=True)
            dim = embeddings.shape[1]

            cls._index = faiss.IndexFlatIP(dim)  # Inner product = cosine for normalized vecs
            cls._index.add(np.array(embeddings, dtype="float32"))
            cls._id_map = ids
            logger.info("FAISS index built with %d vectors (dim=%d)", len(ids), dim)
        except ImportError as e:
            logger.error("FAISS/sentence-transformers not available: %s. Falling back to demo mode.", e)
            raise

    @classmethod
    def search(cls, query: str, top_k: int = 5) -> List[Tuple[str, float]]:
        import numpy as np

        if cls._model is None or cls._index is None:
            raise RuntimeError("FAISSRetriever not loaded")

        vec = cls._model.encode([query], normalize_embeddings=True)
        scores, indices = cls._index.search(np.array(vec, dtype="float32"), top_k)
        results = []
        for score, idx in zip(scores[0], indices[0]):
            if idx < len(cls._id_map):
                results.append((cls._id_map[idx], float(score)))
        return results


# ── Metadata lookup ────────────────────────────────────────────────────────────


_STANDARDS_BY_ID = {s["id"]: s for s in STANDARDS_DATA}


def get_standard_by_id(std_id: str) -> Optional[dict]:
    return _STANDARDS_BY_ID.get(std_id)


def get_all_standards() -> List[dict]:
    return STANDARDS_DATA


# ── Singleton retriever instances ──────────────────────────────────────────────

_demo_retriever: Optional[DemoRetriever] = None
_faiss_loaded: bool = False


def _get_demo_retriever() -> DemoRetriever:
    global _demo_retriever
    if _demo_retriever is None:
        _demo_retriever = DemoRetriever()
    return _demo_retriever


def ensure_faiss_loaded() -> bool:
    global _faiss_loaded
    if _faiss_loaded:
        return True
    try:
        FAISSRetriever.load(settings.embedding_model)
        _faiss_loaded = True
        return True
    except Exception:
        logger.warning("FAISS load failed — will fall back to DEMO_MODE for this request.")
        return False


# ── Main search function ───────────────────────────────────────────────────────


def search_standards(query: str, language: str = "en") -> SearchResult:
    """
    Entry point for the RAG pipeline.

    1. Sanitize + translate query.
    2. Embed or tokenize query.
    3. Retrieve top-K candidates.
    4. Apply threshold.
    5. Return evidence-grounded result or no-match.
    """
    start = time.perf_counter()
    translated_query: Optional[str] = None

    # ── Multilingual: translate non-English queries in demo mode ──────────────
    if language != "en":
        mapped = MULTILINGUAL_DEMO_MAPPINGS.get(query.strip())
        if mapped:
            translated_query = query
            query = mapped
            logger.info("Translated '%s' → '%s'", translated_query, query)
        else:
            # Best-effort: run as-is (will likely score low → no-match)
            logger.info("No demo mapping for language=%s query, running as-is.", language)

    query = _sanitize(query)

    threshold = settings.similarity_threshold
    top_k = settings.faiss_top_k
    use_demo = settings.demo_mode

    # ── Retrieval ──────────────────────────────────────────────────────────────
    if not use_demo:
        faiss_ok = ensure_faiss_loaded()
        if faiss_ok:
            try:
                raw = FAISSRetriever.search(query, top_k=top_k)
                candidates: List[Tuple[dict, float]] = []
                for std_id, score in raw:
                    std = get_standard_by_id(std_id)
                    if std:
                        candidates.append((std, score))
            except Exception as e:
                logger.error("FAISS search failed: %s — falling back to demo retriever.", e)
                retriever = _get_demo_retriever()
                candidates = retriever.search(query, top_k=top_k)
        else:
            retriever = _get_demo_retriever()
            candidates = retriever.search(query, top_k=top_k)
    else:
        retriever = _get_demo_retriever()
        candidates = retriever.search(query, top_k=top_k)

    # ── Threshold filtering ────────────────────────────────────────────────────
    best_std: Optional[dict] = None
    best_score: float = 0.0

    if candidates:
        best_std, best_score = candidates[0]
        if best_score < threshold:
            best_std = None  # Reject — below threshold, never fabricate

    elapsed_ms = (time.perf_counter() - start) * 1000

    # ── No-match response ──────────────────────────────────────────────────────
    if best_std is None:
        return SearchResult(
            query=translated_query or query,
            translated_query=translated_query,
            found=False,
            match_status="No standard found",
            score=round(best_score, 4) if candidates else None,
            latency_ms=round(elapsed_ms, 1),
            demo_mode=use_demo,
            threshold_used=threshold,
            suggestions=_no_match_suggestions(query),
        )

    # ── Build evidence-grounded result ─────────────────────────────────────────
    # We must copy the dict so we don't mutate the global seed data cache
    best_std_copy = best_std.copy()
    
    logger.info("Before enrich: %s", best_std_copy.get("know_your_standard_url"))
    # Enrich with BISAdapter: set proper portal search URL + verification status
    best_std_copy = BISAdapter.enrich(best_std_copy)
    logger.info("After enrich: %s", best_std_copy.get("know_your_standard_url"))
    
    best_std_copy["verification_status"] = BISAdapter.verification_status(best_std_copy)

    standard_obj = _dict_to_standard(best_std_copy)
    logger.info("Standard object URL: %s", standard_obj.know_your_standard_url)
    
    why = _build_why_matched(translated_query or query, best_std_copy, best_score)

    # Related standards from database (already part of the record)
    related = [RelatedStandard(**r) for r in best_std_copy.get("related_standards", [])]

    return SearchResult(
        query=translated_query or query,
        translated_query=translated_query,
        found=True,
        match_status="Applicable standard identified",
        standard=standard_obj,
        score=round(best_score, 4),
        certifications=standard_obj.certifications,
        related_standards=related,
        evidence=standard_obj.evidence,
        why_matched=why,
        latency_ms=round(elapsed_ms, 1),
        demo_mode=use_demo,
        threshold_used=threshold,
    )
