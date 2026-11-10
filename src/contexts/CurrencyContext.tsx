import React, { createContext, useContext, useState, useEffect } from 'react';

type CurrencyCode = 'EGP' | 'USD' | 'EUR' | 'GBP';
type RateSnapshot = { rates: Record<CurrencyCode, number>; updated: number; next: number };
interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  rates: Record<CurrencyCode, number>;
  rateUpdated: number | null;
  rateReady: boolean;
  convert: (amount: number, from?: CurrencyCode) => number;
  format: (amount: number, from?: CurrencyCode) => string;
  formatBoth: (amount: number, from?: CurrencyCode) => string;
}
const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);
const MAX_AGE = 36 * 60 * 60 * 1000;
const CACHE_KEY = 'foundstart_daily_fx_v1';
const valid = (s: RateSnapshot | null, now: number): s is RateSnapshot => !!s &&
  Number.isFinite(s.updated) && s.updated <= now + 300000 && now - s.updated <= MAX_AGE &&
  Number.isFinite(s.next) && s.next > s.updated && s.rates?.USD === 1 &&
  ['EGP', 'EUR', 'GBP'].every(c => Number.isFinite(s.rates[c]) && s.rates[c] > 0);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>('EGP');
  const [snapshot, setSnapshot] = useState<RateSnapshot | null>(null);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const saved = localStorage.getItem('foundstart_currency_egp_v1') as CurrencyCode;
    if (['EGP', 'USD', 'EUR', 'GBP'].includes(saved)) setCurrency(saved);
    let cancelled = false;
    let current: RateSnapshot | null = null;
    try { current = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); } catch {}
    if (valid(current, Date.now())) setSnapshot(current);
    let attempted = 0;
    const refresh = async () => {
      const time = Date.now();
      setNow(time);
      if (valid(current, time) && current.next > time) return;
      if (time - attempted < 3600000) return;
      attempted = time;
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD', { signal: AbortSignal.timeout(8000) });
        if (!response.ok) throw new Error('rate unavailable');
        const data = await response.json();
        const candidate: RateSnapshot = { rates: { USD: data.rates?.USD, EGP: data.rates?.EGP, EUR: data.rates?.EUR, GBP: data.rates?.GBP }, updated: data.time_last_update_unix * 1000, next: data.time_next_update_unix * 1000 };
        if (data.result !== 'success' || data.base_code !== 'USD' || !valid(candidate, Date.now())) throw new Error('stale or invalid rate');
        current = candidate;
        localStorage.setItem(CACHE_KEY, JSON.stringify(candidate));
        if (!cancelled) { setSnapshot(candidate); setNow(Date.now()); }
      } catch { /* A missing or stale quote falls back to explicit original-currency prices. */ }
    };
    void refresh();
    const timer = window.setInterval(refresh, 60000);
    return () => { cancelled = true; clearInterval(timer); };
  }, []);
  const chooseCurrency = (next: CurrencyCode) => {
    setCurrency(next);
    localStorage.setItem('foundstart_currency_egp_v1', next);
  };
  const rateReady = valid(snapshot, now);
  const rates = rateReady ? snapshot.rates : { USD: 1, EGP: NaN, EUR: NaN, GBP: NaN };
  const convert = (amount: number, from: CurrencyCode = 'USD') => from === currency ? amount : amount / rates[from] * rates[currency];
  const format = (amount: number, from: CurrencyCode = 'USD') => {
    const converted = convert(amount, from);
    const usable = Number.isFinite(converted);
    const code = usable ? currency : from;
    const value = usable ? converted : amount;
    return `${code} ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  const formatBoth = (amount: number, from: CurrencyCode = 'USD') => `${format(amount, from)} (${from} ${amount.toLocaleString('en-US')})`;
  return <CurrencyContext.Provider value={{ currency, setCurrency: chooseCurrency, rates, rateUpdated: rateReady ? snapshot.updated : null, rateReady, convert, format, formatBoth }}>{children}</CurrencyContext.Provider>;
};
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
};
