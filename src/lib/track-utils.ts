import type { Track } from "./api";

export const TRACK_TONES = [
  "tone-violet",
  "tone-cyan",
  "tone-gold",
  "tone-blue",
  "tone-magenta",
  "tone-coral",
  "tone-deep",
  "tone-rose",
];

export function formatDuration(seconds: number | null) {
  if (!seconds || seconds < 0) return "—";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

export function getTrackTone(track: Track, index = 0) {
  return TRACK_TONES[(track.id + index) % TRACK_TONES.length];
}

export function getTrackTags(track: Track) {
  return [track.mood, track.genre].filter((value): value is string => Boolean(value));
}

export function mostCommon(values: Array<string | null>) {
  const counts = new Map<string, number>();
  values.filter((value): value is string => Boolean(value)).forEach((value) => {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Open spectrum";
}

export type AlbumGroup = {
  title: string;
  artistName: string;
  coverUrl: string | null;
  tracks: Track[];
};

export function groupTracksByAlbum(tracks: Track[]): AlbumGroup[] {
  const groups = new Map<string, AlbumGroup>();
  tracks.forEach((track) => {
    const title = track.albumTitle?.trim() || "Untitled Collection";
    const key = `${track.artistName}::${title}`;
    const existing = groups.get(key);
    if (existing) {
      existing.tracks.push(track);
      if (!existing.coverUrl && track.coverUrl) existing.coverUrl = track.coverUrl;
    } else {
      groups.set(key, { title, artistName: track.artistName, coverUrl: track.coverUrl, tracks: [track] });
    }
  });
  return [...groups.values()];
}

export type ArtistGroup = {
  name: string;
  tracks: Track[];
  genres: string[];
  moods: string[];
  coverUrl: string | null;
};

export function groupTracksByArtist(tracks: Track[]): ArtistGroup[] {
  const groups = new Map<string, ArtistGroup>();
  tracks.forEach((track) => {
    const existing = groups.get(track.artistName);
    if (existing) {
      existing.tracks.push(track);
      if (track.genre && !existing.genres.includes(track.genre)) existing.genres.push(track.genre);
      if (track.mood && !existing.moods.includes(track.mood)) existing.moods.push(track.mood);
      if (!existing.coverUrl && track.coverUrl) existing.coverUrl = track.coverUrl;
    } else {
      groups.set(track.artistName, {
        name: track.artistName,
        tracks: [track],
        genres: track.genre ? [track.genre] : [],
        moods: track.mood ? [track.mood] : [],
        coverUrl: track.coverUrl,
      });
    }
  });
  return [...groups.values()];
}

export function selectPlaylistTracks(tracks: Track[], name: "night" | "focus" | "euphoria") {
  const terms = {
    night: ["night", "drive", "electronic", "urban", "dark"],
    focus: ["focus", "calm", "ambient", "instrumental", "chill"],
    euphoria: ["euphoria", "pop", "dance", "energy", "uplifting"],
  }[name];
  const matched = tracks.filter((track) => {
    const source = `${track.mood ?? ""} ${track.genre ?? ""} ${track.title}`.toLowerCase();
    return terms.some((term) => source.includes(term));
  });
  if (matched.length >= 2) return matched;
  const offset = name === "night" ? 0 : name === "focus" ? 1 : 2;
  const selected = tracks.filter((_, index) => index % 3 === offset);
  return (selected.length ? selected : tracks).slice(0, Math.min(6, tracks.length));
}
