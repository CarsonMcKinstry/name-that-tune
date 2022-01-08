import {
    Artist,
    Artists,
    Me,
    MeTop_ArtistsArgs,
    MeTop_TracksArgs,
    Track,
    Tracks,
    UserProfile,
} from "@packages/graphql";
import { omitNil } from "@packages/utils";
import { configurePagination } from "@packages/utils/configurePagination";
import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { ForbiddenError } from "apollo-server-errors";
import { SPOTIFY_API_BASE_URL } from "..";
import { ApolloSpotifyContext } from "../types";

export class SpotifyDataSource extends RESTDataSource<ApolloSpotifyContext> {
    override baseURL = SPOTIFY_API_BASE_URL;

    private checkAuth() {
        if (!this.context.spotifyAccessToken) {
            throw new ForbiddenError("user not authenticated");
        }
    }

    override willSendRequest(req: RequestOptions) {
        this.checkAuth();
        req.headers.set("Authorization", this.context.spotifyAccessToken!);
    }

    public async getMe(): Promise<Me> {
        return this.get("/me");
    }

    public async getUser(id: string): Promise<UserProfile> {
        const isSpotify = id === "";

        return this.get(`/users/${isSpotify ? "spotify" : id}`);
    }

    public async getMyTopArtists(
        args: MeTop_ArtistsArgs = {}
    ): Promise<Artists> {
        const topArtist = await this.get("/me/top/artists", omitNil(args));

        const { items, ...rest } = configurePagination<Artist>(topArtist);

        return {
            ...rest,
            artists: items,
        };
    }

    public async getMyTopTracks(args: MeTop_TracksArgs = {}): Promise<Tracks> {
        const topTracks = await this.get("/me/top/tracks", omitNil(args));

        const { items, ...rest } = configurePagination<Track>(topTracks);

        return {
            ...rest,
            tracks: items,
        };
    }
}
