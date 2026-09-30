"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  Bookmark,
  ShieldCheck,
  History,
  Database,
  Settings,
  Cpu,
  ChevronRight,
  Globe,
} from "lucide-react";
import { useI18n, LANGUAGES, SupportedLanguage } from "@/i18n/config";

export default function Sidebar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useI18n();

  const NAV_SECTIONS = [
    {
      label: "WORKSPACE", // Optionally translate sections too, but standard UI is usually fine
      items: [
        { href: "/", label: t.nav.dashboard, icon: LayoutDashboard, desc: "Overview & stats" },
        { href: "/search", label: t.nav.search, icon: Search, desc: "Find IS codes", highlight: true },
        { href: "/saved", label: t.nav.saved, icon: Bookmark, desc: "Quick reference" },
        { href: "/history", label: t.nav.history, icon: History, desc: "Past lookups" },
      ],
    },
    {
      label: "INTELLIGENCE",
      items: [
        { href: "/compliance", label: t.nav.compliance, icon: ShieldCheck, desc: "Certification view" },
        { href: "/sources", label: t.nav.sources, icon: Database, desc: "BIS integration" },
      ],
    },
    {
      label: "SYSTEM",
      items: [
        { href: "/architecture", label: t.nav.architecture, icon: Cpu, desc: "Technical design" },
        { href: "/settings", label: t.nav.settings, icon: Settings, desc: "Configuration" },
      ],
    },
  ];

  return (
    <aside
      style={{
        width: "var(--sidebar-width, 260px)",
        minWidth: "var(--sidebar-width, 260px)",
        background: "linear-gradient(180deg, #060F1E 0%, #0A1628 40%, #0F2040 100%)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
        borderRight: "1px solid rgba(255,255,255,0.06)",
        overflowY: "auto",
        overflowX: "hidden",
        zIndex: 50,
      }}
      className="sidebar-mobile"
    >
      {/* ── Logo ───────────────────────────────────────────── */}
      <div
        style={{
          padding: "28px 20px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Logo icon */}
          <div
            style={{
              width: 40,
              height: 40,
              background: "linear-gradient(135deg, #2563EB 0%, #1D3A70 100%)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(37,99,235,0.4)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Inner glow */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)",
              }}
            />
            <span style={{ fontSize: 18, fontWeight: 800, color: "#FFFFFF", position: "relative", zIndex: 1 }}>
              S
            </span>
          </div>
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              StandardSync <span style={{ color: "#60A5FA" }}>AI</span>
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#8A9BBE",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              Procurement Intelligence
            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation ─────────────────────────────────────── */}
      <nav
        style={{
          flex: 1,
          padding: "16px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            {/* Section label */}
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "rgba(138, 155, 190, 0.6)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "0 8px",
                marginBottom: 6,
              }}
            >
              {section.label}
            </div>

            {/* Nav items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {section.items.map(({ href, label, icon: Icon, highlight }) => {
                const isActive =
                  href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "9px 10px",
                      borderRadius: 8,
                      textDecoration: "none",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.15s ease",
                      background: isActive
                        ? "rgba(37, 99, 235, 0.15)"
                        : "transparent",
                      border: isActive
                        ? "1px solid rgba(37, 99, 235, 0.25)"
                        : "1px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background =
                          "rgba(255,255,255,0.05)";
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(255,255,255,0.08)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background =
                          "transparent";
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "transparent";
                      }
                    }}
                  >
                    {/* Active indicator bar */}
                    {isActive && (
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 3,
                          height: 20,
                          background: "#2563EB",
                          borderRadius: "0 3px 3px 0",
                          boxShadow: "0 0 8px rgba(37,99,235,0.6)",
                        }}
                      />
                    )}

                    {/* Icon */}
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 8,
                        flexShrink: 0,
                        background: isActive
                          ? "rgba(37, 99, 235, 0.2)"
                          : "rgba(255,255,255,0.04)",
                        transition: "background 0.15s ease",
                      }}
                    >
                      <Icon
                        size={15}
                        color={isActive ? "#60A5FA" : "#8A9BBE"}
                        strokeWidth={isActive ? 2.5 : 1.8}
                      />
                    </div>

                    {/* Label */}
                    <span
                      style={{
                        fontSize: 13.5,
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? "#F0F6FF" : "#8A9BBE",
                        letterSpacing: isActive ? "-0.01em" : "0",
                        flex: 1,
                        transition: "color 0.15s ease",
                      }}
                    >
                      {label}
                    </span>

                    {/* "Primary" highlight pill */}
                    {highlight && !isActive && (
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: "#60A5FA",
                          background: "rgba(37,99,235,0.15)",
                          padding: "2px 6px",
                          borderRadius: 99,
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                          border: "1px solid rgba(37,99,235,0.2)",
                        }}
                      >
                        Search
                      </span>
                    )}

                    {isActive && (
                      <ChevronRight size={12} color="rgba(96,165,250,0.5)" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Footer ─────────────────────────────────────────── */}
      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
          background: "rgba(0,0,0,0.2)",
        }}
      >
        
        {/* Language Selector */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, color: "#8A9BBE", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <Globe size={12} /> Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
            style={{
              width: "100%",
              padding: "8px 10px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 6,
              color: "#FFFFFF",
              fontSize: 13,
              outline: "none",
              cursor: "pointer"
            }}
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code} style={{ background: "#060F1E", color: "#FFF" }}>
                {l.label} ({l.script})
              </option>
            ))}
          </select>
        </div>

        {/* SIH badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#10B981",
              boxShadow: "0 0 6px #10B981",
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 11, color: "#10B981", fontWeight: 600 }}>
            Demo Mode Active
          </span>
        </div>

        <div style={{ fontSize: 11, color: "#475467", lineHeight: 1.5 }}>
          <div style={{ fontWeight: 600, color: "#8A9BBE", marginBottom: 2 }}>
            SIH 2026 · Problem SIH26108
          </div>
          <div>Theme: Smart Automation</div>
          <div>Team: <span style={{ color: "#60A5FA" }}>Shadows</span></div>
        </div>
      </div>
    </aside>
  );
}
