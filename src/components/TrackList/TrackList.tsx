import { AudioPlayer } from "@components/AudioPlayer";
import { FC } from "react";

export const TrackList: FC = ({ children }) => {
    return (
        <AudioPlayer>
            <ul>{children}</ul>
        </AudioPlayer>
    );
};
