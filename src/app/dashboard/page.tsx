import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "../components/AppShell";
import { Icon } from "../components/Icon";
import { PageHeader, SectionTitle, TrackTable } from "../components/AppContent";

export const metadata: Metadata = { title: "Dashboard" };

const cards = [
  { title: "Albums", detail: "18 saved releases", icon: "album", count: "18", href: "/albums", tone: "card-violet" },
  { title: "Podcasts", detail: "7 shows in rotation", icon: "podcast", count: "07", href: "/podcasts", tone: "card-cyan" },
  { title: "Favorites", detail: "Your most-loved tracks", icon: "heart", count: "64", href: "/favorites", tone: "card-magenta" },
  { title: "Playlists", detail: "12 worlds you created", icon: "playlist", count: "12", href: "/playlists", tone: "card-gold" },
  { title: "Artists", detail: "Following 28 creators", icon: "artist", count: "28", href: "/artists", tone: "card-blue" },
  { title: "Uploads", detail: "Your creative space", icon: "upload", count: "03", href: "/uploads", tone: "card-violet" },
];

const recentTracks = [
  { title: "Electric Heart", artist: "Mira Vale", album: "Afterglow", time: "3:42", tone: "tone-violet" },
  { title: "Slow Motion", artist: "Saint June", album: "Velvet Static", time: "4:08", tone: "tone-cyan" },
  { title: "Midnight Cinema", artist: "Lowlight", album: "Blue Hour", time: "4:31", tone: "tone-blue" },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Good evening, Alex"
        title="Your SOUL."
        description="Return to the sounds, voices, and artists moving with you."
        action={<div className="search-pill"><Icon name="search" className="h-4 w-4" /> Search your library</div>}
      />

      <div className="dashboard-hero">
        <div>
          <p>Made for your evening</p>
          <h2>Late-night colors<br />and slower rhythms.</h2>
          <Link href="/playlists" className="hero-inline-link">
            Listen now <Icon name="play" className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="dashboard-grid">
        {cards.map((card) => (
          <Link href={card.href} className={`dashboard-card ${card.tone}`} key={card.title}>
            <div className="dashboard-card-icon"><Icon name={card.icon} className="h-5 w-5" /></div>
            <span>{card.count}</span>
            <h3>{card.title}</h3>
            <p>{card.detail}</p>
          </Link>
        ))}
      </div>

      <div className="app-section">
        <SectionTitle title="Recently played" link="Open library" href="/library" />
        <TrackTable tracks={recentTracks} />
      </div>
    </AppShell>
  );
}
