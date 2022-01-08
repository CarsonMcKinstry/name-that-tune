import { ContextResolvers } from "@packages/graphql";

export const userResolvers: ContextResolvers = {
    Query: {
        me(_parent, _args, { dataSources }) {
            return dataSources.spotify.getMe();
        },
        user(_parent, { id }, { dataSources }) {
            return dataSources.spotify.getUser(id);
        },
    },
    Me: {
        top_tracks(_parent, args, { dataSources }) {
            return dataSources.spotify.getMyTopTracks(args);
        },
        top_artists(_parent, args, { dataSources }) {
            return dataSources.spotify.getMyTopArtists(args);
        },
    },
};
