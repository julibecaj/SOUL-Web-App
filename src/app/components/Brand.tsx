import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={`brand ${compact ? "brand-compact" : ""}`} aria-label="SOUL home">
      <span className="brand-mark" aria-hidden="true">
        <span /><span /><span /><span />
      </span>
      <span className="brand-word">SOUL</span>
    </Link>
  );
}
