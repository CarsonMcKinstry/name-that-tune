import { ContextResolvers } from "@packages/graphql";

export const playlistResolvers: ContextResolvers = {
    Query: {
        playlist(_parent, { id, ...args }, { dataSources }) {
            return dataSources.playlists.getPlaylist(id, args);
        },
    },
    Playlist: {
        async followers(parent, _args, { dataSources }) {
            if (parent.followers) return parent.followers;

            const playlist = await dataSources.playlists.getPlaylist(parent.id);

            return playlist.followers;
        },
        tracks(parent, args, { dataSources }) {
            return dataSources.tracks.getTracksForPlaylist(parent.id, args);
        },
    },
};
