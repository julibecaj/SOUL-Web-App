"use client";

import { Brand } from "./Brand";
import { useTrackPlayer } from "./TrackPlayerProvider";

export function LiveTrackArt({ variant }: { variant: "hero" | "stage" | "vinyl" }) {
  const { tracks, currentTrack } = useTrackPlayer();
  const track = currentTrack ?? tracks[0] ?? null;
  const title = track?.title ?? "SOUL";
  const artist = track?.artistName ?? "Now playing";

  if (variant === "vinyl") {
    return (
      <div className="vinyl-label">
        <Brand compact />
        <span>{title}</span>
      </div>
    );
  }

  if (variant === "stage") {
    return (
      <div>
        <span>{artist}</span>
        <strong>{title}</strong>
      </div>
    );
  }

  return (
    <div className="relative z-10">
      <p>{track?.mood ?? track?.genre ?? "SOUL selection"}</p>
      <h2>{title}</h2>
    </div>
  );
}
