const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? '').trim().replace(/\/+$/, '');

function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (API_BASE.endsWith('/api') && normalizedPath.startsWith('/api')) {
    return `${API_BASE}${normalizedPath.slice(4) || ''}`;
  }

  return `${API_BASE}${normalizedPath}`;
}

export const API_ENDPOINTS = {
  login: buildApiUrl('/api/auth/login'),
  instructorStudents: (instructorId: string) =>
    buildApiUrl(`/api/instructor/${encodeURIComponent(instructorId)}/students`),
} as const;
