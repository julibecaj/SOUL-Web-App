import type { Metadata } from "next";
import { AppShell } from "../components/AppShell";
import { PageHeader, SectionTitle } from "../components/AppContent";
import { Icon } from "../components/Icon";

export const metadata: Metadata = { title: "Artists" };

const artists = [
  { name: "Mira Vale", genre: "Alternative pop", listeners: "2.8M listeners", tone: "tone-violet" },
  { name: "Saint June", genre: "Dream electronic", listeners: "1.4M listeners", tone: "tone-cyan" },
  { name: "Lena Noir", genre: "Neo soul", listeners: "980K listeners", tone: "tone-gold" },
  { name: "Lowlight", genre: "Ambient pop", listeners: "742K listeners", tone: "tone-blue" },
  { name: "Aster Bloom", genre: "Art pop", listeners: "1.1M listeners", tone: "tone-magenta" },
  { name: "Dawn Arcade", genre: "Indie electronic", listeners: "621K listeners", tone: "tone-coral" },
];

export default function ArtistsPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Creators you follow" title="Artists." description="Stay close to the voices shaping your listening world." />
      <SectionTitle title="In your orbit" />
      <div className="artist-grid">
        {artists.map((artist) => (
          <article className="artist-card" key={artist.name}>
            <div className={`artist-portrait ${artist.tone}`}><span>{artist.name.slice(0, 1)}</span></div>
            <div><h3>{artist.name}</h3><p>{artist.genre}</p><span>{artist.listeners}</span></div>
            <button aria-label={`Play ${artist.name}`}><Icon name="play" className="h-4 w-4" /></button>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
