import type { Metadata } from "next";
import { AppShell } from "../components/AppShell";
import { GlassCard, MusicGrid, PageHeader, SectionTitle, TrackTable } from "../components/AppContent";

export const metadata: Metadata = { title: "Playlists" };

const playlists = [
  { title: "Night Drive", subtitle: "Neon roads and 2 AM thoughts", tone: "tone-violet", eyebrow: "32 tracks" },
  { title: "Focus Flow", subtitle: "Soft electronic focus", tone: "tone-cyan", eyebrow: "48 tracks" },
  { title: "Euphoria Mix", subtitle: "Beautiful chaos in stereo", tone: "tone-magenta", eyebrow: "26 tracks" },
  { title: "Golden Hour", subtitle: "Warm light, open windows", tone: "tone-gold", eyebrow: "21 tracks" },
  { title: "Blue Velvet", subtitle: "Slow songs after midnight", tone: "tone-blue", eyebrow: "18 tracks" },
  { title: "Pulse", subtitle: "Energy without the noise", tone: "tone-coral", eyebrow: "40 tracks" },
];

const tracks = [
  { title: "Infinite City", artist: "Mira Vale", album: "Night Drive", time: "3:58", tone: "tone-violet" },
  { title: "Glass Skyline", artist: "Dawn Arcade", album: "Night Drive", time: "4:14", tone: "tone-cyan" },
  { title: "Headlights", artist: "Saint June", album: "Euphoria Mix", time: "3:36", tone: "tone-magenta" },
];

export default function PlaylistsPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Your worlds" title="Playlists." description="Every mood has a room here. Step back into one you made." />
      <MusicGrid items={playlists} />
      <div className="app-section">
        <SectionTitle title="On repeat" />
        <GlassCard className="flush-card"><TrackTable tracks={tracks} /></GlassCard>
      </div>
    </AppShell>
  );
}
