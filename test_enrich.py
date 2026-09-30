import sys
sys.path.insert(0, './backend')
from app.services.bis.adapter import BISAdapter
from app.data.seed_data import STANDARDS_DATA
rec = STANDARDS_DATA[0].copy()
print("Before:", rec["know_your_standard_url"])
rec = BISAdapter.enrich(rec)
print("After:", rec["know_your_standard_url"])
