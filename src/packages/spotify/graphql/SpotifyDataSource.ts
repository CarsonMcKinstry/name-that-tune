import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { AuthenticationError } from "apollo-server-errors";
import { SPOTIFY_API_BASE_URL } from "..";
import { ApolloSpotifyContext } from "../types";

export class SpotifyDataSource extends RESTDataSource<ApolloSpotifyContext> {
    override baseURL = SPOTIFY_API_BASE_URL;

    private checkAuth() {
        if (!this.context.spotifyAccessToken) {
            throw new AuthenticationError("user not authenticated");
        }
    }

    override willSendRequest(req: RequestOptions) {
        this.checkAuth();
        req.headers.set("Authorization", this.context.spotifyAccessToken!);
    }
}
