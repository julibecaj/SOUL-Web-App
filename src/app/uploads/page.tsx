import type { Metadata } from "next";
import { AppShell } from "../components/AppShell";
import { GlassCard, PageHeader, SectionTitle } from "../components/AppContent";
import { Icon } from "../components/Icon";

export const metadata: Metadata = { title: "Uploads" };

const releases = [
  { title: "Paper Moons", type: "Single", date: "June 12, 2026", status: "Live", tone: "tone-violet" },
  { title: "City in Reverse", type: "Demo", date: "June 8, 2026", status: "Private", tone: "tone-cyan" },
  { title: "Still Warm", type: "Single", date: "May 24, 2026", status: "Live", tone: "tone-gold" },
];

export default function UploadsPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Artist space" title="Uploads." description="Shape your next release and keep every detail close." />
      <div className="upload-layout">
        <GlassCard className="upload-dropzone">
          <span className="upload-icon"><Icon name="upload" className="h-7 w-7" /></span>
          <h2>Bring your next sound into SOUL.</h2>
          <p>Audio, artwork, and release details can begin here.</p>
          <button className="button-primary"><Icon name="plus" className="h-4 w-4" /> Choose audio</button>
          <small>WAV, FLAC, or MP3 · up to 500 MB</small>
        </GlassCard>
        <GlassCard className="upload-insights">
          <p className="eyebrow">This month</p>
          <strong>18.4K</strong>
          <span>total listens</span>
          <div className="mini-bars">
            {[35, 52, 44, 68, 61, 82, 72, 94, 78, 100].map((height, index) => (
              <i style={{ height: `${height}%` }} key={index} />
            ))}
          </div>
        </GlassCard>
      </div>
      <div className="app-section">
        <SectionTitle title="Your releases" />
        <div className="release-list">
          {releases.map((release) => (
            <GlassCard className="release-row" key={release.title}>
              <span className={`release-art ${release.tone}`} />
              <div><h3>{release.title}</h3><p>{release.type} · {release.date}</p></div>
              <span className={`release-status ${release.status === "Live" ? "is-live" : ""}`}>{release.status}</span>
              <button aria-label={`Open ${release.title}`}><Icon name="arrow" className="h-4 w-4" /></button>
            </GlassCard>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
