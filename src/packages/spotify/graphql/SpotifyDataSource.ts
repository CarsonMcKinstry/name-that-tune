import {
    Album,
    Albums,
    AlbumTracksArgs,
    Artist,
    ArtistAlbumsArgs,
    Artists,
    AudioFeatures,
    Categories,
    Category,
    Me,
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
    QueryTrackArgs,
    QueryTracksArgs,
    Track,
    Tracks,
    UserProfile,
} from "@packages/graphql";
import { omitNil } from "@packages/utils";
import { configurePagination } from "@packages/utils/configurePagination";
import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";
import { ForbiddenError } from "apollo-server-errors";
import { SPOTIFY_API_BASE_URL } from "..";
import { ApolloSpotifyContext } from "../types";
import DataLoader from "dataloader";

export class SpotifyDataSource extends RESTDataSource<ApolloSpotifyContext> {
    override baseURL = SPOTIFY_API_BASE_URL;

    private checkAuth() {
        if (!this.context.spotifyAccessToken) {
            throw new ForbiddenError("user not authenticated");
        }
    }

    override willSendRequest(req: RequestOptions) {
        this.checkAuth();
        req.headers.set("Authorization", this.context.spotifyAccessToken!);
    }

    public async getMe(): Promise<Me> {
        return this.get("/me");
    }

    public async getUser(id: string): Promise<UserProfile> {
        const isSpotify = id === "";

        return this.get(`/users/${isSpotify ? "spotify" : id}`);
    }

    public async getMyTopArtists(
        args: MeTop_ArtistsArgs = {}
    ): Promise<Artists> {
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

    public async getMyPlaylists(
        args: MePlaylistsArgs = {}
    ): Promise<Playlists> {
        const playlistResponse = await this.get("/me/playlists", omitNil(args));

        const { items, ...rest } =
            configurePagination<Playlist>(playlistResponse);

        return {
            ...rest,
            playlists: items,
        };
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
        const albums = await this.get(`/artists/${id}/albums`);

        const { items, ...rest } = configurePagination<Album>(albums);

        return {
            ...rest,
            albums: items,
        };
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
        return this.get("/recommendations/available-genre-seeds");
    }
    public async getMarkets(): Promise<string[]> {
        return this.get("/markets");
    }
}
