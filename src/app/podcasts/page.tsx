import type { Metadata } from "next";
import { AppShell } from "../components/AppShell";
import { GlassCard, MusicGrid, PageHeader, SectionTitle } from "../components/AppContent";
import { Icon } from "../components/Icon";

export const metadata: Metadata = { title: "Podcasts" };

const podcasts = [
  { title: "The Deep End", subtitle: "Ideas worth sinking into", tone: "tone-cyan", eyebrow: "New episode" },
  { title: "After Hours", subtitle: "Artists when the lights go down", tone: "tone-violet", eyebrow: "Weekly" },
  { title: "Human Frequency", subtitle: "Stories about what moves us", tone: "tone-magenta", eyebrow: "SOUL original" },
  { title: "Quietly Loud", subtitle: "Culture, identity, and sound", tone: "tone-gold", eyebrow: "Featured" },
];

const episodes = [
  { show: "The Deep End", title: "Why certain songs feel like memories", length: "42 min", tone: "tone-cyan" },
  { show: "After Hours", title: "Mira Vale on making Afterglow", length: "58 min", tone: "tone-violet" },
  { show: "Human Frequency", title: "The sound of a city after midnight", length: "36 min", tone: "tone-magenta" },
];

export default function PodcastsPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Voices with depth" title="Podcasts." description="Conversations, stories, and ideas made for headphones." />
      <MusicGrid items={podcasts} />
      <div className="app-section">
        <SectionTitle title="Continue listening" />
        <div className="episode-list">
          {episodes.map((episode) => (
            <GlassCard className="episode-card" key={episode.title}>
              <span className={`episode-art ${episode.tone}`}><Icon name="podcast" className="h-6 w-6" /></span>
              <div><span>{episode.show}</span><h3>{episode.title}</h3><p>{episode.length} · Episode</p></div>
              <button aria-label={`Play ${episode.title}`}><Icon name="play" className="h-4 w-4" /></button>
            </GlassCard>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
