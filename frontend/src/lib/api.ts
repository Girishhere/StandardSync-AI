// API client for StandardSync AI backend

import type {
  ComplianceSummary,
  HistoryEntry,
  SavedStandard,
  SearchRequest,
  SearchResult,
  Standard,
} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001";

async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    let detail = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      detail = body.detail ?? detail;
    } catch {
      // ignore parse error
    }
    throw new Error(detail);
  }

  return res.json() as Promise<T>;
}

// ── Search ─────────────────────────────────────────────────────────────────────

export async function searchStandards(
  request: SearchRequest
): Promise<SearchResult> {
  return apiFetch<SearchResult>("/api/search", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

// ── Standards ──────────────────────────────────────────────────────────────────

export async function listStandards(category?: string): Promise<Standard[]> {
  const qs = category ? `?category=${encodeURIComponent(category)}` : "";
  return apiFetch<Standard[]>(`/api/standards${qs}`);
}

export async function getStandard(id: string): Promise<Standard> {
  return apiFetch<Standard>(`/api/standards/${id}`);
}

export async function saveStandard(id: string): Promise<SavedStandard> {
  return apiFetch<SavedStandard>(`/api/standards/${id}/save`, {
    method: "POST",
  });
}

// ── History ────────────────────────────────────────────────────────────────────

export async function getHistory(): Promise<HistoryEntry[]> {
  return apiFetch<HistoryEntry[]>("/api/history");
}

export async function deleteHistoryEntry(id: string): Promise<void> {
  await apiFetch<void>(`/api/history/${id}`, { method: "DELETE" });
}

// ── Saved ──────────────────────────────────────────────────────────────────────

export async function getSavedStandards(): Promise<SavedStandard[]> {
  return apiFetch<SavedStandard[]>("/api/saved");
}

export async function removeSavedStandard(id: string): Promise<void> {
  await apiFetch<void>(`/api/saved/${id}`, { method: "DELETE" });
}

// ── Compliance ─────────────────────────────────────────────────────────────────

export async function getComplianceSummary(): Promise<ComplianceSummary> {
  return apiFetch<ComplianceSummary>("/api/compliance/summary");
}

// ── Health ─────────────────────────────────────────────────────────────────────

export async function checkHealth(): Promise<{
  status: string;
  demo_mode: boolean;
  version: string;
}> {
  return apiFetch("/health");
}
