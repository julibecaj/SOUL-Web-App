import type { Metadata } from "next";
import { AppShell } from "../components/AppShell";
import { MusicGrid, PageHeader, SectionTitle } from "../components/AppContent";

export const metadata: Metadata = { title: "Albums" };

const albums = [
  { title: "Afterglow", subtitle: "Mira Vale · 2026", tone: "tone-violet", eyebrow: "New release" },
  { title: "Velvet Static", subtitle: "Saint June · 2026", tone: "tone-cyan", eyebrow: "Editor’s pick" },
  { title: "Soft Collision", subtitle: "Lena Noir · 2025", tone: "tone-gold", eyebrow: "Album" },
  { title: "Blue Hour", subtitle: "Lowlight · 2025", tone: "tone-blue", eyebrow: "Album" },
  { title: "Fever Dream", subtitle: "Aster Bloom · 2026", tone: "tone-magenta", eyebrow: "Trending" },
  { title: "Daybreak", subtitle: "Golden Youth · 2025", tone: "tone-coral", eyebrow: "Album" },
  { title: "Night Language", subtitle: "Dawn Arcade · 2026", tone: "tone-deep", eyebrow: "New release" },
  { title: "Slow Burn", subtitle: "Iris North · 2024", tone: "tone-rose", eyebrow: "SOUL classic" },
];

export default function AlbumsPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Full-length feelings" title="Albums." description="Records built as worlds, selected for front-to-back listening." />
      <SectionTitle title="Curated for you" />
      <MusicGrid items={albums} />
    </AppShell>
  );
}
