/**
 * Lightweight client-side toggles for external integrations.
 * Lets devs run the app without API keys by enabling "mock" mode.
 * Persisted in localStorage; readable from any component.
 */
export type IntegrationKey = 'resend' | 'kashier' | 'stripe' | 'partnerAds' | 'aiAssistant';

const LS_KEY = 'fs:integration-settings';

export interface IntegrationSettings {
  resend: boolean;       // true = live, false = mock
  kashier: boolean;
  stripe: boolean;
  partnerAds: boolean;
  aiAssistant: boolean;
}

const DEFAULTS: IntegrationSettings = {
  resend: true,
  kashier: true,
  stripe: true,
  partnerAds: true,
  aiAssistant: true,
};

export function getIntegrationSettings(): IntegrationSettings {
  if (typeof window === 'undefined') return DEFAULTS;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

export function setIntegration(key: IntegrationKey, value: boolean): void {
  const next = { ...getIntegrationSettings(), [key]: value };
  localStorage.setItem(LS_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('fs:integration-change', { detail: next }));
}

export function isLive(key: IntegrationKey): boolean {
  if (import.meta.env.VITE_ENABLE_MOCK_INTEGRATIONS === 'true' &&
      (key === 'resend' || key === 'kashier' || key === 'stripe')) {
    return false;
  }
  return getIntegrationSettings()[key];
}