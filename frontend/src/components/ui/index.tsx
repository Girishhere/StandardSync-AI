// Reusable UI building blocks for StandardSync AI

import React from "react";

// ── Card ────────────────────────────────────────────────────────────────────

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: number | string;
  bordered?: boolean;
}

export function Card({
  children,
  padding = 24,
  bordered = true,
  style,
  ...rest
}: CardProps) {
  return (
    <div
      className={`glass-card ${bordered ? "" : "no-border"}`}
      style={{
        padding,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

// ── Badge ───────────────────────────────────────────────────────────────────

type BadgeVariant = "blue" | "green" | "amber" | "red" | "slate" | "navy";

const BADGE_STYLES: Record<BadgeVariant, React.CSSProperties> = {
  blue:  { background: "#EFF4FF", color: "#155EEF", border: "1px solid #B2CCFF" },
  green: { background: "#ECFDF3", color: "#027A48", border: "1px solid #A6F4C5" },
  amber: { background: "#FEF0C7", color: "#B54708", border: "1px solid #FEC84B" },
  red:   { background: "#FEE4E2", color: "#B42318", border: "1px solid #FECDCA" },
  slate: { background: "#F2F4F7", color: "#344054", border: "1px solid #EAECF0" },
  navy:  { background: "#0B1F3A", color: "#FFFFFF", border: "1px solid #102A4C" },
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

export function Badge({ children, variant = "slate", size = "md" }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: size === "sm" ? "2px 8px" : "4px 10px",
        borderRadius: 4,
        fontSize: size === "sm" ? 11 : 12,
        fontWeight: 600,
        letterSpacing: "0.02em",
        ...BADGE_STYLES[variant],
      }}
    >
      {children}
    </span>
  );
}

// ── Button ──────────────────────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

const BTN_BASE: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  borderRadius: 8,
  fontWeight: 600,
  cursor: "pointer",
  border: "none",
  transition: "all 0.15s ease",
  fontFamily: "inherit",
  letterSpacing: "0.01em",
};

const BTN_VARIANTS: Record<ButtonVariant, React.CSSProperties> = {
  primary:   { background: "#1d4ed8", color: "#ffffff" },
  secondary: { background: "#f1f5f9", color: "#334155", border: "1px solid #e2e8f0" },
  ghost:     { background: "transparent", color: "#475569" },
  danger:    { background: "#fee2e2", color: "#b91c1c" },
};

const BTN_SIZES: Record<string, React.CSSProperties> = {
  sm: { padding: "6px 14px", fontSize: 13 },
  md: { padding: "9px 18px", fontSize: 14 },
  lg: { padding: "12px 24px", fontSize: 15 },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      style={{
        ...BTN_BASE,
        ...BTN_VARIANTS[variant],
        ...BTN_SIZES[size],
        opacity: disabled || loading ? 0.6 : 1,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        ...style,
      }}
      {...rest}
    >
      {loading ? <LoadingDots /> : icon}
      {children}
    </button>
  );
}

// ── Score Bar ───────────────────────────────────────────────────────────────

interface ScoreBarProps {
  score: number; // 0–1
  label?: string;
}

export function ScoreBar({ score, label }: ScoreBarProps) {
  const pct = Math.round(score * 100);
  const color = pct >= 80 ? "#16a34a" : pct >= 60 ? "#d97706" : "#dc2626";

  return (
    <div>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: "#64748b" }}>{label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color }}>{pct}%</span>
        </div>
      )}
      <div
        style={{
          height: 6,
          background: "#f1f5f9",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: color,
            borderRadius: 3,
            transition: "width 0.6s ease",
          }}
        />
      </div>
    </div>
  );
}

// ── Loading Dots ─────────────────────────────────────────────────────────────

export function LoadingDots() {
  return (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "currentColor",
            animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
            display: "inline-block",
          }}
        />
      ))}
    </span>
  );
}

// ── Section Header ────────────────────────────────────────────────────────────

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#0f172a",
              letterSpacing: "-0.02em",
              marginBottom: 4,
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontSize: 14, color: "#64748b", maxWidth: 540 }}>{subtitle}</p>
          )}
        </div>
        {action}
      </div>
    </div>
  );
}

// ── Page Wrapper ──────────────────────────────────────────────────────────────

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: "32px 36px", maxWidth: 1200 }}>
      {children}
    </div>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────

export function Divider({ label }: { label?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        margin: "20px 0",
        color: "#94a3b8",
        fontSize: 12,
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
      }}
    >
      <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
      {label && <span>{label}</span>}
      {label && <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />}
    </div>
  );
}

// ── Status Dot ────────────────────────────────────────────────────────────────

export function StatusDot({ active = true }: { active?: boolean }) {
  return (
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: active ? "#16a34a" : "#94a3b8",
        display: "inline-block",
        flexShrink: 0,
      }}
    />
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "64px 32px",
        color: "#64748b",
      }}
    >
      {icon && (
        <div style={{ marginBottom: 16, opacity: 0.4, fontSize: 40 }}>{icon}</div>
      )}
      <h3 style={{ fontSize: 16, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
        {title}
      </h3>
      {description && (
        <p style={{ fontSize: 14, maxWidth: 360, margin: "0 auto 16px" }}>{description}</p>
      )}
      {action}
    </div>
  );
}

// ── Demo Data Banner ──────────────────────────────────────────────────────────

export function DemoBanner() {
  return (
    <div
      style={{
        background: "#fffbeb",
        border: "1px solid #fde68a",
        borderRadius: 8,
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 20,
        fontSize: 13,
        color: "#92400e",
      }}
    >
      <span style={{ fontSize: 16 }}>⚠️</span>
      <span>
        <strong>DEMO DATA</strong> — This prototype uses seeded demonstration records. Evidence text and clause references are placeholders. Replace with verified BIS source data before production use.
      </span>
    </div>
  );
}
