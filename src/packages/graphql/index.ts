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
    AlbumDataSource,
    ArtistDataSource,
    BaseDataSource,
    PlaylistDataSource,
    SearchDataSource,
    TrackDataSource,
    UserDataSource,
} from "@packages/spotify";

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

export const dataSources = () => ({
    albums: new AlbumDataSource(),
    artists: new ArtistDataSource(),
    spotifyBase: new BaseDataSource(),
    playlists: new PlaylistDataSource(),
    search: new SearchDataSource(),
    tracks: new TrackDataSource(),
    users: new UserDataSource(),
});

export type { GraphqlContext };
export type { APIPaginationResponse, ContextResolvers } from "./types";
export * from "./gql-types";
