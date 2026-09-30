import sys
import os
import json

# Ensure backend directory is in path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app.services.retrieval import search_standards

queries = [
    ('hospital grade copper wire', 'en'),
    ('अस्पताल में उपयोग के लिए कॉपर वायर', 'hi'),
    ('ఆసుపత్రిలో ఉపయోగించే కాపర్ వైర్', 'te'),
    ('மருத்துவமனை பயன்பாட்டிற்கான செம்பு கம்பி', 'ta'),
    ('blockchain cryptocurrency token', 'en'),
    ('random xyz procurement item', 'en')
]

results = []
for q, lang in queries:
    try:
        result = search_standards(query=q, language=lang)
        is_code = result.standard.is_code if result.standard else 'None'
        results.append({"q": q, "lang": lang, "found": result.found, "score": result.score, "standard": is_code})
    except Exception as e:
        results.append({"q": q, "lang": lang, "error": str(e)})

with open("test_results.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
