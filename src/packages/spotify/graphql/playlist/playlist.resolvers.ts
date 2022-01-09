import { ContextResolvers } from "@packages/graphql";

export const playlistResolvers: ContextResolvers = {
    Query: {
        playlist(_parent, { id, ...args }, { dataSources }) {
            return dataSources.spotify.getPlaylist(id, args);
        },
    },
    Playlist: {
        async followers(parent, _args, { dataSources }) {
            if (parent.followers) return parent.followers;

            const playlist = await dataSources.spotify.getPlaylist(parent.id);

            return playlist.followers;
        },
        tracks(parent, args, { dataSources }) {
            return dataSources.spotify.getTracksForPlaylist(parent.id, args);
        },
    },
};
