"use client";

import { useState, useEffect } from "react";

export function useCachedFetch<T>(url: string, fallback: T): [T, boolean] {
  const cacheKey = `admin_cache_${url}`;
  const [data, setData] = useState<T>(() => {
    if (typeof window === "undefined") return fallback;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.ts && Date.now() - parsed.ts < 1000 * 60 * 60) { // 1 hour max staleness
          return parsed.data;
        }
      }
    } catch {}
    return fallback;
  });
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const cached = localStorage.getItem(cacheKey);
      return !cached;
    } catch {}
    return true;
  });

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(fresh => {
        const result = Array.isArray(fresh) ? fresh : (fresh.error ? fallback : fresh);
        setData(result as T);
        setLoading(false);
        try {
          localStorage.setItem(cacheKey, JSON.stringify({ data: result, ts: Date.now() }));
        } catch {}
      })
      .catch(() => setLoading(false));
  }, [url, cacheKey]);

  return [data, loading];
}
