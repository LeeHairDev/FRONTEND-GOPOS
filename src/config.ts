// API configuration - compute endpoints at runtime to allow overriding the base URL
// via `window.__API_BASE_URL` without requiring a rebuild.
const defaultBase = 'http://localhost:5000';

const normalize = (u?: string) => (u ? u.replace(/\/+$/, '') : undefined);

export function getApiBaseUrl(): string {
  const runtimeBase = typeof window !== 'undefined' ? (window as any).__API_BASE_URL : undefined;
  const envBase = import.meta.env?.VITE_API_URL;
  return normalize(runtimeBase) || normalize(envBase) || defaultBase;
}

// API_ENDPOINTS is a proxy that computes each endpoint at access time
export const API_ENDPOINTS: Record<string, string> = new Proxy({}, {
  get: (_target, prop: string) => {
    const base = getApiBaseUrl();
    const key = String(prop).toLowerCase();
    return `${base}/api/${key}`;
  }
});
