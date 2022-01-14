import {
  Album,
  Albums,
  AlbumTracksArgs,
  Artist,
  ArtistAlbumsArgs,
  Artists,
  ArtistTop_TracksArgs,
  AudioFeatures,
  Categories,
  Category,
  ItemType,
  Me,
  MeAlbumsArgs,
  MePlaylistsArgs,
  MeTop_ArtistsArgs,
  MeTop_TracksArgs,
  Playlist,
  Playlists,
  PlaylistTrack,
  PlaylistTracks,
  PlaylistTracksArgs,
  QueryAlbumArgs,
  QueryAlbumsArgs,
  QueryArtistsArgs,
  QueryCategoriesArgs,
  QueryCategoryArgs,
  QueryNewReleasesArgs,
  QueryPlaylistArgs,
  QueryRecommendationsArgs,
  QuerySearchAlbumsArgs,
  QuerySearchArgs,
  QuerySearchArtistsArgs,
  QuerySearchTracksArgs,
  QueryTrackArgs,
  QueryTracksArgs,
  Recommendations,
  RelatedArtists,
  Search,
  TopTracks,
  Track,
  Tracks,
  UserProfile,
} from "@packages/graphql";
import { omitNil } from "@packages/utils";
import { configurePagination } from "@packages/utils";
import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { AuthenticationError } from "apollo-server-errors";
import { SPOTIFY_API_BASE_URL } from "..";
import { ApolloSpotifyContext } from "../types";
import DataLoader from "dataloader";

export class SpotifyDataSource extends RESTDataSource<ApolloSpotifyContext> {
  override baseURL = SPOTIFY_API_BASE_URL;

  private checkAuth() {
    if (!this.context.spotifyAccessToken) {
      throw new AuthenticationError("user not authenticated");
    }
  }

  override willSendRequest(req: RequestOptions) {
    this.checkAuth();
    req.headers.set("Authorization", this.context.spotifyAccessToken!);
  }

  public async getMe(): Promise<Me> {
    return this.get("/me");
  }

  public async getMyTopArtists(args: MeTop_ArtistsArgs = {}): Promise<Artists> {
    const topArtist = await this.get("/me/top/artists", omitNil(args));

    const { items, ...rest } = configurePagination<Artist>(topArtist);

    return {
      ...rest,
      artists: items,
    };
  }

  public async getMyTopTracks(args: MeTop_TracksArgs = {}): Promise<Tracks> {
    const topTracks = await this.get("/me/top/tracks", omitNil(args));

    const { items, ...rest } = configurePagination<Track>(topTracks);

    return {
      ...rest,
      tracks: items,
    };
  }

  public async getMyPlaylists(args: MePlaylistsArgs = {}): Promise<Playlists> {
    const playlistResponse = await this.get("/me/playlists", omitNil(args));

    const { items, ...rest } = configurePagination<Playlist>(playlistResponse);

    return {
      ...rest,
      playlists: items,
    };
  }

  public async getMyAlbums(args: MeAlbumsArgs): Promise<Albums> {
    const { albums } = await this.get("/me/albums", omitNil(args));
    console.log(albums);
    const { items, ...rest } = configurePagination<Album>(albums);

    return {
      albums: items,
      ...rest,
    };
  }

  public async getUser(id: string): Promise<UserProfile> {
    const isSpotify = id === "";

    return this.get(`/users/${isSpotify ? "spotify" : id}`);
  }

  public async getPlaylist(
    id: string,
    args: Omit<QueryPlaylistArgs, "id"> = {}
  ): Promise<Playlist> {
    return this.get(`/playlists/${id}`, omitNil(args));
  }

  public async getTracksForPlaylist(
    id: string,
    args: Omit<PlaylistTracksArgs, "id">
  ): Promise<PlaylistTracks> {
    const playlistTracks = await this.get(
      `/playlists/${id}/tracks`,
      omitNil(args)
    );

    const { items, ...rest } =
      configurePagination<PlaylistTrack>(playlistTracks);

    return {
      ...rest,
      tracks: items,
    };
  }

  public getTrackAudioFeatures = new DataLoader<string, AudioFeatures>(
    async (ids) => {
      try {
        const response = await this.get("/audio-features", {
          ids,
        });

        return response.audio_features;
      } catch (_err) {
        return ids.map(() => null);
      }
    }
  );

  public async getTrack(
    id: string,
    args: Omit<QueryTrackArgs, "id"> = {}
  ): Promise<Track> {
    return this.get(`/tracks/${id}`, omitNil(args));
  }

  public async getTracks(
    args: QueryTracksArgs = { ids: [] }
  ): Promise<Track[]> {
    return this.get("/tracks", omitNil(args));
  }

