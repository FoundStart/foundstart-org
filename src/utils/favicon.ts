// Resolve a favicon image URL for any partner link using Google's S2 service.
// Works for 600+ partners instantly, no API key, no cost.
export function getFaviconUrl(url: string, size: 64 | 128 | 256 = 128): string {
  try {
    const cleaned = url.startsWith('http') ? url : `https://${url}`;
    const host = new URL(cleaned).hostname.replace(/^www\./, '');
    return `https://www.google.com/s2/favicons?domain=${host}&sz=${size}`;
  } catch {
    return `https://www.google.com/s2/favicons?domain=foundstart.org&sz=${size}`;
  }
}

export function getDomainHost(url: string): string {
  try {
    const cleaned = url.startsWith('http') ? url : `https://${url}`;
    return new URL(cleaned).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
