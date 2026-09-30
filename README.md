# StandardSync AI

**AI-Powered Recommendation Engine for Identifying Applicable Indian Standards**

> SIH 2026 · Problem SIH26108 · Theme: Smart Automation · Team: Shadows

---

## What It Does

StandardSync AI accepts a plain-language procurement requirement (e.g., *"hospital grade copper wire"*) and returns the most applicable Indian Standard (IS code) with:

- Relevance/confidence score
- Source evidence and clause reference
- Mandatory certification requirements
- Allied/related standards
- Clear explanation of why the standard was matched

**When confidence is insufficient, the system says so instead of fabricating a result.**

---

## Quick Start (Demo Mode — No External APIs Required)

### Prerequisites

- Python 3.11+
- Node.js 18+
- npm

### 1. Backend

```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install fastapi uvicorn[standard] pydantic pydantic-settings python-dotenv
cp .env.example .env
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

Backend runs at: **http://localhost:8000**

API docs: http://localhost:8000/docs

### 2. Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local   # or create .env.local with NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
```

Frontend runs at: **http://localhost:3000**

## Production Deployment

We recommend **Vercel** for the frontend and **Render** for the backend. Both offer free tiers suitable for a hackathon prototype.

### 1. Deploy the Backend (Render)

1. Go to [Render](https://render.com/) and create a new **Web Service**.
2. Connect this GitHub repository.
3. Configure the service:
   - **Root Directory**: `backend`
   - **Environment**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add Environment Variables:
   - `PYTHON_VERSION` = `3.11.0`
   - `DEMO_MODE` = `true`
   - `ALLOWED_ORIGINS` = `*` *(or explicitly list your Vercel URL once generated)*
5. Click **Deploy**. Note your public URL (e.g., `https://standardsync-api.onrender.com`).

*(Alternatively, if you use Render's Blueprint feature, just connect your repo and it will automatically read `render.yaml`)*

### 2. Deploy the Frontend (Vercel)

1. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
2. Import this GitHub repository.
3. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
4. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL` = `<YOUR_RENDER_BACKEND_URL>`
5. Click **Deploy**.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `DEMO_MODE` | `true` | Use seeded data (no GPU/DB needed) |
| `SIMILARITY_THRESHOLD` | `0.60` | Minimum confidence to return a match |
| `FAISS_TOP_K` | `5` | Candidates retrieved before threshold filter |
| `EMBEDDING_MODEL` | `BAAI/bge-large-en-v1.5` | Sentence-transformers model (DEMO_MODE=false) |
| `MONGODB_URI` | `mongodb://localhost:27017` | MongoDB connection (DEMO_MODE=false) |
| `ALLOWED_ORIGINS` | `http://localhost:3000` | CORS whitelist |

### Frontend (`frontend/.env.local`)

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Backend API URL |

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check + mode info |
| POST | `/api/search` | Search standards (main endpoint) |
| GET | `/api/standards` | List all indexed standards |
| GET | `/api/standards/{id}` | Get standard by ID |
| POST | `/api/standards/{id}/save` | Save a standard |
| GET | `/api/saved` | List saved standards |
| DELETE | `/api/saved/{id}` | Remove saved standard |
| GET | `/api/history` | Search history |
| DELETE | `/api/history/{id}` | Delete history entry |
| GET | `/api/compliance/summary` | Compliance overview |

### Search Request

```json
{
  "query": "hospital grade copper wire",
  "language": "en"
}
```

### Search Response (found)

```json
{
  "query": "hospital grade copper wire",
  "found": true,
  "match_status": "Applicable standard identified",
  "standard": {
    "is_code": "IS 8130:2013",
    "title": "Conductors for Insulated Electrical Cables and Flexible Cords",
    ...
  },
  "score": 0.97,
  "evidence": {
    "source_document": "...",
    "clause": "Clause 4.1",
    "text": "..."
  },
  "certifications": [...],
  "related_standards": [...],
  "why_matched": "...",
  "latency_ms": 1.2,
  "demo_mode": true,
  "threshold_used": 0.6
}
```

### Search Response (no match)

```json
{
  "found": false,
  "match_status": "No standard found",
  "score": 0.0,
  "suggestions": [...]
}
```

---

## Demo Queries

These queries work well with the seeded demo data:

| Query | Expected Result |
|-------|----------------|
| Hospital grade copper wire | IS 8130:2013 |
| Electrical cable for buildings | IS 8130:2013 / IS 694:2010 |
| Safety helmet for industrial workers | IS 2925:1984 |
| Stainless steel drinking water tank | IS 3779:1999 |
| LED light for office building | IS 16046 (Part 1):2018 |
| Mild steel pipe for water line | IS 1239 (Part 1):2004 |
| Autonomous drone navigation | **No match** (below threshold) |
| Blockchain cryptocurrency | **No match** (below threshold) |

---

## Production Mode (FAISS + Sentence Transformers)

To use real semantic search:

```bash
# 1. Install full deps
pip install -r requirements.txt

# 2. Set DEMO_MODE=false in .env

# 3. Start (model downloads automatically on first startup)
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

The embedding model (`BAAI/bge-large-en-v1.5`, ~1.3GB) is downloaded once and cached by sentence-transformers. The FAISS index is built from seed data at startup. To use a persistent index, save/load `faiss_index.bin` — extend `FAISSRetriever` in `backend/app/services/retrieval.py`.

---

## MongoDB Setup (Optional)

```bash
# Start MongoDB
docker run -d -p 27017:27017 --name mongo mongo:7

# Set DEMO_MODE=false and MONGODB_URI=mongodb://localhost:27017 in .env
# Seed data is loaded from backend/app/data/seed_data.py
```

---

## Docker (Full Stack)

```bash
cp .env.example .env
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- MongoDB: localhost:27017

---

## Project Structure

```
StandardSync-AI/
├── backend/
│   ├── app/
│   │   ├── api/           # FastAPI routers
│   │   ├── data/          # Seed data (DEMO DATA)
│   │   ├── models/        # Pydantic schemas
│   │   ├── services/      # Retrieval + store services
│   │   ├── config.py      # Environment settings
│   │   └── main.py        # FastAPI app
│   ├── .env.example
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/           # Next.js App Router pages
│   │   ├── components/    # UI + search components
│   │   ├── lib/           # API client
│   │   └── types/         # TypeScript types
│   └── .env.local
├── data/                  # Shared data directory
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Demo Data Notice

All standard records in this prototype are labelled **DEMO DATA**. Standard numbers and titles reference publicly known BIS index information. Evidence text, clause numbers, and source URLs are placeholder text and must be replaced with verified BIS document content before production deployment.

---

## What Needs Real BIS Data

To deploy to production:

1. **Replace seed data** in `backend/app/data/seed_data.py` (or MongoDB) with verified BIS standard records
2. **Replace evidence text** with actual clause text from BIS official documents
3. **Replace source URLs** with direct links to BIS portal pages
4. **Verify certification requirements** against current BIS mandatory certification lists
5. **Add multilingual embeddings** — replace demo query mappings with a real multilingual model (e.g., LaBSE or multilingual-e5)
6. **Set DEMO_MODE=false** and configure MongoDB + FAISS

---

## Known Limitations

- Demo mode uses keyword-weighted similarity, not true semantic embeddings
- Search history and saved standards are in-memory (lost on server restart)
- Multilingual support uses predefined query mappings, not real translation
- Evidence text is placeholder — not verified BIS document content
- FAISS index rebuilds from seed data on every startup (production should persist)

---

## SIH 2026

**Problem Statement ID:** SIH26108  
**Theme:** Smart Automation  
**Category:** Software  
**Team:** Shadows  
**Tagline:** Intelligent BIS Recommendation & Procurement Engine
