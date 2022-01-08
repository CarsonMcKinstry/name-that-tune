import { Me, UserProfile } from "@packages/graphql";
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
}
