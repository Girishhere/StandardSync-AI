"""
History API router — GET /api/history, DELETE /api/history/{id}
"""

from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import HistoryEntry
from app.services.store import get_history, delete_history_entry

router = APIRouter()


@router.get("/history", response_model=List[HistoryEntry])
async def list_history() -> List[HistoryEntry]:
    return get_history()


@router.delete("/history/{entry_id}")
async def delete_history(entry_id: str) -> dict:
    deleted = delete_history_entry(entry_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="History entry not found.")
    return {"deleted": True}
