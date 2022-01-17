import { SpotifyDataSource } from "../SpotifyDataSource";

import {
    Album,
    Albums,
    ArtistAlbumsArgs,
    ItemType,
    MeAlbumsArgs,
    QueryAlbumArgs,
    QueryAlbumsArgs,
    QueryNewReleasesArgs,
    QuerySearchAlbumsArgs,
} from "@packages/graphql";
import { configurePagination, omitNil } from "@packages/utils";

export class AlbumDataSource extends SpotifyDataSource {
    public async getAlbum(
        id: string,
        args: Omit<QueryAlbumArgs, "id"> = {}
    ): Promise<Album> {
        return this.get(`/albums/${id}`, omitNil(args));
    }

    public async getAlbums(args: QueryAlbumsArgs): Promise<Album[]> {
        return this.get(`/albums`, omitNil(args));
    }

    public async getAlbumsForArtist(
        id: string,
        args: Omit<ArtistAlbumsArgs, "id">
    ): Promise<Albums> {
        const albums = await this.get(`/artists/${id}/albums`, omitNil(args));

        const { items, ...rest } = configurePagination<Album>(albums);

        return {
            ...rest,
            albums: items,
        };
    }

    public async search(
        query: string,
        args: Omit<QuerySearchAlbumsArgs, "query">
    ): Promise<Albums> {
        const { albums } = await this.context.dataSources.search.search(query, {
            ...args,
            type: [ItemType.Album],
        });

        return (
            albums ?? {
                total: 0,
                limit: 0,
                offset: 0,
                albums: [],
                next: null,
                previous: null,
            }
        );
    }

    public async getMyAlbums(args: MeAlbumsArgs): Promise<Albums> {
        const { albums } = await this.get("/me/albums", omitNil(args));

        const { items, ...rest } = configurePagination<Album>(albums);

        return {
            albums: items,
            ...rest,
        };
    }

    public async getNewReleases(args: QueryNewReleasesArgs): Promise<Albums> {
        return this.get("/browse/new-releases", omitNil(args));
    }
}
