"""
Standards API router — GET /api/standards, GET /api/standards/{id}
"""

from fastapi import APIRouter, HTTPException
from typing import List, Optional
from app.models.schemas import Standard
from app.services.retrieval import get_all_standards, get_standard_by_id, _dict_to_standard

router = APIRouter()


@router.get("/standards", response_model=List[Standard])
async def list_standards(category: Optional[str] = None) -> List[Standard]:
    """List all indexed standards, optionally filtered by category."""
    standards = get_all_standards()
    if category:
        standards = [s for s in standards if s.get("category", "").lower() == category.lower()]
    return [_dict_to_standard(s) for s in standards]


@router.get("/standards/{std_id}", response_model=Standard)
async def get_standard(std_id: str) -> Standard:
    """Get a single standard by its internal ID."""
    std = get_standard_by_id(std_id)
    if not std:
        raise HTTPException(status_code=404, detail=f"Standard '{std_id}' not found.")
    return _dict_to_standard(std)
