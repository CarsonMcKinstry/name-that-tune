import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers } from "@graphql-tools/merge";
import { GraphqlContext } from "./types";

import { baseTypeDefs, baseResolvers } from "./schemas/base";
import {
    spotifyBaseTypeDefs,
    spotifyBaseResolvers,
    userResolvers,
    userTypeDefs,
    albumResolvers,
    albumTypeDefs,
    artistResolvers,
    artistTypeDefs,
    trackResolvers,
    trackTypeDefs,
    searchResolvers,
    searchTypeDefs,
    playlistResolvers,
    playlistTypeDefs,
} from "@packages/spotify/graphql";

const typeDefs = [
    baseTypeDefs,
    trackTypeDefs,
    albumTypeDefs,
    artistTypeDefs,
    spotifyBaseTypeDefs,
    userTypeDefs,
    searchTypeDefs,
    playlistTypeDefs,
];

const resolvers = mergeResolvers<any, GraphqlContext>([
    baseResolvers,
    userResolvers,
    spotifyBaseResolvers,
    albumResolvers,
    artistResolvers,
    trackResolvers,
    searchResolvers,
    playlistResolvers,
]);

export const schema = makeExecutableSchema<GraphqlContext>({
    typeDefs,
    resolvers,
});

export type { GraphqlContext };
export type { APIPaginationResponse, ContextResolvers } from "./types";
export * from "./gql-types";
