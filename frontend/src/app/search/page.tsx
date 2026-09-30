"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { searchStandards } from "@/lib/api";
import { SearchResultView } from "@/components/search/SearchResultView";
import { PageWrapper } from "@/components/ui";
import type { SearchResult } from "@/types";
import { useI18n, SupportedLanguage } from "@/i18n/config";

function LoadingState({ query }: { query: string }) {
  const { t } = useI18n();
  const [stepIndex, setStepIndex] = useState(0);

  const LOADING_STEPS = [
    t.search.loading.understanding,
    t.search.loading.semantic,
    t.search.loading.match,
    t.search.loading.compliance,
    t.search.loading.evidence,
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = Math.min(i + 1, LOADING_STEPS.length - 1);
      setStepIndex(i);
    }, 400);
    return () => clearInterval(interval);
  }, [LOADING_STEPS.length]);

  return (
    <div className="animate-scaleIn" style={{ marginTop: 48, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid var(--border-light)",
          borderRadius: 16,
          padding: "40px",
          width: "100%",
          maxWidth: 640,
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: "var(--text-disabled)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
            Processing
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)" }}>
            &ldquo;{query}&rdquo;
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {LOADING_STEPS.map((step, idx) => {
            const isActive = idx === stepIndex;
            const isPast = idx < stepIndex;
            return (
              <div
                key={step}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px",
                  borderRadius: 8,
                  background: isActive ? "rgba(37,99,235,0.05)" : isPast ? "var(--page-bg)" : "transparent",
                  border: `1px solid ${isActive ? "var(--navy-400)" : "transparent"}`,
                  transition: "all 0.3s ease",
                }}
              >
                <div style={{ width: 24, display: "flex", justifyContent: "center" }}>
                  {isPast ? (
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--success-500)" }} />
                  ) : isActive ? (
                    <Loader2 size={18} color="var(--navy-500)" className="animate-spin" />
                  ) : (
                    <div style={{ width: 10, height: 10, borderRadius: "50%", border: "2px solid var(--border-medium)" }} />
                  )}
                </div>
                <div style={{ 
                  fontSize: 13, 
                  fontWeight: 600, 
                  letterSpacing: "0.05em",
                  color: isActive ? "var(--navy-500)" : isPast ? "var(--text-primary)" : "var(--text-disabled)",
                }}>
                  {step}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qParam = searchParams.get("q") || "";
  const { language, t } = useI18n();

  const [input, setInput] = useState(qParam);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (qParam && !result && !loading) {
      performSearch(qParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qParam]);

  const performSearch = async (query: string) => {
    if (query.trim().length < 3) return;
    setLoading(true);
    setError(null);
    setResult(null);

    // Simulate UX delay for the animation
    const minDelay = new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const [data] = await Promise.all([
        searchStandards({ query: query.trim(), language: language as string }),
        minDelay,
      ]);
      setResult(data);
    } catch (err: any) {
      setError(t.search.error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (q.length < 3) return;
    if (q !== qParam) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    } else {
      performSearch(q);
    }
  };

  return (
    <PageWrapper>
      {/* ── Search Header ──────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 40, textAlign: "center", maxWidth: 800, margin: "0 auto 40px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 12 }}>
          {t.search.title}
        </h1>
        <p style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 32 }}>
          {t.search.subtitle}
        </p>

        <form onSubmit={handleSearch} style={{ position: "relative", maxWidth: 640, margin: "0 auto", display: "flex", gap: 12 }}>
          <div style={{ flex: 1, position: "relative" }}>
            <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>
              <Search size={20} />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.search.placeholder}
              style={{
                width: "100%",
                padding: "16px 16px 16px 48px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-medium)",
                background: "#FFFFFF",
                fontSize: 16,
                outline: "none",
                boxShadow: "var(--shadow-sm)",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--navy-400)";
                e.currentTarget.style.boxShadow = "0 0 0 4px rgba(37,99,235,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border-medium)";
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="hover-lift"
            style={{
              padding: "0 32px",
              background: "var(--navy-600)",
              color: "#FFFFFF",
              borderRadius: "var(--radius-md)",
              border: "none",
              fontWeight: 600,
              fontSize: 15,
              cursor: loading ? "default" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {t.search.button}
          </button>
        </form>
      </div>

      {/* ── Loading / Error / Results ────────────────────────────────────────── */}
      <div style={{ minHeight: 400 }}>
        {loading && <LoadingState query={input} />}
        
        {!loading && error && (
          <div className="animate-scaleIn" style={{ padding: 24, background: "var(--danger-50)", border: "1px solid var(--danger-200)", borderRadius: 12, color: "var(--danger-700)", textAlign: "center" }}>
            {error}
          </div>
        )}

        {!loading && !error && result && (
          <SearchResultView result={result} />
        )}

        {!loading && !error && !result && !qParam && (
          <div style={{ textAlign: "center", color: "var(--text-disabled)", marginTop: 80 }}>
            {/* Empty state image or placeholder */}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center" }}>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
