import Link from "next/link";
import { Icon } from "./Icon";

export type MusicItem = {
  title: string;
  subtitle: string;
  tone: string;
  eyebrow?: string;
  href?: string;
};

export type Track = {
  title: string;
  artist: string;
  album: string;
  time: string;
  tone?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="app-page-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="app-page-description">{description}</p>
      </div>
      {action}
    </header>
  );
}

export function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`app-glass-card ${className}`}>{children}</section>;
}

export function MusicCard({ item, index = 0 }: { item: MusicItem; index?: number }) {
  const content = (
    <>
      <div className={`music-card-art ${item.tone}`}>
        <span className="art-noise" />
        <span className="music-card-index">{String(index + 1).padStart(2, "0")}</span>
        <span className="music-card-play"><Icon name="play" className="h-4 w-4" /></span>
      </div>
      {item.eyebrow && <p className="music-card-eyebrow">{item.eyebrow}</p>}
      <h3>{item.title}</h3>
      <p>{item.subtitle}</p>
    </>
  );

  return item.href ? (
    <Link href={item.href} className="music-card">{content}</Link>
  ) : (
    <article className="music-card">{content}</article>
  );
}

export function MusicGrid({ items }: { items: MusicItem[] }) {
  return (
    <div className="app-music-grid">
      {items.map((item, index) => <MusicCard item={item} index={index} key={item.title} />)}
    </div>
  );
}

export function TrackTable({ tracks }: { tracks: Track[] }) {
  return (
    <div className="app-track-table">
      {tracks.map((track, index) => (
        <div className="app-track-row" key={`${track.title}-${track.artist}`}>
          <span className="app-track-number">{String(index + 1).padStart(2, "0")}</span>
          <span className={`track-cover ${track.tone ?? "tone-violet"}`}>
            <Icon name="play" className="h-3 w-3" />
          </span>
          <div className="app-track-title"><strong>{track.title}</strong><span>{track.artist}</span></div>
          <span className="app-track-album">{track.album}</span>
          <button aria-label={`Favorite ${track.title}`}><Icon name="heart" className="h-4 w-4" /></button>
          <span className="app-track-time">{track.time}</span>
        </div>
      ))}
    </div>
  );
}

export function SectionTitle({
  title,
  link,
  href,
}: {
  title: string;
  link?: string;
  href?: string;
}) {
  return (
    <div className="app-section-title">
      <h2>{title}</h2>
      {link && href && <Link href={href}>{link} <Icon name="arrow" className="h-4 w-4" /></Link>}
    </div>
  );
}
