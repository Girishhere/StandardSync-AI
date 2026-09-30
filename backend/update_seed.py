import sys
sys.path.append('.')
from app.data.seed_data import STANDARDS_DATA, MULTILINGUAL_DEMO_MAPPINGS
import json

new_standards = []
for std in STANDARDS_DATA:
    std['publication_date'] = "2013-01-01" if "2013" in std['is_code'] else "2020-01-01"
    std['revision_year'] = int(std['is_code'].split(':')[-1]) if ':' in std['is_code'] else None
    std['amendment_count'] = 0
    std['source_name'] = "Bureau of Indian Standards"
    std['source_url'] = "https://www.bis.gov.in"
    std['know_your_standard_url'] = "https://standards.bis.gov.in/"
    std['document_url'] = None
    std['certification_status'] = "Mandatory" if any(c['status'] == 'required' for c in std.get('certifications', [])) else "Voluntary"
    std['certification_type'] = "ISI Mark" if std['certification_status'] == "Mandatory" else None
    
    std['allied_standards'] = []
    std['normative_references'] = [{"is_code": "IS 10810", "title": "Methods of test for cables", "relationship": "Normative Reference", "relevance_note": "Test methods", "source": "BIS"}] if std['category'] == 'Electrical' else []
    std['test_methods'] = []
    std['safety_standards'] = []
    std['installation_standards'] = []
    
    # keep related_standards as is, but maybe ensure they are dicts
    for r in std.get('related_standards', []):
        r['relationship'] = 'Related'
        r['source'] = 'BIS'

    std['evidence_source'] = "BIS Portal"
    std['last_verified'] = "2026-09-29T12:00:00Z"
    std['data_origin'] = "DEMO"
    std['verification_status'] = "DEMO"
    std['faiss_id'] = f"faiss-{std['id']}"
    std['is_demo'] = True
    
    new_standards.append(std)

def format_dict(d, indent=4):
    import json
    return json.dumps(d, indent=indent)

output = f'''"""
DEMO SEED DATA for StandardSync AI.

⚠️  ALL RECORDS ARE DEMO DATA unless explicitly noted.
⚠️  Standard numbers and titles are based on publicly known BIS index information.
⚠️  Clause numbers, evidence text, and source URLs are DEMO PLACEHOLDERS.
⚠️  Replace with verified BIS document data before production deployment.

Data shape must remain stable — the frontend and search service depend on it.
To replace: update this file (or MongoDB) without changing key names.
"""

STANDARDS_DATA = {json.dumps(new_standards, indent=4)}

MULTILINGUAL_DEMO_MAPPINGS = {json.dumps(MULTILINGUAL_DEMO_MAPPINGS, indent=4, ensure_ascii=False)}
'''

with open('app/data/seed_data.py', 'w', encoding='utf-8') as f:
    f.write(output)

print("Updated seed_data.py")