  public async getRecommendations({
    input,
  }: QueryRecommendationsArgs): Promise<Recommendations> {
    return this.get("/recommendations", omitNil(input));
  }

  public async getTracksForAlbum(
    id: string,
    args: Omit<AlbumTracksArgs, "id">
  ): Promise<Tracks> {
    const tracks = await this.get(`/albums/${id}/tracks`, omitNil(args));

    const { items, ...rest } = configurePagination<Track>(tracks);

    return {
      ...rest,
      tracks: items,
    };
  }

  public async getAlbum(
    id: string,
    args: Omit<QueryAlbumArgs, "id"> = {}
  ): Promise<Album> {
    return this.get(`/albums/${id}`, omitNil(args));
  }

  public async getAlbums(args: QueryAlbumsArgs): Promise<Album[]> {
    return this.get(`/albums`, omitNil(args));
  }

  public async getNewReleases(args: QueryNewReleasesArgs): Promise<Albums> {
    return this.get("/browse/new-releases", omitNil(args));
  }

  public async getArtist(id: string): Promise<Artist> {
    return this.get(`/artists/${id}`);
  }

  public async getArtists(args: QueryArtistsArgs): Promise<Artist[]> {
    return this.get("/artists", omitNil(args));
  }

  public async getAlbumsForArtist(
    id: string,
    args: Omit<ArtistAlbumsArgs, "id">
  ): Promise<Albums> {
    const albums = await this.get(`/artists/${id}/albums`, omitNil(args));

    const { items, ...rest } = configurePagination<Album>(albums);

    return {
      ...rest,
      albums: items,
    };
  }

  public async getTopTracksForArtist(
    id: string,
    args: ArtistTop_TracksArgs
  ): Promise<TopTracks> {
    return this.get(`/artists/${id}/top-tracks`, omitNil(args));
  }
  public async getRelatedArtists(id: string): Promise<RelatedArtists> {
    return this.get(`/artists/${id}/related-artists`);
  }

  public async getCategory(
    id: string,
    args: Omit<QueryCategoryArgs, "id">
  ): Promise<Category> {
    return this.get(`/browse/categories/${id}`, omitNil(args));
  }

  public async getCategories(args: QueryCategoriesArgs): Promise<Categories> {
    const categories = await this.get("/browse/categories", omitNil(args));

    const { items, ...rest } = configurePagination<Category>(categories);

    return {
      ...rest,
      categories: items,
    };
  }

  public async getGenres(): Promise<string[]> {
    const { genres } = await this.get("/recommendations/available-genre-seeds");

    return genres;
  }
  public async getMarkets(): Promise<string[]> {
    const { markets } = await this.get("/markets");

    return markets;
  }

  public async searchAlbums(
    query: string,
    args: Omit<QuerySearchAlbumsArgs, "query">
  ): Promise<Albums> {
    const { albums } = await this.search(query, {
      ...args,
      type: [ItemType.Album],
    });

    return (
      albums ?? {
        total: 0,
        limit: 0,
        offset: 0,
        albums: [],
        next: null,
        previous: null,
      }
    );
  }
  public async searchArtists(
    query: string,
    args: Omit<QuerySearchArtistsArgs, "query">
  ): Promise<Artists> {
    const { artists } = await this.search(query, {
      ...args,
      type: [ItemType.Artist],
    });

    return (
      artists ?? {
        total: 0,
        limit: 0,
        offset: 0,
        artists: [],
        next: null,
        previous: null,
      }
    );
  }

  public async searchTracks(
    query: string,
    args: Omit<QuerySearchTracksArgs, "query">
  ): Promise<Tracks> {
    const { tracks } = await this.search(query, {
      ...args,
      type: [ItemType.Track],
    });

    return (
      tracks ?? {
        total: 0,
        limit: 0,
        offset: 0,
        tracks: [],
        next: null,
        previous: null,
      }
    );
  }

  public async search(
    query: string,
    args: Omit<QuerySearchArgs, "query">
  ): Promise<Search> {
    const { tracks, artists, albums } = await this.get(
      "/search",
      omitNil({
        q: query,
        ...args,
      })
    );

    const { items: trackItems, ...trackRest } = configurePagination<Track>(
      tracks ?? {}
    );
    const { items: artistItems, ...artistRest } = configurePagination<Artist>(
      artists ?? {}
    );
    const { items: albumItems, ...albumRest } = configurePagination<Album>(
      albums ?? {}
    );

    return {
      tracks: {
        ...trackRest,
        tracks: trackItems,
      },
      artists: {
        ...artistRest,
        artists: artistItems,
      },
      albums: {
        ...albumRest,
        albums: albumItems,
      },
    };
  }
}
