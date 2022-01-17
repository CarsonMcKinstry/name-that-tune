import {
    Album,
    Artist,
    QuerySearchArgs,
    Search,
    Track,
} from "@packages/graphql";
import { configurePagination, omitNil } from "@packages/utils";
import { SpotifyDataSource } from "../SpotifyDataSource";

export class SearchDataSource extends SpotifyDataSource {
    public async search(
        query: string,
        args: Omit<QuerySearchArgs, "query">
    ): Promise<Search> {
        const { tracks, artists, albums } = await this.get(
            "/search",
            omitNil({
                q: query,
                ...args,
            })
        );

        const { items: trackItems, ...trackRest } = configurePagination<Track>(
            tracks ?? {}
        );
        const { items: artistItems, ...artistRest } =
            configurePagination<Artist>(artists ?? {});
        const { items: albumItems, ...albumRest } = configurePagination<Album>(
            albums ?? {}
        );

        return {
            tracks: {
                ...trackRest,
                tracks: trackItems,
            },
            artists: {
                ...artistRest,
                artists: artistItems,
            },
            albums: {
                ...albumRest,
                albums: albumItems,
            },
        };
    }
}
