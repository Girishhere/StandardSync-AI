"use client";

import {
  CheckCircle2,
  AlertTriangle,
  Shield,
  ShieldCheck,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Database,
  FileText,
  BookOpen,
  ChevronRight,
  AlertCircle,
  XCircle,
  HelpCircle,
  Clock,
  Zap,
  Info,
} from "lucide-react";
import type { SearchResult, Certification, RelatedStandard } from "@/types";
import { useState } from "react";
import { saveStandard } from "@/lib/api";
import { useI18n, TranslationDict } from "@/i18n/config";

interface Props {
  result: SearchResult;
}

// ── Verification Status Banner ──────────────────────────────────────────────────

function VerificationBanner({
  origin,
  status,
  t,
}: {
  origin: string;
  status: string;
  t: TranslationDict;
}) {
  const isDemo = origin === "DEMO" || status === "DEMO";
  const isVerified = status === "BIS_VERIFIED";
  const needsReview = status === "NEEDS_REVIEW";

  if (isDemo) {
    return (
      <div
        className="status-demo"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 16px",
          borderRadius: "var(--radius-md)",
          fontSize: 12,
          fontWeight: 600,
          marginBottom: 0,
        }}
      >
        <AlertCircle size={14} />
        <span>
          DEMO DATA — This result uses seeded demonstration records. IS code and
          title reflect publicly known BIS index information. Evidence text,
          clause references, and certification details are{" "}
          <strong>DEMO PLACEHOLDERS</strong> — not verified BIS source content.
        </span>
        <a
          href="https://standards.bis.gov.in"
          target="_blank"
          rel="noreferrer"
          style={{
            marginLeft: "auto",
            whiteSpace: "nowrap",
            color: "#92400E",
            textDecoration: "underline",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 4,
            flexShrink: 0,
          }}
        >
          Verify on BIS Portal <ExternalLink size={11} />
        </a>
      </div>
    );
  }

  if (isVerified) {
    return (
      <div
        className="status-verified"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 16px",
          borderRadius: "var(--radius-md)",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        <CheckCircle2 size={14} />
        <span>BIS VERIFIED — Metadata confirmed against official Bureau of Indian Standards records.</span>
      </div>
    );
  }

  return (
    <div
      className="status-needs-review"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 16px",
        borderRadius: "var(--radius-md)",
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      <HelpCircle size={14} />
      <span>VERIFICATION PENDING — IS code and title are based on publicly available information. Evidence requires verification against official BIS source documents.</span>
    </div>
  );
}

// ── Score Ring ──────────────────────────────────────────────────────────────────

