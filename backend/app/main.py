"""
StandardSync AI — FastAPI Application Entry Point

Architecture:
  Next.js → FastAPI → [DemoRetriever | FAISS + SentenceTransformers] → MongoDB (optional)

DEMO_MODE=true (default): No external dependencies. Safe for SIH demo.
"""

import logging
import time

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import get_settings
from app.api import search, standards, history, saved, compliance

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(name)s — %(message)s",
)
logger = logging.getLogger(__name__)
settings = get_settings()


# ── App factory ────────────────────────────────────────────────────────────────

app = FastAPI(
    title="StandardSync AI",
    description="AI-Powered Recommendation Engine for Applicable Indian Standards — SIH 2026",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS ───────────────────────────────────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Request timing middleware ──────────────────────────────────────────────────

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    elapsed = (time.perf_counter() - start) * 1000
    response.headers["X-Process-Time-Ms"] = str(round(elapsed, 1))
    return response


# ── Global exception handler ───────────────────────────────────────────────────

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.exception("Unhandled exception on %s %s", request.method, request.url)
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred. Please try again."},
    )


# ── Routers ────────────────────────────────────────────────────────────────────

app.include_router(search.router, prefix="/api", tags=["Search"])
app.include_router(standards.router, prefix="/api", tags=["Standards"])
app.include_router(history.router, prefix="/api", tags=["History"])
app.include_router(saved.router, prefix="/api", tags=["Saved"])
app.include_router(compliance.router, prefix="/api", tags=["Compliance"])


# ── Health check ───────────────────────────────────────────────────────────────

@app.get("/health", tags=["Health"])
async def health():
    return {
        "status": "ok",
        "demo_mode": settings.demo_mode,
        "similarity_threshold": settings.similarity_threshold,
        "version": "1.0.0",
    }


# ── Startup ────────────────────────────────────────────────────────────────────

@app.on_event("startup")
async def startup_event():
    logger.info("=" * 60)
    logger.info("StandardSync AI — SIH 2026 Prototype")
    logger.info("DEMO_MODE    : %s", settings.demo_mode)
    logger.info("THRESHOLD    : %.2f", settings.similarity_threshold)
    logger.info("FAISS_TOP_K  : %d", settings.faiss_top_k)
    logger.info("=" * 60)

    if not settings.demo_mode:
        # Pre-load embedding model and FAISS index once at startup
        from app.services.retrieval import ensure_faiss_loaded
        ok = ensure_faiss_loaded()
        if ok:
            logger.info("FAISS index and embedding model loaded successfully.")
        else:
            logger.warning("FAISS/model load failed — will use demo retriever as fallback.")
    else:
        # Warm the demo retriever
        from app.services.retrieval import _get_demo_retriever
        _get_demo_retriever()
        logger.info("Demo retriever warmed up.")
