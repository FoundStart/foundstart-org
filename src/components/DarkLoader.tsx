const DarkLoader = () => (
  <div style={{ position: "fixed", inset: 0, background: "#0e0a1b", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
    <div className="h-8 w-8 animate-spin rounded-full border-4" style={{ borderColor: "#334155", borderTopColor: "#60a5fa" }} />
  </div>
);
export default DarkLoader;
