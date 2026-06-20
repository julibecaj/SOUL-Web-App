"use client";

import type { Track } from "@/lib/api";
import { formatDuration, getTrackTone } from "@/lib/track-utils";
import { Icon } from "./Icon";
import { useTrackPlayer } from "./TrackPlayerProvider";

export function TrackRow({
  track,
  index,
  variant = "app",
  queue,
  trailingAction,
}: {
  track: Track;
  index: number;
  variant?: "app" | "home";
  queue?: Track[];
  trailingAction?: React.ReactNode;
}) {
  const { currentTrack, playTrack, isFavorite, toggleFavorite } = useTrackPlayer();
  const active = currentTrack?.id === track.id;
  const favorite = isFavorite(track.id);

  if (variant === "home") {
    return (
      <div className={`track-row ${active ? "is-active" : ""}`}>
        <span className="track-index">
          {active ? <Icon name="wave" className="h-4 w-4" /> : String(index + 1).padStart(2, "0")}
        </span>
        <button type="button" className="track-play" aria-label={`Play ${track.title}`} onClick={() => playTrack(track, queue)}><Icon name="play" className="h-3.5 w-3.5" /></button>
        <button type="button" className="track-title track-title-button" onClick={() => playTrack(track, queue)}><strong>{track.title}</strong><span>{track.artistName}</span></button>
        <span className="track-type">{track.albumTitle}</span>
        <button
          type="button"
          className={`heart-button ${favorite ? "is-favorite" : ""}`}
          aria-label={favorite ? `Remove ${track.title} from favorites` : `Add ${track.title} to favorites`}
          onClick={() => void toggleFavorite(track).catch(() => undefined)}
        >
          <Icon name="heart" className="h-4 w-4" />
        </button>
        <span className="track-time">{formatDuration(track.durationSeconds)}</span>
      </div>
    );
  }

  return (
    <div className={`app-track-row ${active ? "is-current" : ""}`}>
      <span className="app-track-number">
        {active ? <Icon name="wave" className="h-4 w-4" /> : String(index + 1).padStart(2, "0")}
      </span>
      <button
        type="button"
        className={`track-cover ${track.coverUrl ? "has-cover" : getTrackTone(track, index)}`}
        style={track.coverUrl ? { backgroundImage: `url("${track.coverUrl}")` } : undefined}
        aria-label={`Play ${track.title}`}
        onClick={() => playTrack(track, queue)}
      >
        <Icon name="play" className="h-3 w-3" />
      </button>
      <button type="button" className="app-track-title app-track-title-button" onClick={() => playTrack(track, queue)}><strong>{track.title}</strong><span>{track.artistName}</span></button>
      <span className="app-track-album">{track.albumTitle}</span>
      {trailingAction ?? (
        <button
          type="button"
          className={`app-favorite-button ${favorite ? "is-favorite" : ""}`}
          aria-label={favorite ? `Remove ${track.title} from favorites` : `Add ${track.title} to favorites`}
          onClick={() => void toggleFavorite(track).catch(() => undefined)}
        >
          <Icon name="heart" className="h-4 w-4" />
        </button>
      )}
      <span className="app-track-time">{formatDuration(track.durationSeconds)}</span>
    </div>
  );
}

export function BackendTrackTable({
  limit,
  variant = "app",
}: {
  limit?: number;
  variant?: "app" | "home";
}) {
  const { tracks, isLoading, error } = useTrackPlayer();
  const visibleTracks = typeof limit === "number" ? tracks.slice(0, limit) : tracks;

  if (isLoading) {
    return (
      <div className={variant === "home" ? "track-list" : "app-track-table"}>
        {[0, 1, 2].map((item) => <div className="track-loading" key={item}><span /><span /></div>)}
      </div>
    );
  }

  if (error) {
    return <div className="track-state">{error}</div>;
  }

  if (visibleTracks.length === 0) {
    return <div className="track-state">No tracks are available yet.</div>;
  }

  return (
    <div className={variant === "home" ? "track-list" : "app-track-table"}>
      {visibleTracks.map((track, index) => (
        <TrackRow track={track} index={index} variant={variant} queue={visibleTracks} key={track.id} />
      ))}
    </div>
  );
}
