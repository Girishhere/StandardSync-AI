"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Database, Search, CheckCircle } from "lucide-react";
import { getComplianceSummary } from "@/lib/api";
import { PageWrapper, SectionHeader, Card, Badge, DemoBanner } from "@/components/ui";
import type { ComplianceSummary } from "@/types";
import { useI18n } from "@/i18n/config";

const CATEGORY_COLORS: Record<string, string> = {
  Electrical: "#1d4ed8",
  Construction: "#7c3aed",
  Safety: "#d97706",
  "Consumer Products": "#059669",
  "Industrial Equipment": "#0891b2",
};

export default function CompliancePage() {
  const { t } = useI18n();
  const [summary, setSummary] = useState<ComplianceSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getComplianceSummary()
      .then(setSummary)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageWrapper>
      <SectionHeader
        title="Compliance Overview"
        subtitle="Summary of indexed standards, certification requirements, and coverage by category."
      />

      <DemoBanner />

      {error && (
        <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#b91c1c" }}>
          ⚠️ Could not load compliance data.
        </div>
      )}

      {loading ? (
        <div style={{ color: "#94a3b8", padding: 32 }}>Loading…</div>
      ) : summary ? (
        <>
          {/* Stat cards */}
          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16, marginBottom: 28 }}>
            {[
              { label: "Standards Indexed", value: summary.total_standards_indexed, icon: Database, color: "var(--navy-600)", bg: "var(--navy-50)" },
              { label: "Active Standards", value: summary.active_standards, icon: CheckCircle, color: "var(--success-600)", bg: "var(--success-50)" },
              { label: "Certification Rules", value: summary.certification_requirements, icon: ShieldCheck, color: "var(--warning-600)", bg: "var(--warning-50)" },
              { label: "Recent Searches", value: summary.recent_searches, icon: Search, color: "var(--danger-500)", bg: "var(--danger-50)" },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <Card key={label} padding="20px 24px" className="hover-row" style={{ transition: "all 0.2s ease" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 600, marginBottom: 8, letterSpacing: "0.02em" }}>{label}</div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>{value}</div>
                  </div>
                  <div style={{ width: 44, height: 44, background: bg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${color}33` }}>
                    <Icon size={20} color={color} />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Category breakdown */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>Standards by Category</h3>
                <Badge variant="slate" size="sm">DEMO DATA</Badge>
              </div>
              {Object.entries(summary.searches_by_category).map(([cat, count]) => {
                const total = Object.values(summary.searches_by_category).reduce((a, b) => a + b, 0);
                const pct = Math.round((count / total) * 100);
                const color = CATEGORY_COLORS[cat] ?? "#64748b";
                return (
                  <div key={cat} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 13, color: "#334155", fontWeight: 500 }}>{cat}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color }}>
                        {count} ({pct}%)
                      </span>
                    </div>
                    <div style={{ height: 8, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4 }} />
                    </div>
                  </div>
                );
              })}
            </Card>

            {/* Certification types */}
            {/* Certification types */}
            <Card>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>Certification Types Covered</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { name: "BIS Product Certification (ISI Mark)", count: summary.certification_requirements, color: "var(--navy-600)", bg: "var(--navy-50)" },
                  { name: "CRS (Compulsory Registration Scheme)", count: 2, color: "#7c3aed", bg: "#faf5ff" },
                  { name: "BEE Star Rating", count: 1, color: "var(--success-600)", bg: "var(--success-50)" },
                  { name: "Hallmarking", count: 0, color: "var(--text-muted)", bg: "var(--surface)" },
                  { name: "FSSAI Approval", count: 1, color: "var(--warning-600)", bg: "var(--warning-50)" },
                ].map(({ name, count, color, bg }) => (
                  <div key={name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: bg, borderRadius: 8, border: "1px solid var(--border-light)" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{name}</div>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 800, color }}>
                      {count > 0 ? `${count} standard${count > 1 ? "s" : ""}` : "Not applicable"}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Notes */}
          <div style={{ marginTop: 20 }}>
            <Card style={{ borderLeft: "4px solid #2563eb" }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>About This Compliance Data</h3>
              <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7 }}>
                Certification requirements shown are based on publicly known BIS mandatory certification lists and
                publicly available BIS portal information. All detailed clause-level evidence and source text
                shown in search results are <strong>DEMO PLACEHOLDERS</strong> — replace with verified BIS document data
                before production deployment.
              </p>
            </Card>
          </div>
        </>
      ) : null}
    </PageWrapper>
  );
}
