const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? '').trim().replace(/\/+$/, '');
const DEV_BACKEND_ORIGIN = "http://localhost:8000";

function buildApiUrl(path: string, options?: { devDirectOrigin?: string }): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const directOrigin =
    API_BASE || (import.meta.env.DEV ? options?.devDirectOrigin?.trim().replace(/\/+$/, '') ?? '' : '');

  if (directOrigin.endsWith('/api') && normalizedPath.startsWith('/api')) {
    return `${directOrigin}${normalizedPath.slice(4) || ''}`;
  }

  return `${directOrigin}${normalizedPath}`;
}

function buildBackendApiUrl(path: string): string {
  return buildApiUrl(path, { devDirectOrigin: DEV_BACKEND_ORIGIN });
}

export const API_ENDPOINTS = {
  login: buildApiUrl('/api/auth/login'),
  instructorStudents: (instructorId: string) =>
    buildBackendApiUrl(`/api/instructor/${encodeURIComponent(instructorId)}/students`),
  instructorTracks: (instructorId: string) =>
    buildBackendApiUrl(`/api/instructor/${encodeURIComponent(instructorId)}/tracks`),
} as const;
