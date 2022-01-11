import { FC, memo, useMemo } from "react";
import { useTrackQuery } from "./track.hook";

export interface TrackProps {
    trackId: string;
}

const _Track: FC<TrackProps> = ({ trackId }) => {
    const { data, loading } = useTrackQuery({ variables: { trackId } });

    const track = useMemo(() => {
        if (loading) return null;

        return data?.track;
    }, [data, loading]);

    if (!track) return null;

    return (
        <div style={{ border: "1px solid black" }}>
            <p>{track.name}</p>
            <p>{track.album?.name}</p>
            <p>{track.artists?.map((artist) => artist.name).join(", ")}</p>
        </div>
    );
};

export const Track = memo(_Track);
