"""
Compliance summary — GET /api/compliance/summary
"""

from fastapi import APIRouter
from app.models.schemas import ComplianceSummary
from app.services.retrieval import get_all_standards

router = APIRouter()


@router.get("/compliance/summary", response_model=ComplianceSummary)
async def compliance_summary() -> ComplianceSummary:
    standards = get_all_standards()
    active = sum(1 for s in standards if s.get("status") == "active")

    # Count standards that have at least one required certification
    cert_count = sum(
        1 for s in standards
        if any(c.get("status") == "required" for c in s.get("certifications", []))
    )

    # Category distribution
    category_counts: dict = {}
    for s in standards:
        cat = s.get("category", "Other")
        category_counts[cat] = category_counts.get(cat, 0) + 1

    return ComplianceSummary(
        total_standards_indexed=len(standards),
        active_standards=active,
        certification_requirements=cert_count,
        recent_searches=5,  # from in-memory history seed
        searches_by_category=category_counts,
    )
