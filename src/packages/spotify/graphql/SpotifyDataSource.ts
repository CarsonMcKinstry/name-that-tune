import { RESTDataSource } from "apollo-datasource-rest";
import { ApolloSpotifyContext } from "../types";

export class SpotifyDataSource extends RESTDataSource<ApolloSpotifyContext> {}
