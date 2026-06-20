"use client";

import { useRef, useState, type FormEvent } from "react";
import { uploadTrack, type Track } from "@/lib/api";
import { AppShell } from "../components/AppShell";
import { GlassCard, PageHeader, SectionTitle } from "../components/AppContent";
import { Icon } from "../components/Icon";

const releases = [
  { title: "Paper Moons", type: "Single", date: "June 12, 2026", status: "Live", tone: "tone-violet" },
  { title: "City in Reverse", type: "Draft", date: "June 8, 2026", status: "Private", tone: "tone-cyan" },
  { title: "Still Warm", type: "Single", date: "May 24, 2026", status: "Live", tone: "tone-gold" },
];

export default function UploadsPage() {
  const audioInputRef = useRef<HTMLInputElement>(null);
  const [audioName, setAudioName] = useState("");
  const [coverName, setCoverName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadedTrack, setUploadedTrack] = useState<Track | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isUploading) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const audioFile = data.get("audioFile");
    const coverFile = data.get("coverFile");

    if (!(audioFile instanceof File) || !audioFile.size) {
      setError("Choose an audio file before publishing.");
      return;
    }

    if (coverFile instanceof File && !coverFile.size) {
      data.delete("coverFile");
    }

    setIsUploading(true);
    setError("");
    setSuccess("");

    try {
      const track = await uploadTrack(data);
      setUploadedTrack(track);
      setSuccess(`${track.title} is now in SOUL. Refresh your library or dashboard to see it there.`);
      form.reset();
      setAudioName("");
      setCoverName("");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error && caughtError.message
          ? caughtError.message
          : "The track could not be uploaded. Please try again.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AppShell>
      <PageHeader eyebrow="Artist space" title="Uploads." description="Shape your next release and keep every detail close." />
      <form onSubmit={handleSubmit}>
        <div className="upload-layout">
          <GlassCard className="upload-dropzone">
            <span className="upload-icon"><Icon name="upload" className="h-7 w-7" /></span>
            <h2>Bring your next sound into SOUL.</h2>
            <p>{audioName || "Start with high-quality audio and artwork that feels like the record."}</p>
            <input
              ref={audioInputRef}
              className="hidden"
              name="audioFile"
              type="file"
              accept="audio/mpeg,audio/mp3,audio/wav,audio/flac"
              required
              onChange={(event) => setAudioName(event.target.files?.[0]?.name ?? "")}
            />
            <button className="button-primary" type="button" onClick={() => audioInputRef.current?.click()}>
              <Icon name="plus" className="h-4 w-4" /> {audioName ? "Change audio" : "Choose audio"}
            </button>
            <small>WAV, FLAC, or MP3 · up to 500 MB</small>
          </GlassCard>

          <GlassCard className="release-form-card">
            <p className="eyebrow">Release details</p>
            <label>
              <span>Track title</span>
              <input className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" name="title" type="text" required />
            </label>
            <label>
              <span>Artist name</span>
              <input className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" name="artistName" type="text" required />
            </label>
            <label>
              <span>Album</span>
              <input className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" name="albumTitle" type="text" required />
            </label>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <label>
                <span>Genre</span>
                <input className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none" name="genre" type="text" required />
              </label>
              <label>
                <span>Mood</span>
                <input className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none" name="mood" type="text" required />
              </label>
            </div>
            <label>
              <span>Duration in seconds</span>
              <input className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" name="durationSeconds" type="number" min="1" required />
            </label>
            <label>
              <span>Cover image · optional</span>
              <input
                className="mt-2 block w-full text-xs text-white/45 file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:text-white"
                name="coverFile"
                type="file"
                accept="image/*"
                onChange={(event) => setCoverName(event.target.files?.[0]?.name ?? "")}
              />
              {coverName && <small className="mt-2 block text-white/30">{coverName}</small>}
            </label>
            <button className="button-primary publish-button" type="submit" disabled={isUploading}>
              {isUploading ? "Publishing…" : "Publish to SOUL"} <Icon name="arrow" className="h-4 w-4" />
            </button>
            {error && <p className="mt-3 text-xs text-pink-300" role="alert">{error}</p>}
            {success && <p className="mt-3 text-xs leading-5 text-cyan-200" role="status">{success}</p>}
          </GlassCard>
        </div>
      </form>

      <div className="app-section">
        <SectionTitle title="Your releases" />
        <div className="release-list">
          {uploadedTrack && (
            <GlassCard className="release-row">
              <span className="release-art tone-magenta" />
              <div><h3>{uploadedTrack.title}</h3><p>{uploadedTrack.albumTitle} · Just published</p></div>
              <span className="release-status is-live">Live</span>
              <span />
            </GlassCard>
          )}
          {releases.map((release) => (
            <GlassCard className="release-row" key={release.title}>
              <span className={`release-art ${release.tone}`} />
              <div><h3>{release.title}</h3><p>{release.type} · {release.date}</p></div>
              <span className={`release-status ${release.status === "Live" ? "is-live" : ""}`}>{release.status}</span>
              <button type="button" aria-label={`Open ${release.title}`}><Icon name="arrow" className="h-4 w-4" /></button>
            </GlassCard>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
