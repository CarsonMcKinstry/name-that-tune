import {
    Album,
    APIPaginationResponse,
    ContextResolvers,
} from "@packages/graphql";
import { configurePagination } from "@packages/utils";

export const artistResolvers: ContextResolvers = {
    Query: {
        artist(_parent, { id }, { dataSources }) {
            return dataSources.spotify.getArtist(id);
        },
        artists(_parent, args, { dataSources }) {
            return dataSources.spotify.getArtists(args);
        },
    },
    Artist: {
        async uri(parent, _args, { dataSources }) {
            if (parent.uri) return parent.uri;

            if (!parent.id) return null;

            const artist = await dataSources.spotify.getArtist(parent.id);

            return artist.uri ?? null;
        },
        async popularity(parent, _args, { dataSources }) {
            if (parent.popularity) return parent.popularity;

            if (!parent.id) return 0;

            const artist = await dataSources.spotify.getArtist(parent.id);

            return artist.popularity ?? 0;
        },
        async images(parent, _args, { dataSources }) {
            if (parent.images) return parent.images;

            if (!parent.id) return [];

            const artist = await dataSources.spotify.getArtist(parent.id);

            return artist.images ?? [];
        },
        async genres(parent, _args, { dataSources }) {
            if (parent.genres) return parent.genres;

            if (!parent.id) return [];

            const artist = await dataSources.spotify.getArtist(parent.id);

            return artist.genres ?? [];
        },
        async followers(parent, _args, { dataSources }) {
            if (parent.followers) return parent.followers;

            if (!parent.id) return { total: 0 };

            const artist = await dataSources.spotify.getArtist(parent.id);

            return artist.followers ?? { total: 0 };
        },
        async albums(parent, args, { dataSources }) {
            if (parent.albums) {
                const { items, ...rest } = configurePagination<Album>(
                    parent.albums as unknown as APIPaginationResponse<Album>
                );

                return {
                    albums: items,
                    ...rest,
                };
            }

            if (!parent.id)
                return {
                    total: 0,
                    limit: 0,
                    offset: 0,
                    next: null,
                    previous: null,
                    albums: [],
                };

            return dataSources.spotify.getAlbumsForArtist(parent.id, args);
        },
        async top_tracks(parent, args, { dataSources }) {
            if (!parent.id) return null;

            return dataSources.spotify.getTopTracksForArtist(parent.id, args);
        },

        async related_artists(parent, _args, { dataSources }) {
            if (!parent.id) return null;

            return dataSources.spotify.getRelatedArtists(parent.id);
        },
    },
};
