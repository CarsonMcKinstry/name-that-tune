import { ContextResolvers } from "@packages/graphql";

export const userResolvers: ContextResolvers = {
    Query: {
        me(_parent, _args, { dataSources }) {
            return dataSources.users.getMe();
        },
        user(_parent, { id }, { dataSources }) {
            return dataSources.users.getUser(id);
        },
    },
    Me: {
        top_tracks(_parent, args, { dataSources }) {
            return dataSources.tracks.getMyTopTracks(args);
        },
        top_artists(_parent, args, { dataSources }) {
            return dataSources.artists.getMyTopArtists(args);
        },
        playlists(_parent, args, { dataSources }) {
            return dataSources.playlists.getMyPlaylists(args);
        },
        albums(_parent, args, { dataSources }) {
            return dataSources.albums.getMyAlbums(args);
        },
    },
    UserProfile: {
        async followers(parent, _args, { dataSources }) {
            if (parent.followers) return parent.followers;

            const user = await dataSources.users.getUser(parent.id);

            return user.followers;
        },
        async images(parent, _args, { dataSources }) {
            if (parent.images) return parent.images;

            const user = await dataSources.users.getUser(parent.id);

            return user.images;
        },

        async display_name(parent, _args, { dataSources }) {
            if (parent.display_name) return parent.display_name;

            const user = await dataSources.users.getUser(parent.id);

            return user.display_name;
        },
    },
};
