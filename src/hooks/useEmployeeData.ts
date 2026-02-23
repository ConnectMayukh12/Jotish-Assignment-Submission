import { useEffect, useState } from "react";
import type { Row } from "../types";
import { API_BODY, API_URL, ROWS_CACHE_KEY } from "../constants";

interface UseEmployeeDataResult {
  rows: Row[];
  loading: boolean;
  error: string;
}

/**
 * Fetches employee rows from the API and caches them in sessionStorage.
 * Subsequent calls (e.g. navigating to Charts or Map) are served from cache
 * without re-fetching.
 */
export function useEmployeeData(): UseEmployeeDataResult {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cached = sessionStorage.getItem(ROWS_CACHE_KEY);
    if (cached) {
      setRows(JSON.parse(cached) as Row[]);
      setLoading(false);
      return;
    }

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(API_BODY),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        const data: Row[] = json?.TABLE_DATA?.data ?? [];
        sessionStorage.setItem(ROWS_CACHE_KEY, JSON.stringify(data));
        setRows(data);
      })
      .catch(() => setError("Failed to load data. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  return { rows, loading, error };
}
