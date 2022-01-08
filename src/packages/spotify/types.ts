import { Nullable } from "@packages/types";
import { SpotifyDataSource } from "./graphql/SpotifyDataSource";

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
    };
};
