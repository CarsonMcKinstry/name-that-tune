import {
    Artist,
    Artists,
    ItemType,
    MeTop_ArtistsArgs,
    QueryArtistsArgs,
    QuerySearchArtistsArgs,
    RelatedArtists,
} from "@packages/graphql";
import { configurePagination, omitNil } from "@packages/utils";
import { SpotifyDataSource } from "../SpotifyDataSource";

export class ArtistDataSource extends SpotifyDataSource {
    public async getArtist(id: string): Promise<Artist> {
        return this.get(`/artists/${id}`);
    }

    public async getArtists(args: QueryArtistsArgs): Promise<Artist[]> {
        return this.get("/artists", omitNil(args));
    }

    public async getRelatedArtists(id: string): Promise<RelatedArtists> {
        return this.get(`/artists/${id}/related-artists`);
    }
    public async search(
        query: string,
        args: Omit<QuerySearchArtistsArgs, "query">
    ): Promise<Artists> {
        const { artists } = await this.context.dataSources.search.search(
            query,
            {
                ...args,
                type: [ItemType.Artist],
            }
        );

        return (
            artists ?? {
                total: 0,
                limit: 0,
                offset: 0,
                artists: [],
                next: null,
                previous: null,
            }
        );
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
}
