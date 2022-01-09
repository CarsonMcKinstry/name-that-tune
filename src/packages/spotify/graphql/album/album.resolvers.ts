import {
    APIPaginationResponse,
    ContextResolvers,
    Track,
} from "@packages/graphql";
import { configurePagination } from "@packages/utils";

export const albumResolvers: ContextResolvers = {
    Query: {
        album(_parent, { id, ...args }, { dataSources }) {
            return dataSources.spotify.getAlbum(id, args);
        },
        albums(_parent, args, { dataSources }) {
            return dataSources.spotify.getAlbums(args);
        },
        newReleases(_parent, args, { dataSources }) {
            return dataSources.spotify.getNewReleases(args);
        },
    },
    Album: {
        tracks(parent, args, { dataSources }) {
            if (parent.tracks) {
                const { items, ...rest } = configurePagination<Track>(
                    parent.tracks as unknown as APIPaginationResponse<Track>
                );

                return {
                    tracks: items,
                    ...rest,
                };
            }

            if (!parent.id)
                return {
                    limit: 0,
                    offset: 0,
                    next: null,
                    previous: null,
                    tracks: [],
                    total: 0,
                };

            return dataSources.spotify.getTracksForAlbum(parent.id, args);
        },
        async total_tracks(parent, _args, { dataSources }) {
            if (parent.total_tracks) return parent.total_tracks;

            if (!parent.id) return 0;

            const album = await dataSources.spotify.getAlbum(parent.id);

            return album.total_tracks ?? 0;
        },
        async release_date_precision(parent, _args, { dataSources }) {
            if (parent.release_date_precision)
                return parent.release_date_precision;

            if (!parent.id) return null;

            const album = await dataSources.spotify.getAlbum(parent.id);

            return album.release_date_precision ?? null;
        },
        async album_type(parent, _args, { dataSources }) {
            if (parent.album_type) return parent.album_type;

            if (!parent.id) return null;

            const album = await dataSources.spotify.getAlbum(parent.id);

            return album.album_type ?? null;
        },
    },
};
