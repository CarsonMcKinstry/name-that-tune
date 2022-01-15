import { FC } from "react";
import { useGetTrackQuery } from "./getTrack.hook";
import { trackContext } from "./trackContext";
import { getLargestImage } from "@packages/utils";

const { Provider } = trackContext;

interface TrackProviderProps {
    trackId: string;
}

export const TrackProvider: FC<TrackProviderProps> = ({
    trackId,
    children,
}) => {
    const { data } = useGetTrackQuery({ variables: { trackId } });

    const { track } = data ?? {};

    if (!track) return null;

    const { artists = [], album, name, preview_url: previewUrl = null } = track;

    const albumArtwork = album?.images
        ? getLargestImage(album.images)
        : getLargestImage(artists.flatMap((artist) => artist.images));

    const artist = artists.map((artist) => artist.name).join(", ");

    return (
        <Provider
            value={{
                id: trackId,
                name,
                album: {
                    artwork: albumArtwork,
                    name: album?.name ?? "",
                },
                previewUrl,
                artist,
            }}
        >
            {children}
        </Provider>
    );
};
