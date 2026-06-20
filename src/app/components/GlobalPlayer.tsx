"use client";

import { useEffect, useState, type RefObject } from "react";
import type { Track } from "@/lib/api";
import { formatDuration } from "@/lib/track-utils";
import { Icon } from "./Icon";

export function GlobalPlayer({
  track,
  audioRef,
  onPrevious,
  onNext,
}: {
  track: Track;
  audioRef: RefObject<HTMLAudioElement | null>;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(track.durationSeconds ?? 0);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(track.durationSeconds ?? 0);
  }, [track]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => undefined);
    } else {
      audio.pause();
    }
  };

  const seek = (value: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <div className="global-player" role="region" aria-label="Now playing">
      <div className="global-player-track">
        <div
          className={`global-player-cover ${track.coverUrl ? "has-cover" : "tone-violet"}`}
          style={track.coverUrl ? { backgroundImage: `url("${track.coverUrl}")` } : undefined}
        >
          {!track.coverUrl && <span>{track.title.slice(0, 1)}</span>}
        </div>
        <div className="global-player-copy">
          <strong>{track.title}</strong>
          <span>{track.artistName} · {track.albumTitle}</span>
        </div>
      </div>

      <div className="global-player-center">
        <div className="global-player-buttons">
          <button type="button" aria-label="Previous track" onClick={onPrevious}><Icon name="previous" className="h-4 w-4" /></button>
          <button type="button" className="global-player-play" aria-label={isPlaying ? "Pause" : "Play"} onClick={togglePlayback}>
            <Icon name={isPlaying ? "pause" : "play"} className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Next track" onClick={onNext}><Icon name="next" className="h-4 w-4" /></button>
        </div>
        <div className="global-player-progress">
          <span>{formatDuration(Math.floor(currentTime))}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={1}
            value={Math.min(currentTime, duration || 0)}
            onChange={(event) => seek(Number(event.target.value))}
            aria-label="Track progress"
          />
          <span>{formatDuration(Math.floor(duration))}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={track.audioUrl}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || track.durationSeconds || 0)}
        onEnded={onNext}
      />
    </div>
  );
}
