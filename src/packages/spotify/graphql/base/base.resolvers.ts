import { ContextResolvers } from "@packages/graphql";

export const spotifyBaseResolvers: ContextResolvers = {
    Query: {
        genres(_parent, _args, { dataSources }) {
            return dataSources.spotify.getGenres();
        },
        markets(_parent, _args, { dataSources }) {
            return dataSources.spotify.getMarkets();
        },
        categories(_parent, args, { dataSources }) {
            return dataSources.spotify.getCategories(args);
        },
        category(_parent, { id, ...args }, { dataSources }) {
            return dataSources.spotify.getCategory(id, args);
        },
    },
};
