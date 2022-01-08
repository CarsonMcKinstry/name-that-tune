import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { GraphqlContext } from "./types";

import { baseTypeDefs, baseResolvers } from "./schemas/base";
import {
    spotifyBaseTypeDefs,
    userResolvers,
    userTypeDefs,
} from "@packages/spotify/graphql";

const typeDefs = mergeTypeDefs([
    baseTypeDefs,
    spotifyBaseTypeDefs,
    userTypeDefs,
]);
const resolvers = mergeResolvers([baseResolvers, userResolvers]);

export const schema = makeExecutableSchema<GraphqlContext>({
    typeDefs,
    resolvers,
});

export type { GraphqlContext };
export * from "./gql-types";
