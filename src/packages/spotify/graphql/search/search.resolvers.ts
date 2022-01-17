import { ContextResolvers } from "@packages/graphql";

export const searchResolvers: ContextResolvers = {
    Query: {
        search(_parent, { query, ...args }, { dataSources }) {
            return dataSources.search.search(query, args);
        },
        searchAlbums(_parent, { query, ...args }, { dataSources }) {
            return dataSources.albums.search(query, args);
        },
        searchArtists(_parent, { query, ...args }, { dataSources }) {
            return dataSources.artists.search(query, args);
        },
        searchTracks(_parent, { query, ...args }, { dataSources }) {
            return dataSources.tracks.search(query, args);
        },
    },
};
