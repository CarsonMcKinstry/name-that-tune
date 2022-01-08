import { ApolloSpotifyContext } from "@packages/spotify";
import { Resolvers as GeneratedResolvers } from "./gql-types";

export type GraphqlContext = ApolloSpotifyContext;

export type Resolvers = GeneratedResolvers<GraphqlContext>;
