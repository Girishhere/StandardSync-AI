"""
Saved Standards API router
POST /api/standards/{id}/save
GET /api/saved
DELETE /api/saved/{id}
"""

from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import SavedStandard
from app.services.store import get_saved_standards, save_standard, remove_saved_standard
from app.services.retrieval import get_standard_by_id

router = APIRouter()


@router.get("/saved", response_model=List[SavedStandard])
async def list_saved() -> List[SavedStandard]:
    return get_saved_standards()


@router.post("/standards/{std_id}/save", response_model=SavedStandard)
async def save_std(std_id: str) -> SavedStandard:
    std = get_standard_by_id(std_id)
    if not std:
        raise HTTPException(status_code=404, detail=f"Standard '{std_id}' not found.")
    result = save_standard(std_id, std)
    if result is None:
        raise HTTPException(status_code=409, detail="Standard is already saved.")
    return result


@router.delete("/saved/{saved_id}")
async def remove_saved(saved_id: str) -> dict:
    removed = remove_saved_standard(saved_id)
    if not removed:
        raise HTTPException(status_code=404, detail="Saved standard not found.")
    return {"removed": True}
