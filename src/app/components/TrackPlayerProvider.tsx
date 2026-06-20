"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  addFavorite,
  getFavorites,
  getTracks,
  removeFavorite,
  type Track,
} from "@/lib/api";
import { GlobalPlayer } from "./GlobalPlayer";

type TrackPlayerContextValue = {
  tracks: Track[];
  currentTrack: Track | null;
  isLoading: boolean;
  favoritesLoading: boolean;
  error: string;
  playTrack: (track: Track, queue?: Track[]) => void;
  playPrevious: () => void;
  playNext: () => void;
  isFavorite: (trackId: number) => boolean;
  toggleFavorite: (track: Track) => Promise<void>;
  favoriteTracks: Track[];
};

const TrackPlayerContext = createContext<TrackPlayerContextValue | null>(null);

export function TrackPlayerProvider({ children }: { children: React.ReactNode }) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favoritesLoading, setFavoritesLoading] = useState(true);
  const [favoriteTracks, setFavoriteTracks] = useState<Track[]>([]);
  const [error, setError] = useState("");
  const [playQueue, setPlayQueue] = useState<Track[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let active = true;

    getTracks()
      .then((data) => {
        if (active) {
          setTracks(data);
          setError("");
        }
      })
      .catch(() => {
        if (active) {
          setError("We could not reach your music right now. Please try again shortly.");
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    getFavorites()
      .then((data) => {
        if (active) setFavoriteTracks(data);
      })
      .catch(() => {
        if (active) setFavoriteTracks([]);
      })
      .finally(() => {
        if (active) setFavoritesLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!currentTrack || !audioRef.current) return;

    audioRef.current.load();
    audioRef.current.play().catch(() => {
      // Browser autoplay policies may require a second user gesture.
    });
  }, [currentTrack]);

  const playTrack = useCallback((track: Track, queue?: Track[]) => {
    if (queue?.length) setPlayQueue(queue);
    if (currentTrack?.id === track.id && audioRef.current) {
      audioRef.current.play().catch(() => undefined);
      return;
    }

    setCurrentTrack(track);
  }, [currentTrack]);

  const activeQueue = playQueue.length ? playQueue : tracks;

  const playPrevious = useCallback(() => {
    if (!currentTrack || !activeQueue.length) return;
    const index = activeQueue.findIndex((track) => track.id === currentTrack.id);
    const previousIndex = index <= 0 ? activeQueue.length - 1 : index - 1;
    setCurrentTrack(activeQueue[previousIndex]);
  }, [activeQueue, currentTrack]);

  const playNext = useCallback(() => {
    if (!currentTrack || !activeQueue.length) return;
    const index = activeQueue.findIndex((track) => track.id === currentTrack.id);
    const nextIndex = index < 0 || index === activeQueue.length - 1 ? 0 : index + 1;
    setCurrentTrack(activeQueue[nextIndex]);
  }, [activeQueue, currentTrack]);

  const isFavorite = useCallback(
    (trackId: number) => favoriteTracks.some((track) => track.id === trackId),
    [favoriteTracks],
  );

  const toggleFavorite = useCallback(async (track: Track) => {
    const wasFavorite = favoriteTracks.some((favorite) => favorite.id === track.id);
    setFavoriteTracks((current) => (
      wasFavorite
        ? current.filter((favorite) => favorite.id !== track.id)
        : [...current, track]
    ));

    try {
      if (wasFavorite) {
        await removeFavorite(track.id);
      } else {
        await addFavorite(track.id);
      }
    } catch {
      setFavoriteTracks((current) => (
        wasFavorite
          ? [...current.filter((favorite) => favorite.id !== track.id), track]
          : current.filter((favorite) => favorite.id !== track.id)
      ));
      throw new Error("Favorite update failed");
    }
  }, [favoriteTracks]);

  const value = useMemo(
    () => ({
      tracks,
      currentTrack,
      isLoading,
      favoritesLoading,
      error,
      playTrack,
      playPrevious,
      playNext,
      isFavorite,
      toggleFavorite,
      favoriteTracks,
    }),
    [
      tracks,
      currentTrack,
      isLoading,
      favoritesLoading,
      error,
      playTrack,
      playPrevious,
      playNext,
      isFavorite,
      toggleFavorite,
      favoriteTracks,
    ],
  );

  return (
    <TrackPlayerContext.Provider value={value}>
      {children}
      {currentTrack && (
        <GlobalPlayer
          track={currentTrack}
          audioRef={audioRef}
          onPrevious={playPrevious}
          onNext={playNext}
        />
      )}
    </TrackPlayerContext.Provider>
  );
}

export function useTrackPlayer() {
  const context = useContext(TrackPlayerContext);

  if (!context) {
    throw new Error("useTrackPlayer must be used within TrackPlayerProvider");
  }

  return context;
}
