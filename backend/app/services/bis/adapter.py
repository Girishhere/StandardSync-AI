"""
BIS Adapter — StandardSync AI

Legal integration approach:
  - BIS Standards Portal (standards.bis.gov.in) has NO public REST API.
  - This adapter provides link-based integration only:
      1. Construct deep-link URLs to official BIS standard pages.
      2. Validate IS code format.
      3. Determine verification_status from record metadata.
  - NEVER scrape or automate requests to the BIS portal.
  - NEVER fabricate IS codes, clauses, or certification data.

Future-proof: This interface is stable. A real BIS API integration
can replace the link construction logic without changing the signature.
"""

from __future__ import annotations

import re
import logging
from typing import Optional
from urllib.parse import urlencode, quote_plus

logger = logging.getLogger(__name__)

_IS_CODE_PATTERN = re.compile(
    r"^IS\s+\d+[\w\s\(\)\-\.]*(?::\d{4})?$",
    re.IGNORECASE,
)

BIS_PORTAL_BASE = "https://standards.bis.gov.in"
BIS_SEARCH_PATH = "/search-result"


def validate_is_code(is_code: str) -> bool:
    if not is_code or not isinstance(is_code, str):
        return False
    return bool(_IS_CODE_PATTERN.match(is_code.strip()))


def get_portal_search_url(query: str) -> str:
    params = urlencode({"searchText": query}, quote_via=quote_plus)
    return f"{BIS_PORTAL_BASE}{BIS_SEARCH_PATH}?{params}"


def get_is_code_search_url(is_code: str) -> str:
    return get_portal_search_url(is_code)


def get_verification_status(record: dict) -> str:
    if record.get("is_demo", False):
        return "DEMO"
    if record.get("data_origin", "DEMO") == "DEMO":
        return "DEMO"
    existing = record.get("verification_status")
    if existing and existing != "DEMO":
        return existing
    return "NEEDS_REVIEW"


def enrich_standard_urls(record: dict) -> dict:
    is_code = record.get("is_code", "")
    if is_code:
        record["know_your_standard_url"] = get_is_code_search_url(is_code)
    existing_src = record.get("source_url", "")
    if not existing_src or existing_src in ("https://www.bis.gov.in", ""):
        record["source_url"] = BIS_PORTAL_BASE
    return record


class BISAdapter:
    @classmethod
    def validate_code(cls, is_code: str) -> bool:
        return validate_is_code(is_code)

    @classmethod
    def portal_url(cls, is_code: str) -> str:
        return get_is_code_search_url(is_code)

    @classmethod
    def search_url(cls, query: str) -> str:
        return get_portal_search_url(query)

    @classmethod
    def verification_status(cls, record: dict) -> str:
        return get_verification_status(record)

    @classmethod
    def enrich(cls, record: dict) -> dict:
        return enrich_standard_urls(record)
