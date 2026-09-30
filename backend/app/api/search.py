"""
Search API router — POST /api/search
"""

import logging

from fastapi import APIRouter, HTTPException
from app.models.schemas import SearchRequest, SearchResult
from app.services.retrieval import search_standards
from app.services.store import add_history_entry

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/search", response_model=SearchResult)
async def search(request: SearchRequest) -> SearchResult:
    """
    Accept a natural-language procurement requirement and return
    the most applicable Indian Standard (or a clear no-match response).
    """
    try:
        result = search_standards(query=request.query, language=request.language)

        # Persist to history
        add_history_entry(
            query=request.query,
            matched_standard=result.standard.is_code if result.standard else None,
            matched_title=result.standard.title if result.standard else None,
            score=result.score,
            status="verified" if result.found else "not_found",
        )

        return result
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        logger.exception("Search error: %s", e)
        raise HTTPException(status_code=500, detail="Search service unavailable. Please try again.")
