export type Track = {
  id: number;
  title: string;
  artistName: string;
  albumTitle: string;
  audioUrl: string;
  coverUrl: string | null;
  durationSeconds: number | null;
  genre: string | null;
  mood: string | null;
};

export type Album = {
  id: number | string;
  title: string;
  artistName: string;
  coverUrl: string | null;
  tracks: Track[];
  trackCount: number;
};

export type Artist = {
  id: number | string;
  name: string;
  imageUrl: string | null;
  genres: string[];
  moods: string[];
  tracks: Track[];
  trackCount: number;
};

export type Playlist = {
  id: number | string;
  name: string;
  description: string;
  coverUrl: string | null;
  tracks: Track[];
  trackCount: number;
};

export type CreatePlaylistInput = {
  name: string;
  description?: string;
};

export type User = {
  id: number | string;
  name: string;
  fullName: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  role?: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api";

export const AUTH_TOKEN_KEY = "soul_token";
export const AUTH_USER_KEY = "soul_user";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" ? value as JsonRecord : {};
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asNullableString(value: unknown) {
  return typeof value === "string" && value.trim() ? value : null;
}

function asNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asArray(value: unknown) {
  return Array.isArray(value) ? value : [];
}

function extractList(value: unknown) {
  if (Array.isArray(value)) return value;
  const record = asRecord(value);
  return asArray(record.content ?? record.items ?? record.data);
}

function normalizeTrack(value: unknown): Track {
  const outer = asRecord(value);
  const item = Object.keys(asRecord(outer.track)).length ? asRecord(outer.track) : outer;
  const artist = asRecord(item.artist);
  const album = asRecord(item.album);

  return {
    id: asNumber(item.id),
    title: asString(item.title, "Untitled track"),
    artistName: asString(item.artistName ?? artist.name, "Unknown artist"),
    albumTitle: asString(item.albumTitle ?? album.title, "Single"),
    audioUrl: asString(item.audioUrl),
    coverUrl: asNullableString(item.coverUrl ?? album.coverUrl),
    durationSeconds: typeof item.durationSeconds === "number" ? item.durationSeconds : null,
    genre: asNullableString(item.genre),
    mood: asNullableString(item.mood),
  };
}

function normalizeTracks(value: unknown) {
  return extractList(value).map(normalizeTrack).filter((track) => track.id > 0 && track.audioUrl);
}

function normalizeAlbum(value: unknown, index: number): Album {
  const item = asRecord(value);
  const artist = asRecord(item.artist);
  const tracks = normalizeTracks(item.tracks);
  const title = asString(item.title ?? item.albumTitle ?? item.name, "Untitled Collection");

  return {
    id: asString(item.id) || asNumber(item.id, index + 1),
    title,
    artistName: asString(item.artistName ?? artist.name, tracks[0]?.artistName ?? "Various artists"),
    coverUrl: asNullableString(item.coverUrl ?? item.imageUrl ?? item.artworkUrl),
    tracks,
    trackCount: asNumber(item.trackCount, tracks.length),
  };
}

function normalizeArtist(value: unknown, index: number): Artist {
  const item = asRecord(value);
  const tracks = normalizeTracks(item.tracks);
  const genres = asArray(item.genres).map((genre) => asString(genre)).filter(Boolean);
  const moods = asArray(item.moods).map((mood) => asString(mood)).filter(Boolean);

  tracks.forEach((track) => {
    if (track.genre && !genres.includes(track.genre)) genres.push(track.genre);
    if (track.mood && !moods.includes(track.mood)) moods.push(track.mood);
  });

  return {
    id: asString(item.id) || asNumber(item.id, index + 1),
    name: asString(item.name ?? item.artistName, tracks[0]?.artistName ?? "SOUL artist"),
    imageUrl: asNullableString(item.imageUrl ?? item.coverUrl ?? item.photoUrl),
    genres,
    moods,
    tracks,
    trackCount: asNumber(item.trackCount, tracks.length),
  };
}

function normalizePlaylist(value: unknown, index: number): Playlist {
  const item = asRecord(value);
  const tracks = normalizeTracks(item.tracks);

  return {
    id: asString(item.id) || asNumber(item.id, index + 1),
    name: asString(item.name ?? item.title, "Untitled playlist"),
    description: asString(item.description, "A collection made in SOUL."),
    coverUrl: asNullableString(item.coverUrl ?? item.imageUrl),
    tracks,
    trackCount: asNumber(item.trackCount, tracks.length),
  };
}

function normalizeUser(value: unknown): User {
  const item = asRecord(value);
  const fullName = asString(item.fullName ?? item.name, "SOUL Listener");

  return {
    id: asString(item.id) || asNumber(item.id),
    name: fullName,
    fullName,
    username: asString(item.username),
    email: asString(item.email),
    avatarUrl: asNullableString(item.avatarUrl),
    ...(typeof item.role === "string" ? { role: item.role } : {}),
  };
}

function normalizeAuthResponse(value: unknown): AuthResponse {
  const item = asRecord(value);

  return {
    token: asString(item.token ?? item.accessToken),
    user: normalizeUser(item.user),
  };
}

export function saveAuthSession(auth: AuthResponse) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_TOKEN_KEY, auth.token);
  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(auth.user));
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;

  const token = window.localStorage
    .getItem(AUTH_TOKEN_KEY)
    ?.trim()
    .replace(/^Bearer\s+/i, "");

  return token || null;
}

