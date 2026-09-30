// TypeScript types for StandardSync AI frontend
// Must stay in sync with backend Pydantic schemas

export interface Certification {
  name: string;
  status: "required" | "applicable" | "not_applicable" | "not_identified";
  note?: string | null;
}

export interface RelatedStandard {
  is_code: string;
  title: string;
  relationship?: string;
  relevance_note?: string;
  score?: number | null;
  source?: string;
}

export interface Evidence {
  source_document: string;
  clause: string;
  text: string;
  source_url?: string | null;
}

export interface Standard {
  id: string;
  is_code: string;
  title: string;
  description: string;
  category: string;
  application: string;
  source: string;
  status: "active" | "withdrawn" | "under_revision";
  
  publication_date?: string | null;
  revision_year?: number | null;
  amendment_count: number;
  source_name: string;
  source_url?: string | null;
  know_your_standard_url?: string | null;
  document_url?: string | null;
  
  certification_status?: string | null;
  certification_type?: string | null;
  
  allied_standards: RelatedStandard[];
  normative_references: RelatedStandard[];
  test_methods: RelatedStandard[];
  safety_standards: RelatedStandard[];
  installation_standards: RelatedStandard[];
  related_standards: RelatedStandard[];
  
  certifications: Certification[];
  evidence: Evidence;
  evidence_source?: string | null;
  last_verified?: string | null;
  data_origin: string; // "DEMO" | "BIS_OFFICIAL"
  verification_status: string; // "DEMO" | "VERIFIED" | "NEEDS_REVIEW"
  faiss_id?: string | null;
  
  is_demo: boolean;
}

export interface SearchRequest {
  query: string;
  language: "en" | "hi" | "te" | "ta" | "bn" | "mr" | "gu" | "kn" | string;
}

export interface SearchResult {
  query: string;
  translated_query?: string | null;
  found: boolean;
  match_status: string;
  standard?: Standard | null;
  score?: number | null;
  certifications: Certification[];
  related_standards: RelatedStandard[];
  evidence?: Evidence | null;
  why_matched?: string | null;
  latency_ms: number;
  demo_mode: boolean;
  threshold_used: number;
  suggestions: string[];
}

export interface HistoryEntry {
  id: string;
  date: string;
  query: string;
  matched_standard?: string | null;
  matched_title?: string | null;
  score?: number | null;
  status: "verified" | "not_found" | "below_threshold";
}

export interface SavedStandard {
  id: string;
  is_code: string;
  title: string;
  category: string;
  source: string;
  saved_date: string;
  certifications: Certification[];
  is_demo: boolean;
}

export interface ComplianceSummary {
  total_standards_indexed: number;
  active_standards: number;
  certification_requirements: number;
  recent_searches: number;
  searches_by_category: Record<string, number>;
}

export type Language = "en" | "hi" | "te";

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
  te: "తెలుగు",
};

export const EXAMPLE_QUERIES: Record<Language, string[]> = {
  en: [
    "Hospital grade copper wire",
    "Electrical cable for buildings",
    "Stainless steel drinking water tank",
    "Safety helmet for industrial workers",
    "LED light for office building",
    "Mild steel pipe for water line",
  ],
  hi: [
    "अस्पताल ग्रेड कॉपर वायर",
    "विद्युत केबल",
    "स्टेनलेस स्टील टैंक",
    "सुरक्षा हेलमेट",
  ],
  te: [
    "హాస్పిటల్ గ్రేడ్ కాపర్ వైర్",
    "విద్యుత్ కేబుల్",
    "స్టెయిన్‌లెస్ స్టీల్ ట్యాంక్",
    "భద్రతా శిరస్త్రాణం",
  ],
};
