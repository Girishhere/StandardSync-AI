"""
BIS Source Adapter / Client

Provides an interface to retrieve standard metadata from official BIS sources.
In production, this would connect to the official 'Know Your Standard' portal or an authorized API.
For now, it falls back to parsing verified metadata exports or the demo seed data, 
simulating the retrieval of real BIS records.
"""

from typing import Optional, Dict, Any, List
from datetime import datetime

class BISClient:
    """
    Client for interacting with BIS data sources.
    """
    
    def __init__(self, use_demo: bool = True):
        self.use_demo = use_demo
        # In a real scenario, initialize HTTP client here
    
    def fetch_standard_by_code(self, is_code: str) -> Optional[Dict[str, Any]]:
        """
        Fetch standard metadata from BIS using its IS Code.
        """
        if self.use_demo:
            return self._fetch_from_seed(is_code)
        
        # TODO: Implement real HTTP call to BIS public search or verified dataset
        return self._fetch_from_seed(is_code)
    
    def _fetch_from_seed(self, is_code: str) -> Optional[Dict[str, Any]]:
        # For prototype purposes, even when "real", we fall back to seed data if API isn't implemented
        from app.data.seed_data import STANDARDS_DATA
        for std in STANDARDS_DATA:
            if std["is_code"] == is_code:
                return std
        return None

def get_bis_client(use_demo: bool = True) -> BISClient:
    return BISClient(use_demo=use_demo)
