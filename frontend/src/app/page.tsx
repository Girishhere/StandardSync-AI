"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Database,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { getComplianceSummary, checkHealth } from "@/lib/api";
import type { ComplianceSummary } from "@/types";
import { useI18n } from "@/i18n/config";

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  delay = 0,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  delay?: number;
}) {
  return (
    <div
      className="animate-fadeInUp hover-lift"
      style={{
        animationDelay: `${delay}ms`,
        background: "#FFFFFF",
        borderRadius: "var(--radius-lg)",
        padding: "24px",
        border: "1px solid var(--border-light)",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `${color}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1px solid ${color}30`,
          }}
        >
          <Icon size={20} color={color} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 11,
            fontWeight: 600,
            color: "#10B981",
          }}
        >
          <TrendingUp size={11} />Live
        </div>
      </div>
      <div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: "#0A1628",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: 6,
          }}
        >
          {value}
        </div>
        <div style={{ fontSize: 13, color: "#8A9BBE", fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [stats, setStats] = useState<ComplianceSummary | null>(null);
  const [demoMode, setDemoMode] = useState(true);

  useEffect(() => {
    checkHealth().then((res) => setDemoMode(res.demo_mode)).catch(() => {});
    getComplianceSummary().then(setStats).catch(() => {});
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleExampleClick = (ex: string) => {
    setQuery(ex);
    router.push(`/search?q=${encodeURIComponent(ex)}`);
  };

  return (
    <div style={{ padding: "40px 48px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Hero Section */}
      <div
        className="animate-fadeInUp"
        style={{
          background: "linear-gradient(135deg, var(--navy-950) 0%, var(--navy-800) 100%)",
          borderRadius: "var(--radius-xl)",
          padding: "56px 48px",
          color: "#FFFFFF",
          marginBottom: 40,
          position: "relative",
          overflow: "hidden",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>
            {t.dashboard.title}
          </h1>
          <p style={{ fontSize: 16, color: "var(--text-disabled)", maxWidth: 600, marginBottom: 32, lineHeight: 1.6 }}>
            {t.dashboard.subtitle}
          </p>

          <form onSubmit={handleSearch} style={{ display: "flex", gap: 12, maxWidth: 600 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>
                <Search size={18} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.dashboard.searchPlaceholder}
                style={{
                  width: "100%",
                  padding: "16px 16px 16px 48px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#FFFFFF",
                  fontSize: 15,
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "var(--navy-400)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                }}
              />
            </div>
            <button
              type="submit"
              className="hover-lift"
              style={{
                padding: "0 28px",
                background: "var(--navy-500)",
                color: "#FFFFFF",
                borderRadius: "var(--radius-md)",
                border: "none",
                fontWeight: 600,
                fontSize: 15,
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--navy-400)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--navy-500)")}
            >
              {t.search.button} <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Examples */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 12, color: "var(--text-disabled)", marginBottom: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {t.search.examplesHeader}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={() => handleExampleClick("hospital grade copper wire")} className="example-chip">
                {t.search.categories.electrical}: copper wire
              </button>
              <button onClick={() => handleExampleClick("cement for coastal building")} className="example-chip">
                {t.search.categories.construction}: cement
              </button>
              <button onClick={() => handleExampleClick("fire extinguisher for office")} className="example-chip">
                {t.search.categories.safety}: fire extinguisher
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
        <StatCard
          label={t.pages.complianceSub.split(" ")[0] + " Indexed"} // Crude, but avoids creating a new string right now
          value={stats ? stats.total_standards_indexed : 12}
          icon={Database}
          color="var(--navy-500)"
          delay={100}
        />
        <StatCard
          label="Active Standards"
          value={stats ? stats.active_standards : 12}
          icon={CheckCircle}
          color="var(--success-500)"
          delay={200}
        />
        <StatCard
          label="Certification Rules"
          value={stats ? stats.certification_requirements : 4}
          icon={ShieldCheck}
          color="var(--warning-500)"
          delay={300}
        />
        <StatCard
          label="Recent Lookups"
          value={stats ? stats.recent_searches : 0}
          icon={Search}
          color="var(--danger-500)"
          delay={400}
        />
      </div>

      {/* Example Chip CSS - Inline for simplicity */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .example-chip {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.8);
          padding: 6px 14px;
          border-radius: 99px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .example-chip:hover {
          background: rgba(255,255,255,0.15);
          color: #FFF;
          border-color: rgba(255,255,255,0.3);
          transform: translateY(-1px);
        }
      `}} />
    </div>
  );
}
