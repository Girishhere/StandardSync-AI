"use client";

import { PageWrapper, SectionHeader, Card, Badge } from "@/components/ui";
import { Settings, Info } from "lucide-react";

export default function SettingsPage() {
  return (
    <PageWrapper>
      <SectionHeader
        title="Settings"
        subtitle="Configuration reference for the StandardSync AI prototype."
      />

      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Settings size={16} color="#1d4ed8" />
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>Environment Configuration</h3>
          <Badge variant="slate" size="sm">Backend .env</Badge>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { key: "DEMO_MODE", value: "true", desc: "Run without MongoDB, FAISS, or embedding model. Uses seeded data." },
            { key: "SIMILARITY_THRESHOLD", value: "0.60", desc: "Minimum cosine similarity score to return a match. Below this → 'No standard found'." },
            { key: "FAISS_TOP_K", value: "5", desc: "Number of candidates retrieved from FAISS before threshold filtering." },
            { key: "EMBEDDING_MODEL", value: "BAAI/bge-large-en-v1.5", desc: "Sentence-transformers model (used when DEMO_MODE=false)." },
            { key: "MONGODB_URI", value: "mongodb://localhost:27017", desc: "MongoDB connection string (used when DEMO_MODE=false)." },
            { key: "ALLOWED_ORIGINS", value: "http://localhost:3000", desc: "CORS allowed origins for the frontend." },
          ].map(({ key, value, desc }, i, arr) => (
            <div
              key={key}
              style={{
                display: "grid",
                gridTemplateColumns: "200px 220px 1fr",
                gap: 16,
                padding: "12px 0",
                borderBottom: i < arr.length - 1 ? "1px solid #f1f5f9" : "none",
                alignItems: "flex-start",
              }}
            >
              <code style={{ fontSize: 12.5, fontFamily: "monospace", color: "#1d4ed8", fontWeight: 700 }}>
                {key}
              </code>
              <code style={{ fontSize: 12.5, fontFamily: "monospace", color: "#15803d", background: "#f0fdf4", padding: "2px 6px", borderRadius: 3 }}>
                {value}
              </code>
              <span style={{ fontSize: 13, color: "#475569" }}>{desc}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ borderColor: "#bfdbfe", background: "#eff6ff" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <Info size={16} color="#1d4ed8" style={{ marginTop: 1, flexShrink: 0 }} />
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#1d4ed8", marginBottom: 6 }}>Runtime Configuration</h3>
            <p style={{ fontSize: 13, color: "#1e40af", lineHeight: 1.7 }}>
              All configuration is read from environment variables at startup. The similarity threshold is never hardcoded in the retrieval logic.
              To adjust the threshold for your deployment, update <code style={{ fontFamily: "monospace", background: "#dbeafe", padding: "1px 4px", borderRadius: 3 }}>SIMILARITY_THRESHOLD</code> in your <code style={{ fontFamily: "monospace", background: "#dbeafe", padding: "1px 4px", borderRadius: 3 }}>.env</code> file and restart the backend.
            </p>
          </div>
        </div>
      </Card>
    </PageWrapper>
  );
}
