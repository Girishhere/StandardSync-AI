import sys
sys.path.insert(0, '.')
from app.services.bis.adapter import BISAdapter
from app.data.seed_data import STANDARDS_DATA

print(f"Testing BISAdapter on {len(STANDARDS_DATA)} records:")
for s in STANDARDS_DATA:
    url = BISAdapter.portal_url(s["is_code"])
    status = BISAdapter.verification_status(s)
    valid = BISAdapter.validate_code(s["is_code"])
    print(f"  {s['id']} {s['is_code']}: valid={valid}, status={status}")
    print(f"    URL: {url}")
