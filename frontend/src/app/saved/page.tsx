"use client";

import { useEffect, useState } from "react";
import { Bookmark, Trash2, ShieldCheck, Calendar } from "lucide-react";
import { getSavedStandards, removeSavedStandard } from "@/lib/api";
import { PageWrapper, SectionHeader, Card, Badge, EmptyState } from "@/components/ui";
import type { SavedStandard } from "@/types";
import Link from "next/link";
import { useI18n } from "@/i18n/config";

const CATEGORY_COLORS: Record<string, string> = {
  Electrical: "#1d4ed8",
  Construction: "#7c3aed",
  Safety: "#d97706",
  "Consumer Products": "#059669",
  "Industrial Equipment": "#0891b2",
};

export default function SavedPage() {
  const { t } = useI18n();
  const [saved, setSaved] = useState<SavedStandard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getSavedStandards()
      .then(setSaved)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await removeSavedStandard(id);
      setSaved((s) => s.filter((item) => item.id !== id));
    } catch {
      // ignore
    }
  };

  return (
    <PageWrapper>
      <SectionHeader
        title="Saved Standards"
        subtitle="Standards you have saved from search results for quick reference."
      />

      {error && (
        <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#b91c1c" }}>
          ⚠️ Could not load saved standards — backend may be unavailable.
        </div>
      )}

      {loading ? (
        <div style={{ color: "#94a3b8", padding: 32 }}>Loading…</div>
      ) : saved.length === 0 ? (
        <EmptyState
          icon={<Bookmark />}
          title="No saved standards"
          description="Save standards from search results to find them quickly later."
          action={
            <Link href="/search" style={{ color: "#1d4ed8", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              Search standards →
            </Link>
          }
        />
      ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
            {saved.map((s) => (
              <Card key={s.id} className="hover-row" style={{ position: "relative", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}>
                {s.is_demo && (
                  <div style={{ position: "absolute", top: 16, right: 16 }}>
                    <Badge variant="amber" size="sm">DEMO</Badge>
                  </div>
                )}

                <div style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      display: "inline-block",
                      background: "rgba(37,99,235,0.1)",
                      color: "var(--navy-600)",
                      border: "1px solid rgba(37,99,235,0.2)",
                      padding: "4px 12px",
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 800,
                      marginBottom: 10,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {s.is_code}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.4, marginBottom: 8, paddingRight: 40 }}>
                    {s.title}
                  </h3>
                </div>

                <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: 6,
                      background: "var(--surface)",
                      border: "1px solid var(--border-light)",
                      color: CATEGORY_COLORS[s.category] ?? "var(--text-secondary)",
                    }}
                  >
                    {s.category}
                  </span>
                  <span style={{ fontSize: 11, color: "var(--text-muted)", padding: "4px 0" }}>
                    {s.source}
                  </span>
                </div>

                {/* Certifications */}
                {s.certifications.filter(c => c.status === "required").length > 0 && (
                  <div style={{ marginBottom: 16, background: "var(--success-50)", padding: "8px 12px", borderRadius: 6, border: "1px solid var(--success-100)" }}>
                    {s.certifications.filter(c => c.status === "required").map((c, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--success-700)", fontWeight: 600 }}>
                        <ShieldCheck size={14} />
                        {c.name}
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-light)", paddingTop: 16, marginTop: "auto" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>
                    <Calendar size={14} />
                    {new Date(s.saved_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                  <button
                    onClick={() => handleRemove(s.id)}
                    className="action-btn"
                    style={{
                      padding: "6px 12px",
                      background: "var(--danger-50)",
                      border: "1px solid var(--danger-100)",
                      color: "var(--danger-600)",
                    }}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </Card>
            ))}
          </div>
      )}
    </PageWrapper>
  );
}
