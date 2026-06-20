"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addTrackToPlaylist,
  getPlaylist,
  getPlaylistTracks,
  removeTrackFromPlaylist,
  type Playlist,
  type Track,
} from "@/lib/api";
import { getTrackTone } from "@/lib/track-utils";
import { GlassCard, SectionTitle } from "./AppContent";
import { Icon } from "./Icon";
import { EmptyState } from "./MusicEntities";
import { TrackRow } from "./TrackList";
import { useTrackPlayer } from "./TrackPlayerProvider";

export function PlaylistDetails({ playlistId }: { playlistId: string }) {
  const { tracks: availableTracks, playTrack } = useTrackPlayer();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);
  const [selectedTrack, setSelectedTrack] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [details, songs] = await Promise.all([
        getPlaylist(playlistId),
        getPlaylistTracks(playlistId),
      ]);
      setPlaylist(details);
      setPlaylistTracks(songs);
      setError("");
    } catch {
      setError("This playlist could not be loaded right now.");
    } finally {
      setLoading(false);
    }
  }, [playlistId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const tracksToAdd = useMemo(() => {
    const included = new Set(playlistTracks.map((track) => track.id));
    return availableTracks.filter((track) => !included.has(track.id));
  }, [availableTracks, playlistTracks]);

  const addSelectedTrack = async () => {
    if (!selectedTrack || saving) return;
    setSaving(true);
    try {
      await addTrackToPlaylist(playlistId, Number(selectedTrack));
      setSelectedTrack("");
      await refresh();
    } catch {
      setError("The song could not be added. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const removeTrack = async (trackId: number) => {
    if (saving) return;
    setSaving(true);
    try {
      await removeTrackFromPlaylist(playlistId, trackId);
      await refresh();
    } catch {
      setError("The song could not be removed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading && !playlist) {
    return <div className="catalog-loading">{[0, 1, 2, 3].map((item) => <span key={item} />)}</div>;
  }

  if (!playlist) {
    return <EmptyState title="This collection is out of reach." description={error || "Return to your playlists and choose another collection."} />;
  }

  return (
    <>
      <GlassCard className="playlist-detail-hero">
        <div className={`playlist-detail-art ${playlistTracks[0] ? getTrackTone(playlistTracks[0]) : "tone-violet"}`}>
          <span className="art-noise" />
          <Icon name="playlist" className="h-10 w-10" />
        </div>
        <div className="playlist-detail-copy">
          <p className="eyebrow">Playlist</p>
          <h1>{playlist.name}</h1>
          <p>{playlist.description}</p>
          <span>{playlistTracks.length} {playlistTracks.length === 1 ? "track" : "tracks"}</span>
        </div>
        {playlistTracks.length > 0 && (
          <button className="playlist-detail-play" type="button" aria-label={`Play ${playlist.name}`} onClick={() => playTrack(playlistTracks[0], playlistTracks)}>
            <Icon name="play" className="h-5 w-5" />
          </button>
        )}
      </GlassCard>

      <div className="playlist-manager">
        <div>
          <SectionTitle title="Songs in this playlist" />
          {playlistTracks.length ? (
            <div className="app-track-table">
              {playlistTracks.map((track, index) => (
                <TrackRow
                  track={track}
                  index={index}
                  queue={playlistTracks}
                  key={track.id}
                  trailingAction={(
                    <button
                      type="button"
                      className="playlist-remove-track"
                      aria-label={`Remove ${track.title} from playlist`}
                      onClick={() => void removeTrack(track.id)}
                      disabled={saving}
                    >
                      <Icon name="trash" className="h-4 w-4" />
                    </button>
                  )}
                />
              ))}
            </div>
          ) : (
            <EmptyState title="Give this playlist its first song." description="Choose from your available tracks to set the mood." />
          )}
        </div>

        <GlassCard className="playlist-add-card">
          <p className="eyebrow">Add a song</p>
          <h2>Shape the next moment.</h2>
          <p>Only tracks that are not already in this playlist appear below.</p>
          <select value={selectedTrack} onChange={(event) => setSelectedTrack(event.target.value)} disabled={!tracksToAdd.length}>
            <option value="">{tracksToAdd.length ? "Choose a track" : "All available tracks are added"}</option>
            {tracksToAdd.map((track) => (
              <option value={track.id} key={track.id}>{track.title} — {track.artistName}</option>
            ))}
          </select>
          <button className="button-primary" type="button" onClick={() => void addSelectedTrack()} disabled={!selectedTrack || saving}>
            <Icon name="plus" className="h-4 w-4" /> {saving ? "Updating…" : "Add to playlist"}
          </button>
          {error && <span className="playlist-detail-error">{error}</span>}
        </GlassCard>
      </div>
    </>
  );
}
