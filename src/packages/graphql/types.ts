import { ApolloSpotifyContext } from "@packages/spotify";
import { Resolvers as GeneratedResolvers, Maybe } from "./gql-types";

export type GraphqlContext = ApolloSpotifyContext;

export type ContextResolvers = GeneratedResolvers<GraphqlContext>;

type APIPagination = {
    limit: number;
    offset: number;
    total: number;
    next: Maybe<string>;
    previous: Maybe<string>;
};

export type APIPaginationResponse<T> = APIPagination & {
    items: T[];
};
