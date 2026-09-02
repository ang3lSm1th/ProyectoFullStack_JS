const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.VERCEL
    ? 'https://portfolio-api-tjj3.onrender.com/api/v1'
    : 'http://localhost:3001/api/v1');

export class ApiRequestError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

function parseErrorMessage(body: string, fallback: string): string {
  if (!body) return fallback;

  try {
    const data = JSON.parse(body) as { message?: string | string[] };
    if (typeof data.message === 'string') return data.message;
    if (Array.isArray(data.message) && data.message[0]) return data.message[0];
  } catch {
    return body;
  }

  return fallback;
}

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`API GET ${path} failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new ApiRequestError(
      response.status,
      parseErrorMessage(text, `API POST ${path} failed: ${response.status}`),
    );
  }

  return response.json() as Promise<T>;
}

export { API_URL, apiGet, apiPost };
