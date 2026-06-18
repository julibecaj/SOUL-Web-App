import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "../components/AppShell";
import { GlassCard, MusicGrid, PageHeader, SectionTitle, TrackTable } from "../components/AppContent";

export const metadata: Metadata = { title: "Your Library" };

const saved = [
  { title: "Afterglow", subtitle: "Mira Vale · Album", tone: "tone-violet", href: "/albums" },
  { title: "Soft Collision", subtitle: "Lena Noir · Album", tone: "tone-gold", href: "/albums" },
  { title: "Under Current", subtitle: "The Deep End · Podcast", tone: "tone-cyan", href: "/podcasts" },
  { title: "Blue Hour", subtitle: "Lowlight · Album", tone: "tone-blue", href: "/albums" },
];

const tracks = [
  { title: "Everything We Never Said", artist: "Lena Noir", album: "Soft Collision", time: "3:19", tone: "tone-gold" },
  { title: "Ultraviolet", artist: "Mira Vale", album: "Afterglow", time: "3:51", tone: "tone-violet" },
  { title: "Static Bloom", artist: "Saint June", album: "Velvet Static", time: "4:03", tone: "tone-cyan" },
  { title: "Moonwater", artist: "Lowlight", album: "Blue Hour", time: "4:28", tone: "tone-blue" },
];

export default function LibraryPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Collected by you" title="Your Library." description="Saved sounds and familiar voices, all in one place." />
      <div className="library-stats">
        <GlassCard><strong>18</strong><span>Saved albums</span><Link href="/albums">Explore</Link></GlassCard>
        <GlassCard><strong>64</strong><span>Favorite tracks</span><Link href="/favorites">Listen</Link></GlassCard>
        <GlassCard><strong>28</strong><span>Artists followed</span><Link href="/artists">View artists</Link></GlassCard>
      </div>
      <div className="app-section">
        <SectionTitle title="Saved for later" link="All albums" href="/albums" />
        <MusicGrid items={saved} />
      </div>
      <div className="app-section">
        <SectionTitle title="Recent tracks" />
        <TrackTable tracks={tracks} />
      </div>
    </AppShell>
  );
}
