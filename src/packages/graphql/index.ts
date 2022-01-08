import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { GraphqlContext } from "./types";

import { baseTypeDefs, baseResolvers } from "./schemas/base";

const typeDefs = mergeTypeDefs(baseTypeDefs);
const resolvers = mergeResolvers(baseResolvers);

export const schema = makeExecutableSchema<GraphqlContext>({
    typeDefs,
    resolvers,
});

export type { GraphqlContext };
