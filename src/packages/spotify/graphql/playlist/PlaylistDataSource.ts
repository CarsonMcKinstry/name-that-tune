import {
    MePlaylistsArgs,
    Playlist,
    Playlists,
    QueryPlaylistArgs,
} from "@packages/graphql";
import { configurePagination, omitNil } from "@packages/utils";
import { SpotifyDataSource } from "../SpotifyDataSource";

export class PlaylistDataSource extends SpotifyDataSource {
    public async getPlaylist(
        id: string,
        args: Omit<QueryPlaylistArgs, "id"> = {}
    ): Promise<Playlist> {
        return this.get(`/playlists/${id}`, omitNil(args));
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
}
