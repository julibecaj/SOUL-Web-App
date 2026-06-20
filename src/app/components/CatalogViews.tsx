"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  addTrackToPlaylist,
  createPlaylist,
  getAlbums,
  getArtists,
  getPlaylists,
  type Album,
  type Artist,
  type Playlist,
} from "@/lib/api";
import {
  groupTracksByAlbum,
  groupTracksByArtist,
  mostCommon,
  selectPlaylistTracks,
} from "@/lib/track-utils";
import { GlassCard, SectionTitle } from "./AppContent";
import { Icon } from "./Icon";
import {
  AlbumCard,
  ArtistCard,
  CatalogState,
  PlaylistCard,
  TrackCard,
} from "./MusicEntities";
import { TrackRow } from "./TrackList";
import { useTrackPlayer } from "./TrackPlayerProvider";

function TrackRows({
  tracks,
}: {
  tracks: ReturnType<typeof selectPlaylistTracks>;
}) {
  return (
    <div className="app-track-table">
      {tracks.map((track, index) => (
        <TrackRow track={track} index={index} queue={tracks} key={track.id} />
      ))}
    </div>
  );
}

export function HomeAlbumGrid() {
  const { tracks } = useTrackPlayer();
  const albums = groupTracksByAlbum(tracks).slice(0, 4);
  if (!albums.length) return <CatalogState compact />;
  return (
    <div className="entity-grid home-entity-grid">
      {albums.map((album, index) => (
        <AlbumCard
          album={album}
          index={index}
          key={`${album.artistName}-${album.title}`}
        />
      ))}
    </div>
  );
}

export function DashboardCatalog() {
  const { tracks } = useTrackPlayer();
  const albums = groupTracksByAlbum(tracks);
  const artists = groupTracksByArtist(tracks);
  const mood = mostCommon(tracks.map((track) => track.mood));
  const moodTracks = tracks.filter((track) => track.mood === mood).slice(0, 4);

  if (!tracks.length) return <CatalogState />;

  return (
    <>
      <div className="app-section">
        <SectionTitle
          title="Recently played"
          link="Open library"
          href="/library"
        />
        <TrackRows tracks={tracks.slice(0, 5)} />
      </div>
      <div className="app-section">
        <SectionTitle
          title={`For your mood · ${mood}`}
          link="All playlists"
          href="/playlists"
        />
        <div className="entity-grid">
          {(moodTracks.length ? moodTracks : tracks.slice(0, 4)).map(
            (track, index) => (
              <TrackCard track={track} index={index} key={track.id} />
            ),
          )}
        </div>
      </div>
      <div className="app-section">
        <SectionTitle
          title="Featured albums"
          link="All albums"
          href="/albums"
        />
        <div className="entity-grid">
          {albums.slice(0, 4).map((album, index) => (
            <AlbumCard
              album={album}
              index={index}
              key={`${album.artistName}-${album.title}`}
            />
          ))}
        </div>
      </div>
      <div className="app-section">
        <SectionTitle title="Your library" />
        <div className="library-stats">
          <GlassCard>
            <strong>{tracks.length}</strong>
            <span>Tracks available</span>
            <Link href="/library">Open library</Link>
          </GlassCard>
          <GlassCard>
            <strong>{albums.length}</strong>
            <span>Albums in rotation</span>
            <Link href="/albums">Browse albums</Link>
          </GlassCard>
          <GlassCard>
            <strong>{artists.length}</strong>
            <span>Artists in your orbit</span>
            <Link href="/artists">Meet artists</Link>
          </GlassCard>
        </div>
      </div>
    </>
  );
}

export function LibraryCatalog() {
  const { tracks } = useTrackPlayer();
  const albums = groupTracksByAlbum(tracks);
  const artists = groupTracksByArtist(tracks);
  if (!tracks.length) return <CatalogState />;

  return (
    <>
      <div className="library-stats">
        <GlassCard>
          <strong>{albums.length}</strong>
          <span>Albums collected</span>
          <Link href="/albums">Explore</Link>
        </GlassCard>
        <GlassCard>
          <strong>{tracks.length}</strong>
          <span>Tracks in rotation</span>
          <Link href="/favorites">Listen</Link>
        </GlassCard>
        <GlassCard>
          <strong>{artists.length}</strong>
          <span>Artists discovered</span>
          <Link href="/artists">View artists</Link>
        </GlassCard>
      </div>
      <div className="app-section">
        <SectionTitle title="Saved music" link="All albums" href="/albums" />
        <div className="entity-grid">
          {albums.slice(0, 4).map((album, index) => (
            <AlbumCard
              album={album}
              index={index}
              key={`${album.artistName}-${album.title}`}
            />
          ))}
        </div>
      </div>
      <div className="app-section">
        <SectionTitle title="Recent tracks" />
        <TrackRows tracks={tracks} />
      </div>
      <div className="app-section">
        <SectionTitle
          title="Favorite artists"
          link="All artists"
          href="/artists"
        />
        <div className="artist-grid">
          {artists.slice(0, 3).map((artist, index) => (
            <ArtistCard artist={artist} index={index} key={artist.name} />
          ))}
        </div>
      </div>
    </>
  );
}

