"""
Pydantic schemas for StandardSync AI.

All API request/response types are defined here.
"""

from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


# ── Standard schemas ──────────────────────────────────────────────────────────

class Certification(BaseModel):
    name: str
    status: str  # "required" | "applicable" | "not_applicable" | "not_identified"
    note: Optional[str] = None


class RelatedStandard(BaseModel):
    is_code: str
    title: str
    relationship: str = "Related"
    relevance_note: str = ""
    score: Optional[float] = None
    source: str = "Bureau of Indian Standards"


class Evidence(BaseModel):
    source_document: str
    clause: str
    text: str
    source_url: Optional[str] = None


class Standard(BaseModel):
    id: str
    is_code: str
    title: str
    description: str
    category: str
    application: str
    source: str
    status: str  # "active" | "withdrawn" | "under_revision"
    
    publication_date: Optional[str] = None
    revision_year: Optional[int] = None
    amendment_count: int = 0
    source_name: str = "Bureau of Indian Standards"
    source_url: Optional[str] = None
    know_your_standard_url: Optional[str] = None
    document_url: Optional[str] = None
    
    certification_status: Optional[str] = None
    certification_type: Optional[str] = None
    
    allied_standards: List[RelatedStandard] = []
    normative_references: List[RelatedStandard] = []
    test_methods: List[RelatedStandard] = []
    safety_standards: List[RelatedStandard] = []
    installation_standards: List[RelatedStandard] = []
    related_standards: List[RelatedStandard] = []
    
    certifications: List[Certification] = []
    evidence: Evidence
    evidence_source: Optional[str] = None
    last_verified: Optional[datetime] = None
    data_origin: str = "DEMO"  # "DEMO" | "BIS_OFFICIAL"
    verification_status: str = "DEMO"  # "DEMO" | "VERIFIED" | "NEEDS_REVIEW"
    faiss_id: Optional[str] = None
    
    is_demo: bool = True  # Always flag demo/unverified records


# ── Search schemas ─────────────────────────────────────────────────────────────

class SearchRequest(BaseModel):
    query: str = Field(..., min_length=3, max_length=500)
    language: str = Field(default="en", pattern="^(en|hi|te|ta|bn|mr|gu|kn)$")

    class Config:
        json_schema_extra = {
            "example": {
                "query": "hospital grade copper wire",
                "language": "en"
            }
        }


class SearchResult(BaseModel):
    query: str
    translated_query: Optional[str] = None
    found: bool
    match_status: str
    standard: Optional[Standard] = None
    score: Optional[float] = None
    certifications: List[Certification] = []
    related_standards: List[RelatedStandard] = []
    evidence: Optional[Evidence] = None
    why_matched: Optional[str] = None
    latency_ms: float = 0.0
    demo_mode: bool = True
    threshold_used: float = 0.60
    suggestions: List[str] = []


# ── History schemas ───────────────────────────────────────────────────────────

class HistoryEntry(BaseModel):
    id: str
    date: datetime
    query: str
    matched_standard: Optional[str] = None
    matched_title: Optional[str] = None
    score: Optional[float] = None
    status: str


# ── Saved standard schemas ────────────────────────────────────────────────────

class SavedStandard(BaseModel):
    id: str
    is_code: str
    title: str
    category: str
    source: str
    saved_date: datetime
    certifications: List[Certification] = []
    is_demo: bool = True


# ── Compliance schemas ────────────────────────────────────────────────────────

class ComplianceSummary(BaseModel):
    total_standards_indexed: int
    active_standards: int
    certification_requirements: int
    recent_searches: int
    searches_by_category: dict


# ── Source schemas ────────────────────────────────────────────────────────────

class DataSource(BaseModel):
    name: str
    description: str
    url: Optional[str] = None
    type: str
    status: str