function authorizationHeaders(token?: string): HeadersInit {
  const cleanToken = token?.trim().replace(/^Bearer\s+/i, "") || getStoredToken();
  return cleanToken ? { Authorization: `Bearer ${cleanToken}` } : {};
}

async function requestJson(path: string, init?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const responseBody = await response.text();
    console.error("SOUL API request failed", {
      path,
      status: response.status,
      statusText: response.statusText,
      responseBody,
    });
    throw new Error(
      `SOUL request failed (${response.status} ${response.statusText})${responseBody ? `: ${responseBody}` : ""}`,
    );
  }

  if (response.status === 204) return null;
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export async function getTracks(): Promise<Track[]> {
  return normalizeTracks(await requestJson("/tracks"));
}

export async function getAlbums(): Promise<Album[]> {
  return extractList(await requestJson("/albums")).map(normalizeAlbum);
}

export async function getArtists(): Promise<Artist[]> {
  return extractList(await requestJson("/artists")).map(normalizeArtist);
}

export async function register(input: RegisterInput): Promise<AuthResponse> {
  return normalizeAuthResponse(await requestJson("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  }));
}

export async function login(input: LoginInput): Promise<AuthResponse> {
  return normalizeAuthResponse(await requestJson("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  }));
}

export async function getMe(token: string): Promise<User> {
  return normalizeUser(await requestJson("/auth/me", {
    headers: authorizationHeaders(token),
  }));
}

export async function getPlaylists(token?: string): Promise<Playlist[]> {
  return extractList(await requestJson("/playlists", {
    headers: authorizationHeaders(token),
  })).map(normalizePlaylist);
}

export async function getPlaylist(id: number | string, token?: string): Promise<Playlist> {
  return normalizePlaylist(
    await requestJson(`/playlists/${encodeURIComponent(id)}`, {
      headers: authorizationHeaders(token),
    }),
    0,
  );
}

export async function getPlaylistTracks(id: number | string, token?: string): Promise<Track[]> {
  return normalizeTracks(
    await requestJson(`/playlists/${encodeURIComponent(id)}/tracks`, {
      headers: authorizationHeaders(token),
    }),
  );
}

export async function createPlaylist(input: CreatePlaylistInput, token?: string): Promise<Playlist> {
  const normalizedToken = token?.trim().replace(/^Bearer\s+/i, "") || getStoredToken();

  if (!normalizedToken) {
    throw new Error("Missing auth token");
  }

  const result = await requestJson("/playlists", {
    method: "POST",
    body: JSON.stringify(input),
    headers: authorizationHeaders(normalizedToken),
  });

  if (result && typeof result === "object") return normalizePlaylist(result, 0);

  const playlists = await getPlaylists(normalizedToken);
  const created = [...playlists].reverse().find((playlist) => playlist.name === input.name);
  if (!created) throw new Error("Created playlist could not be resolved");
  return created;
}

export async function addTrackToPlaylist(playlistId: number | string, trackId: number, token?: string): Promise<void> {
  await requestJson(`/playlists/${encodeURIComponent(playlistId)}/tracks/${trackId}`, {
    method: "POST",
    headers: authorizationHeaders(token),
  });
}

export async function removeTrackFromPlaylist(playlistId: number | string, trackId: number, token?: string): Promise<void> {
  await requestJson(`/playlists/${encodeURIComponent(playlistId)}/tracks/${trackId}`, {
    method: "DELETE",
    headers: authorizationHeaders(token),
  });
}

export async function getFavorites(token?: string): Promise<Track[]> {
  return normalizeTracks(await requestJson("/favorites", {
    headers: authorizationHeaders(token),
  }));
}

export async function addFavorite(trackId: number, token?: string): Promise<void> {
  await requestJson(`/favorites/${trackId}`, {
    method: "POST",
    headers: authorizationHeaders(token),
  });
}

export async function removeFavorite(trackId: number, token?: string): Promise<void> {
  await requestJson(`/favorites/${trackId}`, {
    method: "DELETE",
    headers: authorizationHeaders(token),
  });
}

export async function uploadTrack(formData: FormData): Promise<Track> {
  const response = await fetch(`${API_BASE_URL}/uploads/track`, {
    method: "POST",
    body: formData,
    headers: authorizationHeaders(),
  });

  if (!response.ok) {
    const responseBody = await response.text();
    console.error("SOUL track upload failed", {
      status: response.status,
      statusText: response.statusText,
      responseBody,
    });
    let message = responseBody;
    try {
      const parsed = JSON.parse(responseBody) as { message?: string; error?: string };
      message = parsed.message ?? parsed.error ?? "";
    } catch {
      // The backend may return a plain-text message.
    }
    throw new Error(message || "The track could not be uploaded. Please try again.");
  }

  return normalizeTrack(await response.json());
}
