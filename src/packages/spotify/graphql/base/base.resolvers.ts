import { ContextResolvers } from "@packages/graphql";

export const spotifyBaseResolvers: ContextResolvers = {
    Query: {
        genres(_parent, _args, { dataSources }) {
            return dataSources.spotifyBase.getGenres();
        },
        markets(_parent, _args, { dataSources }) {
            return dataSources.spotifyBase.getMarkets();
        },
        categories(_parent, args, { dataSources }) {
            return dataSources.spotifyBase.getCategories(args);
        },
        category(_parent, { id, ...args }, { dataSources }) {
            return dataSources.spotifyBase.getCategory(id, args);
        },
    },
};
