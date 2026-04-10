const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? '').trim().replace(/\/+$/, '');

function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${API_BASE}${normalizedPath}`;
}

export const API_ENDPOINTS = {
  login: buildApiUrl('/api/login'),
  instructorStudents: (instructorId: string) =>
    buildApiUrl(`/api/instructor/${encodeURIComponent(instructorId)}/students`),
} as const;
