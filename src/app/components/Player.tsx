"use client";

import { getTrackTags } from "@/lib/track-utils";
import { Icon } from "./Icon";
import { useTrackPlayer } from "./TrackPlayerProvider";

export function Player({ compact = false }: { compact?: boolean }) {
  const { tracks, currentTrack, playTrack, isLoading } = useTrackPlayer();
  const track = currentTrack ?? tracks[0] ?? null;
  const tags = track ? getTrackTags(track) : [];

  return (
    <div className={`player ${compact ? "is-compact" : ""}`}>
      <div className="player-meta">
        <div>
          <strong>{isLoading ? "Finding your frequency…" : track?.title ?? "SOUL Radio"}</strong>
          <span>{track ? `${track.artistName} · ${track.albumTitle}` : "Music, felt differently"}</span>
        </div>
        <span className="icon-button"><Icon name="heart" className="h-4 w-4" /></span>
      </div>
      <div className="player-progress"><span /></div>
      <div className="player-times"><span>{tags[0] ?? "SOUL"}</span><span>{tags[1] ?? "LIVE"}</span></div>
      <div className="player-controls">
        <span className="icon-button">‹</span>
        <button className="play-main" aria-label={track ? `Play ${track.title}` : "Play"} disabled={!track} onClick={() => track && playTrack(track)}>
          <Icon name="play" className="h-4 w-4" />
        </button>
        <span className="icon-button">›</span>
      </div>
    </div>
  );
}
