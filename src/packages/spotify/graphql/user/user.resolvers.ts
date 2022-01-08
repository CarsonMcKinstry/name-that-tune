import { Resolvers } from "@packages/graphql/types";

export const userResolvers: Resolvers = {
    Query: {
        me(_parent, _args, { dataSources }) {
            return dataSources.spotify.getMe();
        },
        user(_parent, { id }, { dataSources }) {
            return dataSources.spotify.getUser(id);
        },
    },
};
