import {
    AlbumTracksArgs,
    ArtistTop_TracksArgs,
    AudioFeatures,
    ItemType,
    MeTop_TracksArgs,
    PlaylistTrack,
    PlaylistTracks,
    PlaylistTracksArgs,
    QuerySearchTracksArgs,
    QueryTrackArgs,
    QueryTracksArgs,
    TopTracks,
    Track,
    Tracks,
} from "@packages/graphql";
import { configurePagination, omitNil } from "@packages/utils";
import DataLoader from "dataloader";
import { SpotifyDataSource } from "../SpotifyDataSource";

export class TrackDataSource extends SpotifyDataSource {
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

    public async getTopTracksForArtist(
        id: string,
        args: ArtistTop_TracksArgs
    ): Promise<TopTracks> {
        return this.get(`/artists/${id}/top-tracks`, omitNil(args));
    }

    public async search(
        query: string,
        args: Omit<QuerySearchTracksArgs, "query">
    ): Promise<Tracks> {
        const { tracks } = await this.context.dataSources.search.search(query, {
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

    public async getMyTopTracks(args: MeTop_TracksArgs = {}): Promise<Tracks> {
        const topTracks = await this.get("/me/top/tracks", omitNil(args));

        const { items, ...rest } = configurePagination<Track>(topTracks);

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
}
