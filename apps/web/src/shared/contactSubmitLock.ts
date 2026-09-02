const STORAGE_KEY = 'contactSubmitLock:v1';
export const CONTACT_SUBMIT_COOLDOWN_MS = 15 * 60 * 1000;

export function getContactSubmitLockedUntil(): number | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const until = Number(raw);
    if (!Number.isFinite(until) || until <= Date.now()) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return until;
  } catch {
    return null;
  }
}

export function setContactSubmitLock() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      String(Date.now() + CONTACT_SUBMIT_COOLDOWN_MS),
    );
  } catch {
    // Private browsing or storage disabled — server-side guard still applies.
  }
}

export function formatCooldownRemaining(until: number): string {
  const totalSeconds = Math.max(0, Math.ceil((until - Date.now()) / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes > 0) {
    return `${minutes} min${seconds > 0 ? ` ${seconds} s` : ''}`;
  }

  return `${seconds} s`;
}