export function AlbumsCatalog() {
  const { tracks } = useTrackPlayer();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAlbums()
      .then(setAlbums)
      .catch(() => setError("Albums could not be loaded right now."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CatalogLoading />;
  if (error)
    return (
      <CatalogMessage
        title="Your albums are taking a breath."
        description={error}
      />
    );

  const hydrated = albums.map((album) => ({
    ...album,
    tracks: album.tracks.length
      ? album.tracks
      : tracks.filter(
          (track) =>
            track.albumTitle === album.title &&
            track.artistName === album.artistName,
        ),
  }));

  if (!hydrated.length)
    return (
      <CatalogMessage
        title="A quiet shelf, for now."
        description="Albums will gather here as they enter your catalog."
      />
    );
  return (
    <div className="entity-grid">
      {hydrated.map((album, index) => (
        <AlbumCard album={album} index={index} key={album.id} />
      ))}
    </div>
  );
}

export function ArtistsCatalog() {
  const { tracks } = useTrackPlayer();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getArtists()
      .then(setArtists)
      .catch(() => setError("Artists could not be loaded right now."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CatalogLoading />;
  if (error)
    return (
      <CatalogMessage title="The artist room is resting." description={error} />
    );

  const hydrated = artists.map((artist) => {
    const artistTracks = artist.tracks.length
      ? artist.tracks
      : tracks.filter((track) => track.artistName === artist.name);
    return {
      ...artist,
      coverUrl: artist.imageUrl,
      tracks: artistTracks,
      genres: artist.genres.length
        ? artist.genres
        : artistTracks
            .map((track) => track.genre)
            .filter((value): value is string => Boolean(value)),
      moods: artist.moods.length
        ? artist.moods
        : artistTracks
            .map((track) => track.mood)
            .filter((value): value is string => Boolean(value)),
    };
  });

  if (!hydrated.length)
    return (
      <CatalogMessage
        title="A quiet stage, for now."
        description="Artists will appear here as your catalog grows."
      />
    );
  return (
    <div className="artist-grid">
      {hydrated.map((artist, index) => (
        <ArtistCard artist={artist} index={index} key={artist.id} />
      ))}
    </div>
  );
}

export function PlaylistsCatalog() {
  const { tracks } = useTrackPlayer();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startingTrack, setStartingTrack] = useState("");
  const [saving, setSaving] = useState(false);

  const loadPlaylists = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getPlaylists();
      setPlaylists(data);
      setError("");
    } catch {
      setError("Playlists could not be loaded right now.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPlaylists();
  }, [loadPlaylists]);

  const submitPlaylist = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanName = name.trim();
    if (!cleanName || saving) return;

    setSaving(true);

    try {
      const playlist = await createPlaylist({
        name: cleanName,
        description: description.trim(),
      });

      if (startingTrack) {
        await addTrackToPlaylist(playlist.id, Number(startingTrack));
      }

      setName("");
      setDescription("");
      setStartingTrack("");
      await loadPlaylists();
    } catch {
      setError("Your playlist could not be saved. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <form
        className="create-playlist-card app-glass-card"
        onSubmit={submitPlaylist}
      >
        <div>
          <p className="eyebrow">New collection</p>
          <h2>Create a playlist</h2>
          <p>Give a new listening world a name and an opening track.</p>
        </div>

        <div className="create-playlist-fields">
          <label>
            <span>Name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={80}
            />
          </label>

          <label>
            <span>Description</span>
            <input
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength={180}
            />
          </label>

          <label>
            <span>Opening track</span>
            <select
              value={startingTrack}
              onChange={(event) => setStartingTrack(event.target.value)}
            >
              <option value="">Choose later</option>
              {tracks.map((track) => (
                <option value={track.id} key={track.id}>
                  {track.title} — {track.artistName}
                </option>
              ))}
            </select>
          </label>

          <button className="button-primary" type="submit" disabled={saving}>
            {saving ? "Creating…" : "Create playlist"}
          </button>
        </div>
      </form>

      {error && <p className="catalog-inline-error">{error}</p>}
      {loading && <CatalogLoading />}

      {!loading && playlists.length > 0 && (
        <div className="playlist-grid">
          {playlists.map((playlist, index) => (
            <PlaylistCard
              id={playlist.id}
              title={playlist.name}
              description={playlist.description}
              tracks={[]}
              trackCount={playlist.trackCount}
              tone={
                ["tone-violet", "tone-cyan", "tone-magenta", "tone-gold"][
                  index % 4
                ]
              }
              key={playlist.id}
            />
          ))}
        </div>
      )}

      {!loading && !playlists.length && !error && (
        <CatalogMessage
          title="Your first playlist starts here."
          description="Create a collection above and choose the track that sets its tone."
        />
      )}
    </>
  );
}

export function FavoritesCatalog() {
  const { favoriteTracks, favoritesLoading, playTrack } = useTrackPlayer();
  if (favoritesLoading) return <CatalogLoading />;
  if (!favoriteTracks.length)
    return (
      <CatalogMessage
        title="Your favorites are ready for a first spark."
        description="Use the heart beside any track to bring it into this collection."
      />
    );
  const totalSeconds = favoriteTracks.reduce(
    (sum, track) => sum + (track.durationSeconds ?? 0),
    0,
  );
  const totalMinutes = Math.round(totalSeconds / 60);

  return (
    <>
      <GlassCard className="favorites-banner">
        <div className="favorites-heart">
          <Icon name="heart" className="h-12 w-12" />
        </div>
        <div>
          <span>Your collection</span>
          <h2>{favoriteTracks.length} songs, no skips.</h2>
          <p>
            {totalMinutes || "A full evening of"} minutes of music ready to
            play.
          </p>
        </div>
        <button
          aria-label="Play favorites"
          onClick={() => playTrack(favoriteTracks[0])}
        >
          <Icon name="play" className="h-5 w-5" />
        </button>
      </GlassCard>
      <div className="app-section">
        <SectionTitle title="All favorites" />
        <TrackRows tracks={favoriteTracks} />
      </div>
    </>
  );
}

function CatalogLoading() {
  return (
    <div className="catalog-loading">
      {[0, 1, 2, 3].map((item) => (
        <span key={item} />
      ))}
    </div>
  );
}

function CatalogMessage({
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

export function ProfileCatalog() {
  const { tracks, currentTrack } = useTrackPlayer();
  if (!tracks.length) return <CatalogState />;
  const mood = mostCommon(tracks.map((track) => track.mood));
  const genre = mostCommon(tracks.map((track) => track.genre));
  const artists = groupTracksByArtist(tracks);

  return (
    <>
      <GlassCard className="profile-hero-card">
        <div className="profile-avatar">AC</div>
        <div className="profile-identity">
          <span>SOUL listener</span>
          <h2>Alex Carter</h2>
          <p>Budapest · listening with intention</p>
        </div>
        <div className="profile-now-playing">
          <Icon name="wave" className="h-5 w-5" />
          <div>
            <span>{currentTrack ? "Now playing" : "Your frequency"}</span>
            <strong>
              {currentTrack
                ? `${currentTrack.title} · ${currentTrack.artistName}`
                : `${mood} · ${genre}`}
            </strong>
          </div>
        </div>
      </GlassCard>
      <div className="profile-stat-grid">
        <GlassCard>
          <strong>{tracks.length}</strong>
          <span>Tracks available</span>
        </GlassCard>
        <GlassCard>
          <strong>{mood}</strong>
          <span>Favorite mood</span>
        </GlassCard>
        <GlassCard>
          <strong>{genre}</strong>
          <span>Top genre</span>
        </GlassCard>
        <GlassCard>
          <strong>{artists.length}</strong>
          <span>Artists discovered</span>
        </GlassCard>
      </div>
      <div className="app-section">
        <SectionTitle title="Your favorite frequencies" />
        <GlassCard className="mood-card">
          {[
            mood,
            genre,
            ...tracks
              .map((track) => track.mood)
              .filter((value): value is string => Boolean(value)),
          ]
            .filter((value, index, values) => values.indexOf(value) === index)
            .slice(0, 5)
            .map((value, index) => (
              <span className={`mood-pill mood-${index + 1}`} key={value}>
                {value}
              </span>
            ))}
        </GlassCard>
      </div>
    </>
  );
}
