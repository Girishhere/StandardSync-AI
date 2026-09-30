import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import { I18nProvider } from "@/i18n/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "StandardSync AI — BIS Standard Recommendation Engine",
  description:
    "Find applicable Indian Standards from plain-language procurement requirements. Evidence-grounded results with compliance and certification information.",
  keywords: ["BIS", "Indian Standards", "procurement", "IS code", "compliance", "SIH 2026"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}>
        <I18nProvider>
          <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar />
            <main
              style={{
                flex: 1,
                minWidth: 0,
                background: "var(--page-bg, #F0F4FF)",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              {children}
            </main>
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
