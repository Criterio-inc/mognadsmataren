import { customAlphabet } from 'nanoid';

// Generate a short, URL-safe share code (6 characters)
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

export function generateShareCode(): string {
  return nanoid();
}

// Extract domain from email (e.g., "john@volvo.se" -> "volvo.se")
export function extractDomain(email: string): string {
  return email.split('@')[1]?.toLowerCase() || '';
}

// Validate email belongs to expected domain
export function isValidClientEmail(email: string, clientDomain: string): boolean {
  const emailDomain = extractDomain(email);
  return emailDomain === clientDomain.toLowerCase();
}

// Format date for display
export function formatDate(date: Date | string, locale: string = 'sv'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale === 'sv' ? 'sv-SE' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Check if deadline has passed
export function isDeadlinePassed(deadline: Date | string | null): boolean {
  if (!deadline) return false;
  const d = typeof deadline === 'string' ? new Date(deadline) : deadline;
  return d < new Date();
}
