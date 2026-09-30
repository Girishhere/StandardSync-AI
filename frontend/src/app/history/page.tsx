"use client";

import { useEffect, useState } from "react";
import { Trash2, Eye, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { getHistory, deleteHistoryEntry } from "@/lib/api";
import { PageWrapper, SectionHeader, Card, Badge, EmptyState } from "@/components/ui";
import type { HistoryEntry } from "@/types";
import Link from "next/link";
import { useI18n } from "@/i18n/config";

export default function HistoryPage() {
  const { t } = useI18n();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getHistory()
      .then(setHistory)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteHistoryEntry(id);
      setHistory((h) => h.filter((e) => e.id !== id));
    } catch {
      // ignore
    }
  };

  return (
    <PageWrapper>
      <SectionHeader
        title={t.pages.historyTitle}
        subtitle={t.pages.historySub}
      />

      {error && (
        <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#b91c1c" }}>
          ⚠️ Could not load history — backend may be unavailable.
        </div>
      )}

      {loading ? (
        <Card>
          <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8" }}>
            Loading history…
          </div>
        </Card>
      ) : history.length === 0 ? (
        <EmptyState
          icon={<Clock />}
          title={`No ${t.pages.historyTitle}`}
          description="Searches will appear here after you use the standard search."
          action={
            <Link href="/search" style={{ color: "#1d4ed8", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              Start a search →
            </Link>
          }
        />
      ) : (
        <Card padding={0}>
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 160px 80px 110px 100px",
              gap: 16,
              padding: "16px 20px",
              background: "var(--surface)",
              borderRadius: "10px 10px 0 0",
              borderBottom: "1px solid var(--border-light)",
            }}
          >
            {["Query", "Matched Standard", "Score", "Status", "Actions"].map((h) => (
              <div key={h} style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {h}
              </div>
            ))}
          </div>

          {history.map((entry, i) => (
              <div
              key={entry.id}
              className="hover-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1.5fr 160px 80px 110px 100px",
                gap: 16,
                padding: "16px 20px",
                borderBottom: i < history.length - 1 ? "1px solid var(--border-light)" : "none",
                alignItems: "center",
                transition: "background 0.2s ease",
              }}
            >
              {/* Query */}
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{entry.query}</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                  {new Date(entry.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>

              {/* Standard */}
              <div>
                {entry.matched_standard ? (
                  <span style={{ fontFamily: "monospace", fontSize: 12.5, background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.1)", padding: "4px 8px", borderRadius: 6, color: "var(--navy-600)", fontWeight: 700 }}>
                    {entry.matched_standard}
                  </span>
                ) : (
                  <span style={{ fontSize: 12, color: "var(--text-disabled)" }}>—</span>
                )}
              </div>

              {/* Score */}
              <div>
                <span style={{ fontSize: 15, fontWeight: 800, color: entry.score && entry.score >= 0.6 ? "var(--success-600)" : "var(--text-muted)" }}>
                  {entry.score ? `${Math.round(entry.score * 100)}%` : "—"}
                </span>
              </div>

              {/* Status */}
              <div>
                <Badge variant={entry.status === "verified" ? "green" : "amber"}>
                  {entry.status === "verified" ? (
                    <><CheckCircle size={11} /> Verified</>
                  ) : (
                    <><AlertCircle size={11} /> Not found</>
                  )}
                </Badge>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 8 }}>
                <Link
                  href={`/search?q=${encodeURIComponent(entry.query)}`}
                  title="Re-run search"
                  className="action-btn action-btn-secondary"
                  style={{ width: 32, height: 32, padding: 0 }}
                >
                  <Eye size={14} />
                </Link>
                <button
                  onClick={() => handleDelete(entry.id)}
                  title="Delete"
                  className="action-btn"
                  style={{
                    width: 32, height: 32, padding: 0,
                    background: "var(--danger-50)",
                    border: "1px solid var(--danger-100)",
                    color: "var(--danger-600)",
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </Card>
      )}
    </PageWrapper>
  );
}
