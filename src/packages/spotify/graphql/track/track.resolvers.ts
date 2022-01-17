import { ContextResolvers } from "@packages/graphql";

export const trackResolvers: ContextResolvers = {
    Query: {
        track(_parent, { id, ...args }, { dataSources }) {
            return dataSources.tracks.getTrack(id, args);
        },
        tracks(_parent, args, { dataSources }) {
            return dataSources.tracks.getTracks(args);
        },
        recommendations(_parent, args, { dataSources }) {
            return dataSources.users.getRecommendations(args);
        },
    },
    Track: {
        async is_playable(parent, _args, { dataSources }) {
            if (parent.is_playable) return !!parent.is_playable;

            if (!parent.id || parent.id === parent.uri) return null;

            const track = await dataSources.tracks.getTrack(parent.id);

            return !!track.is_playable;
        },
        id(parent) {
            const { id, uri } = parent;
            if (id) return id;

            return uri;
        },
        async audio_features(parent, _args, { dataSources }) {
            if (parent.audio_features) return parent.audio_features;

            if (!parent.id || parent.id === parent.uri) return null;

            return dataSources.tracks.getTrackAudioFeatures.load(parent.id);
        },
        async album(parent, _args, { dataSources }) {
            if (parent.album) return parent.album;

            if (!parent.id) return null;

            const track = await dataSources.tracks.getTrack(parent.id);

            return track.album ?? null;
        },
    },
};
