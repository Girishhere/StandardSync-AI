"""
History & Saved Standards Service

In-memory store for the demo prototype.
Replace with MongoDB queries when DEMO_MODE=false and DB is available.
"""

from __future__ import annotations

import uuid
from datetime import datetime
from typing import List, Optional

from app.models.schemas import Certification, HistoryEntry, SavedStandard

# ── In-memory stores ──────────────────────────────────────────────────────────

_history: List[HistoryEntry] = [
    HistoryEntry(
        id="hist-001",
        date=datetime(2026, 9, 29, 10, 15),
        query="Hospital grade copper wire",
        matched_standard="IS 8130:2013",
        matched_title="Conductors for Insulated Electrical Cables and Flexible Cords",
        score=0.91,
        status="verified",
    ),
    HistoryEntry(
        id="hist-002",
        date=datetime(2026, 9, 28, 14, 42),
        query="Electrical cable for buildings",
        matched_standard="IS 694:2010",
        matched_title="PVC Insulated Cables for Working Voltages up to and including 1100 V",
        score=0.84,
        status="verified",
    ),
    HistoryEntry(
        id="hist-003",
        date=datetime(2026, 9, 27, 9, 5),
        query="Stainless steel drinking water tank",
        matched_standard="IS 3779:1999",
        matched_title="Stainless Steel Sinks for Domestic Purposes",
        score=0.71,
        status="verified",
    ),
    HistoryEntry(
        id="hist-004",
        date=datetime(2026, 9, 26, 16, 30),
        query="Drone navigation system",
        matched_standard=None,
        matched_title=None,
        score=0.38,
        status="not_found",
    ),
    HistoryEntry(
        id="hist-005",
        date=datetime(2026, 9, 25, 11, 0),
        query="Safety helmet for industrial workers",
        matched_standard="IS 2925:1984",
        matched_title="Industrial Safety Helmets",
        score=0.87,
        status="verified",
    ),
]

_saved: List[SavedStandard] = [
    SavedStandard(
        id="saved-001",
        is_code="IS 8130:2013",
        title="Conductors for Insulated Electrical Cables and Flexible Cords",
        category="Electrical",
        source="Bureau of Indian Standards (BIS)",
        saved_date=datetime(2026, 9, 29, 10, 20),
        certifications=[
            Certification(name="BIS Product Certification (ISI Mark)", status="required")
        ],
        is_demo=True,
    ),
    SavedStandard(
        id="saved-002",
        is_code="IS 2925:1984",
        title="Industrial Safety Helmets",
        category="Safety",
        source="Bureau of Indian Standards (BIS)",
        saved_date=datetime(2026, 9, 25, 11, 5),
        certifications=[
            Certification(name="BIS Product Certification (ISI Mark)", status="required")
        ],
        is_demo=True,
    ),
]


# ── History operations ─────────────────────────────────────────────────────────


def get_history() -> List[HistoryEntry]:
    return sorted(_history, key=lambda h: h.date, reverse=True)


def add_history_entry(
    query: str,
    matched_standard: Optional[str],
    matched_title: Optional[str],
    score: Optional[float],
    status: str,
) -> HistoryEntry:
    entry = HistoryEntry(
        id=f"hist-{uuid.uuid4().hex[:8]}",
        date=datetime.utcnow(),
        query=query,
        matched_standard=matched_standard,
        matched_title=matched_title,
        score=score,
        status=status,
    )
    _history.insert(0, entry)
    return entry


def delete_history_entry(entry_id: str) -> bool:
    global _history
    before = len(_history)
    _history = [h for h in _history if h.id != entry_id]
    return len(_history) < before


# ── Saved standards operations ─────────────────────────────────────────────────


def get_saved_standards() -> List[SavedStandard]:
    return sorted(_saved, key=lambda s: s.saved_date, reverse=True)


def save_standard(std_id: str, standard_data: dict) -> Optional[SavedStandard]:
    # Avoid duplicates
    if any(s.is_code == standard_data.get("is_code") for s in _saved):
        return None  # Already saved

    saved = SavedStandard(
        id=f"saved-{uuid.uuid4().hex[:8]}",
        is_code=standard_data.get("is_code", ""),
        title=standard_data.get("title", ""),
        category=standard_data.get("category", ""),
        source=standard_data.get("source", "BIS"),
        saved_date=datetime.utcnow(),
        certifications=[Certification(**c) for c in standard_data.get("certifications", [])],
        is_demo=standard_data.get("is_demo", True),
    )
    _saved.append(saved)
    return saved


def remove_saved_standard(saved_id: str) -> bool:
    global _saved
    before = len(_saved)
    _saved = [s for s in _saved if s.id != saved_id]
    return len(_saved) < before
