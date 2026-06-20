"use client";

import Link from "next/link";
import type { Track } from "@/lib/api";
import type { AlbumGroup, ArtistGroup } from "@/lib/track-utils";
import { formatDuration, getTrackTags, getTrackTone, TRACK_TONES } from "@/lib/track-utils";
import { Icon } from "./Icon";
import { useTrackPlayer } from "./TrackPlayerProvider";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="catalog-empty">
      <Icon name="wave" className="h-6 w-6" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export function CatalogState({ compact = false }: { compact?: boolean }) {
  const { isLoading, error, tracks } = useTrackPlayer();

  if (isLoading) {
    return (
      <div className={`catalog-loading ${compact ? "is-compact" : ""}`}>
        {[0, 1, 2, 3].map((item) => <span key={item} />)}
      </div>
    );
  }

  if (error) return <EmptyState title="Your music is taking a breath." description={error} />;
  if (!tracks.length) return <EmptyState title="A quiet room, for now." description="Your first tracks will appear here when they are available." />;
  return null;
}

export function TrackCard({ track, index = 0 }: { track: Track; index?: number }) {
  const { currentTrack, playTrack, isFavorite, toggleFavorite } = useTrackPlayer();
  const tags = getTrackTags(track);
  const active = currentTrack?.id === track.id;
  const favorite = isFavorite(track.id);

  return (
    <article className={`entity-card track-card ${active ? "is-current" : ""}`}>
      <button
        type="button"
        className="entity-art-button"
        aria-label={`Play ${track.title}`}
        onClick={() => playTrack(track)}
      >
        <span
        className={`entity-art ${track.coverUrl ? "has-cover" : getTrackTone(track, index)}`}
        style={track.coverUrl ? { backgroundImage: `url("${track.coverUrl}")` } : undefined}
        >
          <span className="art-noise" />
          <span className="entity-play"><Icon name={active ? "wave" : "play"} className="h-4 w-4" /></span>
        </span>
      </button>
      <span className="entity-meta">
        <button type="button" className="entity-title-button" onClick={() => playTrack(track)}>{track.title}</button>
        <span>{track.artistName}</span>
        <small>{tags[0] ?? track.albumTitle} · {formatDuration(track.durationSeconds)}</small>
      </span>
      <button
        type="button"
        className={`entity-favorite ${favorite ? "is-favorite" : ""}`}
        aria-label={favorite ? `Remove ${track.title} from favorites` : `Add ${track.title} to favorites`}
        onClick={() => void toggleFavorite(track).catch(() => undefined)}
      >
        <Icon name="heart" className="h-4 w-4" />
      </button>
    </article>
  );
}

export function AlbumCard({ album, index = 0 }: { album: AlbumGroup & { trackCount?: number }; index?: number }) {
  const { playTrack } = useTrackPlayer();
  const firstTrack = album.tracks[0];
  const tone = firstTrack ? getTrackTone(firstTrack, index) : TRACK_TONES[index % TRACK_TONES.length];
  const count = album.trackCount ?? album.tracks.length;

  return (
    <button type="button" className="entity-card album-entity-card" onClick={() => firstTrack && playTrack(firstTrack)} disabled={!firstTrack}>
      <span
        className={`entity-art ${album.coverUrl ? "has-cover" : tone}`}
        style={album.coverUrl ? { backgroundImage: `url("${album.coverUrl}")` } : undefined}
      >
        <span className="art-noise" />
        <span className="album-rings" />
        <span className="entity-play"><Icon name="play" className="h-4 w-4" /></span>
      </span>
      <span className="entity-meta">
        <strong>{album.title}</strong>
        <span>{album.artistName}</span>
        <small>{count} {count === 1 ? "track" : "tracks"}</small>
      </span>
    </button>
  );
}

export function ArtistCard({ artist, index = 0 }: { artist: ArtistGroup & { trackCount?: number }; index?: number }) {
  const { playTrack } = useTrackPlayer();
  const descriptors = [...artist.moods, ...artist.genres].slice(0, 2);
  const firstTrack = artist.tracks[0];
  const tone = firstTrack ? getTrackTone(firstTrack, index) : TRACK_TONES[index % TRACK_TONES.length];
  const count = artist.trackCount ?? artist.tracks.length;

  return (
    <button type="button" className="artist-card catalog-artist-card" onClick={() => firstTrack && playTrack(firstTrack)} disabled={!firstTrack}>
      <span
        className={`artist-portrait ${artist.coverUrl ? "has-cover" : tone}`}
        style={artist.coverUrl ? { backgroundImage: `url("${artist.coverUrl}")` } : undefined}
      >
        {!artist.coverUrl && <span>{artist.name.slice(0, 1)}</span>}
      </span>
      <span className="artist-card-copy">
        <strong>{artist.name}</strong>
        <span>{count} {count === 1 ? "track" : "tracks"}</span>
        <small>{descriptors.join(" · ") || "SOUL artist"}</small>
      </span>
      <span className="artist-play"><Icon name="play" className="h-4 w-4" /></span>
    </button>
  );
}

export function PlaylistCard({
  title,
  description,
  tracks,
  tone,
  trackCount,
  id,
}: {
  id: number | string;
  title: string;
  description: string;
  tracks: Track[];
  tone: string;
  trackCount?: number;
}) {
  return (
    <Link
      href={`/playlists/${encodeURIComponent(id)}`}
      className="playlist-card"
    >
      <span className={`playlist-card-art ${tone}`}>
        <span className="art-noise" />
        <Icon name="playlist" className="h-7 w-7" />
        <span className="entity-play"><Icon name="play" className="h-4 w-4" /></span>
      </span>
      <span className="playlist-card-copy">
        <strong>{title}</strong>
        <span>{description}</span>
        <small>{trackCount ?? tracks.length} {(trackCount ?? tracks.length) === 1 ? "track" : "tracks"}</small>
      </span>
    </Link>
  );
}
