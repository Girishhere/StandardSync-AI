"use client";

import { CheckCircle, XCircle, AlertCircle, HelpCircle } from "lucide-react";
import type { Certification } from "@/types";

interface CertBadgeProps {
  cert: Certification;
}

const STATUS_CONFIG = {
  required: {
    icon: CheckCircle,
    label: "Required",
    bg: "#ECFDF3",
    color: "#027A48",
    iconColor: "#12B76A",
    border: "#A6F4C5",
  },
  applicable: {
    icon: AlertCircle,
    label: "Applicable",
    bg: "#FEF0C7",
    color: "#B54708",
    iconColor: "#F79009",
    border: "#FEC84B",
  },
  not_applicable: {
    icon: XCircle,
    label: "Not Applicable",
    bg: "#F2F4F7",
    color: "#344054",
    iconColor: "#98A2B3",
    border: "#EAECF0",
  },
  not_identified: {
    icon: HelpCircle,
    label: "Not Verified",
    bg: "#F7F9FC",
    color: "#667085",
    iconColor: "#98A2B3",
    border: "#EAECF0",
  },
};

export function CertificationCard({ cert }: CertBadgeProps) {
  const cfg = STATUS_CONFIG[cert.status] ?? STATUS_CONFIG.not_identified;
  const Icon = cfg.icon;

  return (
    <div
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: 8,
        padding: "12px 16px",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
      }}
    >
      <Icon
        size={18}
        color={cfg.iconColor}
        style={{ marginTop: 1, flexShrink: 0 }}
      />
      <div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: cfg.color,
            marginBottom: 2,
          }}
        >
          {cert.name}
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: cfg.color,
            opacity: 0.8,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {cfg.label}
        </div>
        {cert.note && (
          <div
            style={{
              fontSize: 12,
              color: cfg.color,
              opacity: 0.7,
              marginTop: 4,
              lineHeight: 1.5,
            }}
          >
            {cert.note}
          </div>
        )}
      </div>
    </div>
  );
}
