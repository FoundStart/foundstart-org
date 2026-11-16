// The open exchange-rate provider requires a discreet source link, not a notice panel.
export default function ExchangeRateNotice() {
  return <p className="py-3 text-xs text-muted-foreground" data-testid="exchange-rate-attribution"><a className="underline underline-offset-2 hover:text-foreground" href="https://www.exchangerate-api.com" target="_blank" rel="noopener noreferrer">Rates By Exchange Rate API</a></p>;
}
