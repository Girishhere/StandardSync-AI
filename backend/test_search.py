from app.services.retrieval import search_standards

tests = [
    ("hospital grade copper wire", "en"),
    ("electrical cable for buildings", "en"),
    ("stainless steel drinking water tank", "en"),
    ("safety helmet for industrial workers", "en"),
    ("LED light for office building", "en"),
    ("mild steel pipe for water line", "en"),
    ("autonomous drone navigation algorithm", "en"),
    ("blockchain cryptocurrency exchange", "en"),
]

for query, lang in tests:
    r = search_standards(query, lang)
    if r.found:
        status = "IS: {} Score: {}".format(r.standard.is_code, r.score)
    else:
        status = "NO MATCH  Score: {}".format(r.score)
    label = "FOUND" if r.found else "NONE "
    print("  [{}] {:<45} -> {}".format(label, query[:45], status))
