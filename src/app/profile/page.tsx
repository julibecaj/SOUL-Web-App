import type { Metadata } from "next";
import { AppShell } from "../components/AppShell";
import { GlassCard, PageHeader, SectionTitle } from "../components/AppContent";
import { Icon } from "../components/Icon";

export const metadata: Metadata = { title: "My Profile" };

const moods = ["After dark", "Dream state", "Soft focus", "Electric", "Melancholy"];

export default function ProfilePage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Your listening identity" title="Alex Morgan." description="The shape of your sound, one late night at a time." />
      <GlassCard className="profile-hero-card">
        <div className="profile-avatar">AM</div>
        <div className="profile-identity">
          <span>SOUL member since 2025</span>
          <h2>Alex Morgan</h2>
          <p>Budapest · listening now</p>
        </div>
        <div className="profile-now-playing">
          <Icon name="wave" className="h-5 w-5" />
          <div><span>Now playing</span><strong>Electric Heart · Mira Vale</strong></div>
        </div>
      </GlassCard>

      <div className="profile-stat-grid">
        <GlassCard><strong>4,820</strong><span>Minutes this month</span></GlassCard>
        <GlassCard><strong>312</strong><span>Tracks discovered</span></GlassCard>
        <GlassCard><strong>28</strong><span>Artists followed</span></GlassCard>
        <GlassCard><strong>12</strong><span>Playlists created</span></GlassCard>
      </div>

      <div className="app-section">
        <SectionTitle title="Favorite moods" />
        <GlassCard className="mood-card">
          {moods.map((mood, index) => <span className={`mood-pill mood-${index + 1}`} key={mood}>{mood}</span>)}
        </GlassCard>
      </div>
    </AppShell>
  );
}
