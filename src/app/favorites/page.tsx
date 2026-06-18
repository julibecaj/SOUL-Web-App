import type { Metadata } from "next";
import { AppShell } from "../components/AppShell";
import { GlassCard, PageHeader, SectionTitle, TrackTable } from "../components/AppContent";
import { Icon } from "../components/Icon";

export const metadata: Metadata = { title: "Favorites" };

const favorites = [
  { title: "Electric Heart", artist: "Mira Vale", album: "Afterglow", time: "3:42", tone: "tone-violet" },
  { title: "Slow Motion", artist: "Saint June", album: "Velvet Static", time: "4:08", tone: "tone-cyan" },
  { title: "Everything We Never Said", artist: "Lena Noir", album: "Soft Collision", time: "3:19", tone: "tone-gold" },
  { title: "Midnight Cinema", artist: "Lowlight", album: "Blue Hour", time: "4:31", tone: "tone-blue" },
  { title: "Fever Dream", artist: "Aster Bloom", album: "Fever Dream", time: "3:55", tone: "tone-magenta" },
  { title: "First Light", artist: "Golden Youth", album: "Daybreak", time: "4:02", tone: "tone-coral" },
];

export default function FavoritesPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Loved by you" title="Favorites." description="The tracks that found a permanent place in your world." />
      <GlassCard className="favorites-banner">
        <div className="favorites-heart"><Icon name="heart" className="h-12 w-12" /></div>
        <div><span>Your collection</span><h2>64 songs, no skips.</h2><p>4 hours 18 minutes of your most-loved sound.</p></div>
        <button aria-label="Play all favorites"><Icon name="play" className="h-5 w-5" /></button>
      </GlassCard>
      <div className="app-section">
        <SectionTitle title="All favorites" />
        <TrackTable tracks={favorites} />
      </div>
    </AppShell>
  );
}
