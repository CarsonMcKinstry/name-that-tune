import {
    Me,
    QueryRecommendationsArgs,
    Recommendations,
    UserProfile,
} from "@packages/graphql";
import { omitNil } from "@packages/utils";
import { SpotifyDataSource } from "../SpotifyDataSource";

export class UserDataSource extends SpotifyDataSource {
    public async getMe(): Promise<Me> {
        return this.get("/me");
    }

    public async getUser(id: string): Promise<UserProfile> {
        const isSpotify = id === "";

        return this.get(`/users/${isSpotify ? "spotify" : id}`);
    }

    public async getRecommendations({
        input,
    }: QueryRecommendationsArgs): Promise<Recommendations> {
        return this.get("/recommendations", omitNil(input));
    }
}
