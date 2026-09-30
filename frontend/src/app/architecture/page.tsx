"use client";

import { PageWrapper, Card } from "@/components/ui";
import { ArrowDown, Database, Cpu, Search, FileText, CheckCircle2, Cloud } from "lucide-react";

export default function ArchitecturePage() {
  return (
    <PageWrapper>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>
          System Architecture
        </h1>
        <p style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 48, lineHeight: 1.6 }}>
          StandardSync AI connects plain-language procurement requirements directly to official BIS source data using semantic retrieval.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {/* Main Retrieval Pipeline */}
          <Card padding={32} style={{ background: "var(--surface)" }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: "var(--navy-600)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
              <Search size={16} /> Retrieval Pipeline
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
              <div style={{ padding: "16px 24px", background: "var(--navy-900)", color: "#FFFFFF", borderRadius: 8, width: "100%", textAlign: "center", fontWeight: 600 }}>
                USER REQUIREMENT
              </div>
              <ArrowDown size={20} color="var(--border-strong)" />
              
              <div style={{ padding: "12px 24px", background: "var(--card-bg)", border: "1px solid var(--border-mid)", borderRadius: 8, width: "100%", textAlign: "center", fontWeight: 500, color: "var(--text-secondary)" }}>
                Next.js Frontend
              </div>
              <ArrowDown size={20} color="var(--border-strong)" />
              
              <div style={{ padding: "12px 24px", background: "var(--card-bg)", border: "1px solid var(--border-mid)", borderRadius: 8, width: "100%", textAlign: "center", fontWeight: 500, color: "var(--text-secondary)" }}>
                FastAPI Backend
              </div>
              <ArrowDown size={20} color="var(--border-strong)" />
              
              <div style={{ padding: "12px 24px", background: "var(--navy-50)", border: "1px solid var(--navy-500)", color: "var(--navy-600)", borderRadius: 8, width: "100%", textAlign: "center", fontWeight: 600, display: "flex", justifyContent: "center", gap: 8 }}>
                <Cpu size={18} /> Query Understanding
              </div>
              <ArrowDown size={20} color="var(--border-strong)" />
              
              <div style={{ padding: "12px 24px", background: "var(--navy-50)", border: "1px solid var(--navy-500)", color: "var(--navy-600)", borderRadius: 8, width: "100%", textAlign: "center", fontWeight: 600 }}>
                Embedding Model (BGE)
              </div>
              <ArrowDown size={20} color="var(--border-strong)" />
              
              <div style={{ padding: "12px 24px", background: "var(--neutral-50)", border: "1px solid var(--neutral-400)", color: "var(--neutral-600)", borderRadius: 8, width: "100%", textAlign: "center", fontWeight: 600 }}>
                FAISS Vector Search
              </div>
              <ArrowDown size={20} color="var(--border-strong)" />
              
              <div style={{ padding: "12px 24px", background: "var(--card-bg)", border: "1px solid var(--border-mid)", borderRadius: 8, width: "100%", textAlign: "center", fontWeight: 500, color: "var(--text-secondary)" }}>
                BIS Metadata Hydration
              </div>
              <ArrowDown size={20} color="var(--border-strong)" />
              
              <div style={{ padding: "12px 24px", background: "var(--success-50)", border: "1px solid var(--success-500)", color: "var(--success-700)", borderRadius: 8, width: "100%", textAlign: "center", fontWeight: 600, display: "flex", justifyContent: "center", gap: 8 }}>
                <CheckCircle2 size={18} /> Evidence Verification
              </div>
              <ArrowDown size={20} color="var(--border-strong)" />
              
              <div style={{ padding: "16px 24px", background: "var(--navy-900)", color: "#FFFFFF", borderRadius: 8, width: "100%", textAlign: "center", fontWeight: 600, boxShadow: "var(--shadow-sm)" }}>
                PROCUREMENT RESULT
              </div>
            </div>
          </Card>

          {/* BIS Data Architecture */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Card padding={32} style={{ background: "var(--surface)" }}>
              <h2 style={{ fontSize: 13, fontWeight: 700, color: "var(--warning-700)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
                <Database size={16} /> Data Architecture
              </h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                <div style={{ padding: "16px 24px", background: "var(--card-bg)", border: "2px solid var(--navy-900)", color: "var(--navy-900)", borderRadius: 8, width: "100%", textAlign: "center", fontWeight: 700, display: "flex", justifyContent: "center", gap: 8 }}>
                  <Cloud size={20} /> OFFICIAL BIS PORTAL
                </div>
                <ArrowDown size={20} color="var(--border-strong)" />
                
                <div style={{ padding: "12px 24px", background: "var(--warning-100)", border: "1px solid var(--warning-500)", color: "var(--warning-700)", borderRadius: 8, width: "100%", textAlign: "center", fontWeight: 600 }}>
                  BIS Data Adapter
                </div>
                <ArrowDown size={20} color="var(--border-strong)" />
                
                <div style={{ padding: "12px 24px", background: "var(--card-bg)", border: "1px solid var(--border-mid)", borderRadius: 8, width: "100%", textAlign: "center", fontWeight: 500, color: "var(--text-secondary)", display: "flex", justifyContent: "center", gap: 8 }}>
                  <FileText size={18} /> Normalized Standard Record
                </div>
                <ArrowDown size={20} color="var(--border-strong)" />
                
                <div style={{ padding: "12px 24px", background: "var(--neutral-50)", border: "1px solid var(--neutral-400)", color: "var(--neutral-600)", borderRadius: 8, width: "100%", textAlign: "center", fontWeight: 600 }}>
                  FAISS Index
                </div>
              </div>
            </Card>

            <Card padding={24}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy-900)", marginBottom: 12 }}>
                Grounding Principles
              </h3>
              <ul style={{ margin: 0, paddingLeft: 20, color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, display: "flex", flexDirection: "column", gap: 8 }}>
                <li><strong>No Hallucination:</strong> A strict confidence threshold prevents the AI from fabricating IS codes.</li>
                <li><strong>Evidence-Grounded:</strong> Every result traces back to a specific clause or metadata record from BIS.</li>
                <li><strong>Stateless Search:</strong> The system does not maintain conversational state, ensuring deterministic procurement outcomes.</li>
                <li><strong>Decoupled Adapter:</strong> The BIS service is modular, allowing integration with verified datasets or live portals.</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
