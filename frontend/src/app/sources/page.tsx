"use client";

import { PageWrapper, Card, Badge } from "@/components/ui";
import { Database, ExternalLink, Shield, Code, Server, Cpu } from "lucide-react";
import { useEffect, useState } from "react";
import { checkHealth } from "@/lib/api";

export default function SourcesPage() {
  const [demoMode, setDemoMode] = useState<boolean>(true);

  useEffect(() => {
    checkHealth().then((res) => setDemoMode(res.demo_mode)).catch(() => {});
  }, []);

  return (
    <PageWrapper>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>
          Data Sources
        </h1>
        <p style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 40, lineHeight: 1.6 }}>
          StandardSync AI relies on verified government platforms and open-source infrastructure to deliver procurement intelligence.
        </p>

        <h2 style={{ fontSize: 13, fontWeight: 700, color: "var(--navy-500)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <Shield size={16} /> Official Sources
        </h2>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
          <Card padding={24} style={{ borderLeft: "4px solid var(--navy-500)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy-900)", marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                  <Database size={18} color="var(--navy-500)" /> Bureau of Indian Standards (BIS)
                </h3>
                <div style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                  Official Indian Standards portal and Know Your Standard (KYS) system.
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                {demoMode ? (
                  <Badge variant="amber">Demo Data Active</Badge>
                ) : (
                  <Badge variant="green">Connected</Badge>
                )}
                <a 
                  href="https://standards.bis.gov.in/" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ fontSize: 13, color: "var(--navy-600)", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
                >
                  Open Official Source <ExternalLink size={12} />
                </a>
              </div>
            </div>
            <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.5, background: "var(--surface)", padding: 16, borderRadius: 8, border: "1px solid var(--border-light)" }}>
              Provides authoritative data on IS codes, titles, amendments, certification requirements (ISI, CRS), and cross-references. Our system maps directly to these verified records.
            </div>
          </Card>

          <Card padding={24}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy-900)", marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                  <Database size={18} color="var(--text-muted)" /> Government e-Marketplace (GeM)
                </h3>
                <div style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                  Public procurement portal for government buyers.
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                <Badge variant="slate">Planned Integration</Badge>
                <a 
                  href="https://gem.gov.in/" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
                >
                  Open Official Source <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </Card>
        </div>

        <h2 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <Code size={16} /> Technical Infrastructure
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card padding={24}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Server size={18} color="var(--navy-900)" />
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy-900)", margin: 0 }}>FAISS</h3>
            </div>
            <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 12 }}>
              Facebook AI Similarity Search. High-performance library for dense vector clustering and similarity search.
            </div>
            <Badge variant="slate">Vector Database</Badge>
          </Card>
          <Card padding={24}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Cpu size={18} color="var(--navy-900)" />
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy-900)", margin: 0 }}>BGE Embeddings</h3>
            </div>
            <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 12 }}>
              BAAI General Embedding model used to convert natural language queries and text into semantic vectors.
            </div>
            <Badge variant="slate">NLP Model</Badge>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
