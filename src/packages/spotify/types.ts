import { UserDataSource } from "./graphql/user/UserDataSource";
import { TrackDataSource } from "./graphql/track/TrackDataSource";
import { BaseDataSource } from "./graphql/base/BaseDataSource";
import { AlbumDataSource } from "./graphql/album/AlbumDataSource";
import { Nullable } from "@packages/types";
import { SpotifyDataSource } from "./graphql/SpotifyDataSource";
import { ArtistDataSource } from "./graphql/artist";
import { SearchDataSource } from "./graphql/search";
import { PlaylistDataSource } from "./graphql/playlist";
export interface AuthSuccess {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token: string;
}

export const isAuthSuccess = (response: Object): response is AuthSuccess => {
    return "access_token" in response;
};

export interface AuthFailure {
    error: string;
    error_description: string;
}

export const isAuthFailure = (response: Object): response is AuthFailure => {
    return "error" in response;
};

export type AuthProps = {
    accessToken: Nullable<string>;
};

export type ApolloSpotifyContext = {
    spotifyAccessToken?: string;
    dataSources: {
        spotify: SpotifyDataSource;
        albums: AlbumDataSource;
        artists: ArtistDataSource;
        spotifyBase: BaseDataSource;
        playlists: PlaylistDataSource;
        search: SearchDataSource;
        tracks: TrackDataSource;
        users: UserDataSource;
    };
};
