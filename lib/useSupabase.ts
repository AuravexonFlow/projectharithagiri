'use client';

import { useState, useEffect } from 'react';
import { supabase } from './supabase';

/**
 * Custom hook to fetch data from Supabase with hardcoded fallback.
 * Returns [data, loading] tuple.
 */
export function useSupabaseData<T>(
  table: string,
  fallbackData: T[],
  options?: {
    column?: string;
    value?: string | boolean;
    order?: { column: string; ascending?: boolean };
    limit?: number;
    select?: string;
  }
): [T[], boolean] {
  const [data, setData] = useState<T[]>(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        let query = supabase.from(table).select(options?.select || '*');

        if (options?.column && options?.value !== undefined) {
          query = query.eq(options.column, options.value);
        }

        if (options?.order) {
          query = query.order(options.order.column, {
            ascending: options.order.ascending ?? true,
          });
        }

        if (options?.limit) {
          query = query.limit(options.limit);
        }

        const { data: result, error } = await query;

        if (!error && result && result.length > 0) {
          setData(result as T[]);
        }
        // If error or empty, keep fallback data
      } catch (err) {
        console.error(`Error fetching ${table}:`, err);
        // Keep fallback data
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [table]);

  return [data, loading];
}

/**
 * Hook to fetch a single row from Supabase
 */
export function useSupabaseSingle<T>(
  table: string,
  fallbackData: T,
  column: string,
  value: string
): [T, boolean] {
  const [data, setData] = useState<T>(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: result, error } = await supabase
          .from(table)
          .select('*')
          .eq(column, value)
          .single();

        if (!error && result) {
          setData(result as T);
        }
      } catch (err) {
        console.error(`Error fetching ${table}:`, err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [table, column, value]);

  return [data, loading];
}

/**
 * Hook to fetch site settings
 */
export function useSiteSettings(): [Record<string, string>, boolean] {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('key, value');

        if (!error && data) {
          const map: Record<string, string> = {};
          data.forEach((s: { key: string; value: string | null }) => {
            if (s.value) map[s.key] = s.value;
          });
          setSettings(map);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  return [settings, loading];
}