function ScoreRing({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const dash = (pct / 100) * circumference;
  const color = pct >= 85 ? "#10B981" : pct >= 65 ? "#F59E0B" : "#EF4444";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ position: "relative", width: 88, height: 88 }}>
        <svg width="88" height="88" style={{ transform: "rotate(-90deg)" }}>
          {/* Track */}
          <circle
            cx="44" cy="44" r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="6"
          />
          {/* Progress */}
          <circle
            cx="44" cy="44" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            style={{
              filter: `drop-shadow(0 0 6px ${color})`,
              transition: "stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </svg>
        {/* Center text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF", lineHeight: 1 }}>
            {pct}
          </span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>%</span>
        </div>
      </div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        Relevance
      </div>
    </div>
  );
}

// ── Certification card ──────────────────────────────────────────────────────────

function CertCard({ cert }: { cert: Certification }) {
  const cfg = {
    required:       { Icon: ShieldCheck, bg: "#ECFDF5", border: "#10B981", color: "#065F46", label: "REQUIRED" },
    applicable:     { Icon: AlertCircle, bg: "#FFFBEB", border: "#F59E0B", color: "#92400E", label: "APPLICABLE" },
    not_applicable: { Icon: XCircle,     bg: "#F8FAFF", border: "#C8D6EC", color: "#8A9BBE", label: "NOT APPLICABLE" },
    not_identified: { Icon: HelpCircle,  bg: "#F8FAFF", border: "#C8D6EC", color: "#8A9BBE", label: "NOT VERIFIED" },
  }[cert.status] ?? { Icon: HelpCircle, bg: "#F8FAFF", border: "#C8D6EC", color: "#8A9BBE", label: "UNKNOWN" };

  return (
    <div
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: "var(--radius-md)",
        padding: "12px 16px",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
      }}
    >
      <cfg.Icon size={16} color={cfg.color} style={{ marginTop: 1, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#0A1628", marginBottom: 2 }}>
          {cert.name}
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, color: cfg.color, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: cert.note ? 6 : 0 }}>
          {cfg.label}
        </div>
        {cert.note && (
          <div style={{ fontSize: 12, color: "#475467", lineHeight: 1.5 }}>{cert.note}</div>
        )}
      </div>
    </div>
  );
}

// ── Related standard row ────────────────────────────────────────────────────────

function RelatedRow({ std, tag }: { std: RelatedStandard; tag: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        borderRadius: "var(--radius-md)",
        background: "var(--surface, #F8FAFF)",
        border: "1px solid var(--border-light, #E8EEF8)",
        transition: "all 0.15s ease",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <code style={{ fontSize: 13, fontWeight: 700, color: "#0A1628" }}>{std.is_code}</code>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 7px",
              borderRadius: 999,
              background: tag === "Normative Reference" ? "#EFF6FF" : "#F0FDF4",
              color: tag === "Normative Reference" ? "#1D4ED8" : "#15803D",
              border: tag === "Normative Reference" ? "1px solid #BFDBFE" : "1px solid #A7F3D0",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {tag}
          </span>
        </div>
        <div style={{ fontSize: 12, color: "#475467" }}>{std.title}</div>
      </div>
      <ChevronRight size={14} color="#C8D6EC" />
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────

export function SearchResultView({ result }: Props) {
  const { t, language } = useI18n();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!result.standard) return;
    setSaving(true);
    try {
      await saveStandard(result.standard.id);
      setSaved(true);
    } catch {
      setSaved(false);
    } finally {
      setSaving(false);
    }
  };

  // ── No-match ────────────────────────────────────────────────────────────────
  if (!result.found) {
    return (
      <div className="animate-fadeInUp">
        <div
          style={{
            background: "linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)",
            border: "1px solid #FECACA",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#991B1B",
              padding: "20px 28px",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <AlertTriangle size={22} color="#FCA5A5" />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF" }}>
                No reliable standard identified
              </div>
              <div style={{ fontSize: 13, color: "#FCA5A5", marginTop: 2 }}>
                Below confidence threshold ({Math.round(result.threshold_used * 100)}%)
              </div>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "24px 28px" }}>
            <p style={{ fontSize: 15, color: "#991B1B", lineHeight: 1.6, marginBottom: 20 }}>
              The requirement &ldquo;{result.query}&rdquo; did not produce a confident match.
              {result.score !== null && result.score !== undefined && (
                <> Highest similarity score was <strong>{Math.round(result.score * 100)}%</strong>, below the {Math.round(result.threshold_used * 100)}% threshold.</>
              )}
            </p>

            <div
              style={{
                background: "rgba(255,255,255,0.6)",
                borderRadius: "var(--radius-md)",
                padding: "16px 20px",
                border: "1px solid #FECACA",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#DC2626",
                  marginBottom: 10,
                }}
              >
                Refine your search
              </div>
              <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 6 }}>
                {result.suggestions.map((s, i) => (
                  <li key={i} style={{ fontSize: 13.5, color: "#7F1D1D", lineHeight: 1.5 }}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Metadata footer */}
            <div style={{ display: "flex", gap: 20, marginTop: 16, paddingTop: 16, borderTop: "1px solid #FECACA" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#DC2626" }}>
                <Zap size={12} />{result.latency_ms}ms
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#DC2626" }}>
                <Shield size={12} />Threshold: {Math.round(result.threshold_used * 100)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const std = result.standard!;
  const bisUrl = std.know_your_standard_url || `https://standards.bis.gov.in/search-result?searchText=${encodeURIComponent(std.is_code)}`;

  const allRelated = [
    ...std.normative_references.map((r) => ({ ...r, _tag: "Normative Reference" })),
    ...std.related_standards.map((r) => ({ ...r, _tag: r.relationship || "Related Standard" })),
  ];

  return (
    <div className="animate-fadeInUp" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* ── Verification Banner ──────────────────────────── */}
      <VerificationBanner origin={std.data_origin} status={std.verification_status} t={t} />

      {/* ── Main Result Header Card (Dark) ───────────────── */}
      <div
        style={{
          background: "linear-gradient(135deg, #060F1E 0%, #0A1628 50%, #0F2040 100%)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            height: 4,
            background: "linear-gradient(90deg, #2563EB, #10B981)",
          }}
        />

        <div style={{ padding: "28px 32px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 24,
            }}
          >
            {/* Left: IS Code + Title */}
            <div style={{ flex: 1 }}>
              {/* Match status pill */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 12px",
                  background: "rgba(16, 185, 129, 0.12)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  borderRadius: 999,
                  marginBottom: 16,
                }}
              >
                <CheckCircle2 size={12} color="#10B981" />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#10B981", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Applicable Standard Identified
                </span>
              </div>

              {/* IS Code */}
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  marginBottom: 8,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {std.is_code}
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.4,
                  marginBottom: 20,
                  maxWidth: 520,
                }}
              >
                {std.title}
                {language !== 'en' && (
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontStyle: "italic", marginTop: 4 }}>
                    (Translated for convenience)
                  </div>
                )}
              </div>

              {/* Meta badges */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "5px 12px",
                    background: "rgba(37,99,235,0.15)",
                    border: "1px solid rgba(37,99,235,0.3)",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#93C5FD",
                  }}
                >
                  {std.category}
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "5px 12px",
                    background: std.status === "active"
                      ? "rgba(16,185,129,0.12)"
                      : "rgba(245,158,11,0.12)",
                    border: `1px solid ${std.status === "active" ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)"}`,
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    color: std.status === "active" ? "#6EE7B7" : "#FDE68A",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: std.status === "active" ? "#10B981" : "#F59E0B",
                      display: "inline-block",
                    }}
                  />
                  {std.status === "active" ? "Active Standard" : std.status.replace("_", " ")}
                </span>
                {std.publication_date && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "5px 12px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    <Clock size={11} />
                    Published: {std.publication_date.slice(0, 4)}
                  </span>
                )}
              </div>
            </div>

            {/* Right: Score ring */}
            <div style={{ flexShrink: 0 }}>
              <ScoreRing score={result.score || 0} />
            </div>
          </div>

        </div>
      </div>

      {/* ── Why This Standard (Semantic Rationale) ───────── */}
      {result.why_matched && (
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-light, #E8EEF8)",
            borderLeft: "4px solid #3B82F6",
            padding: "20px 24px",
            boxShadow: "var(--shadow-xs)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                background: "rgba(59, 130, 246, 0.1)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Info size={16} color="#3B82F6" />
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#0A1628", letterSpacing: "0.02em" }}>
              {t.search.results.whyThisStandard}
            </div>
          </div>
          <div style={{ fontSize: 14, color: "#475467", lineHeight: 1.6, paddingLeft: 36 }}>
            {result.why_matched}
          </div>
        </div>
      )}


      {/* ── Source Evidence Panel ────────────────────────── */}
      <div
        style={{
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          border: "1px solid var(--border-light, #E8EEF8)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {/* Panel header */}
        <div
          style={{
            background: "#0A1628",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                background: "rgba(37,99,235,0.2)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Shield size={15} color="#60A5FA" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.04em" }}>
                SOURCE EVIDENCE
              </div>
              <div style={{ fontSize: 11, color: "#8A9BBE" }}>Official BIS record reference</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#8A9BBE", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {std.data_origin === "DEMO" ? "UNVERIFIED EXCERPT" : "VERIFIED EXCERPT"}
            </span>
          </div>
        </div>

        {/* Panel body */}
        <div style={{ background: "#FFFFFF" }}>
          {/* DEMO warning inside evidence */}
          {std.data_origin === "DEMO" && (
            <div
              style={{
                padding: "12px 24px",
                background: "#FEF2F2",
                borderBottom: "1px solid #FEE2E2",
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                fontSize: 13,
                color: "#991B1B",
                lineHeight: 1.5,
              }}
            >
              <AlertTriangle size={16} style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <strong>DEMO DATA:</strong> Clause text and source document details below are placeholder content.
                They are not genuinely retrieved from BIS. Verify against official records before any procurement decision.
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 0 }}>
            {/* Left meta column */}
            <div
              style={{
                padding: "24px",
                borderRight: "1px solid var(--border-light, #E8EEF8)",
                background: "#F8FAFF",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <MetaItem label="Official Source" value={std.source_name} Icon={Database} />
              <MetaItem
                label="Document"
                value={std.evidence?.source_document || "—"}
                Icon={FileText}
                truncate
              />
              <MetaItem
                label="Clause / Reference"
                value={std.evidence?.clause || "—"}
                Icon={BookOpen}
              />
              <MetaItem
                label="Last Verified"
                value={
                  std.last_verified
                    ? new Date(std.last_verified).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Verification pending"
                }
                Icon={Clock}
                warning={!std.last_verified || std.data_origin === "DEMO"}
              />
            </div>

            {/* Right evidence excerpt (Document Aesthetic) */}
            <div
              style={{
                padding: "32px 40px",
                background: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  padding: "24px",
                  border: "1px solid #E5E7EB",
                  boxShadow: "inset 0 0 12px rgba(0,0,0,0.02)",
                  borderRadius: 2,
                  background: "#FAFAFA",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: 15,
                  color: "#374151",
                  lineHeight: 1.8,
                  flex: 1,
                  position: "relative",
                }}
              >
                {/* Document stamp effect */}
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 20,
                    border: std.data_origin === "DEMO" ? "2px solid #FCA5A5" : "2px solid #6EE7B7",
                    color: std.data_origin === "DEMO" ? "#EF4444" : "#10B981",
                    padding: "4px 8px",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    transform: "rotate(-2deg)",
                    opacity: 0.8,
                  }}
                >
                  {std.data_origin === "DEMO" ? "UNOFFICIAL COPY" : "VERIFIED COPY"}
                </div>
                
                <div style={{ marginTop: 24, whiteSpace: "pre-wrap" }}>
                  {std.evidence?.text || "No evidence text available."}
                  {language !== 'en' && std.evidence?.text && (
                    <div style={{ fontSize: 11, color: "#9CA3AF", fontStyle: "italic", marginTop: 12 }}>
                      (Translated for convenience)
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div
            style={{
              padding: "20px 24px",
              borderTop: "1px solid var(--border-light, #E8EEF8)",
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              alignItems: "center",
              background: "var(--surface, #F8FAFF)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <a href={bisUrl} target="_blank" rel="noreferrer" className="action-btn action-btn-primary" style={{ alignSelf: "flex-start" }}>
                {t.search.results.openOfficial}
              </a>
              <span style={{ fontSize: 11, color: "#8A9BBE", maxWidth: 300 }}>
                * Navigation link to official source portal. Does not guarantee the metadata displayed above was automatically retrieved from this link.
              </span>
            </div>
            {std.document_url && (
              <a href={std.document_url} target="_blank" rel="noreferrer" className="action-btn action-btn-secondary">
                <FileText size={14} /> View Standard Document
              </a>
            )}
            <button
              onClick={handleSave}
              disabled={saved || saving}
              className={`action-btn ${saved ? "action-btn-success" : "action-btn-secondary"}`}
            >
              {saving ? (
                "Saving…"
              ) : saved ? (
                <><BookmarkCheck size={14} /> Saved to Workspace</>
              ) : (
                <><Bookmark size={14} /> Save Standard</>
              )}
            </button>

            {/* Metadata strip */}
            <div style={{ marginLeft: "auto", display: "flex", gap: 16, alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#8A9BBE" }}>
                <Zap size={11} />{result.latency_ms.toFixed(1)}ms
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#8A9BBE" }}>
                <Shield size={11} />Threshold: {Math.round(result.threshold_used * 100)}%
              </span>
              {result.demo_mode && (
                <span style={{ fontSize: 11, fontWeight: 600, color: "#F59E0B", background: "#FFFBEB", padding: "2px 8px", borderRadius: 999, border: "1px solid #FDE68A" }}>
                  DEMO MODE
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Compliance + Allied Standards ───────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Compliance */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-light, #E8EEF8)",
            overflow: "hidden",
            boxShadow: "var(--shadow-xs)",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid var(--border-light, #E8EEF8)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <ShieldCheck size={16} color="#0A1628" />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0A1628" }}>{t.search.results.compliance.toUpperCase()}</div>
              <div style={{ fontSize: 11, color: "#8A9BBE" }}>BIS mandatory requirements</div>
            </div>
          </div>
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
            {std.certifications && std.certifications.length > 0 ? (
              std.certifications.map((c, i) => <CertCard key={i} cert={c} />)
            ) : (
              <div
                style={{
                  padding: "24px",
                  textAlign: "center",
                  color: "#8A9BBE",
                  fontSize: 13,
                  fontStyle: "italic",
                }}
              >
                No certification requirements recorded.
              </div>
            )}
          </div>
        </div>

        {/* Allied & Normative Standards */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-light, #E8EEF8)",
            overflow: "hidden",
            boxShadow: "var(--shadow-xs)",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid var(--border-light, #E8EEF8)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <BookOpen size={16} color="#0A1628" />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0A1628" }}>{t.search.results.related.toUpperCase()}</div>
              <div style={{ fontSize: 11, color: "#8A9BBE" }}>Related IS codes</div>
            </div>
          </div>
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
            {allRelated.length > 0 ? (
              allRelated.map((r, i) => (
                <RelatedRow key={i} std={r} tag={r._tag} />
              ))
            ) : (
              <div
                style={{
                  padding: "24px",
                  textAlign: "center",
                  color: "#8A9BBE",
                  fontSize: 13,
                  fontStyle: "italic",
                }}
              >
                No allied standards recorded.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helper: MetaItem ────────────────────────────────────────────────────────────

function MetaItem({
  label,
  value,
  Icon,
  mono = false,
  truncate = false,
  warning = false,
}: {
  label: string;
  value: string;
  Icon: React.ElementType;
  mono?: boolean;
  truncate?: boolean;
  warning?: boolean;
}) {
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          color: "#8A9BBE",
          marginBottom: 5,
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Icon size={11} /> {label}
      </div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: warning ? "#F59E0B" : "#0A1628",
          fontFamily: mono ? '"SF Mono", "Fira Code", monospace' : "inherit",
          overflow: truncate ? "hidden" : undefined,
          textOverflow: truncate ? "ellipsis" : undefined,
          whiteSpace: truncate ? "nowrap" : undefined,
          lineHeight: 1.4,
        }}
      >
        {value}
      </div>
    </div>
  );
}
