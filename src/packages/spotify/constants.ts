export const SPOTIFY_ACCOUNT_BASE_URL = "https://accounts.spotify.com";
export const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

export const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID ?? "";
export const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET ?? "";

export const SPOTIFY_ACCESS_TOKEN_COOKIE = "satc";
export const SPOTIFY_REFRESH_TOKEN_COOKIE = "srtc";

export const SPOTIFY_REDIRECT_URI = "http://localhost:3000/api/callback";

export const SPOTIFY_AUTH_HEADER = `Basic ${Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
).toString("base64")}`;

export const SCOPES =
    "user-read-private user-read-email user-follow-read user-library-read playlist-read-collaborative playlist-read-private user-top-read";
