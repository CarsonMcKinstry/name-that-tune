import { FC } from "react";

interface TrackOptionProps {
    name: string;
    album?: string;
    artist?: string;
    onSelect: () => void;
}

export const TrackOption: FC<TrackOptionProps> = ({
    name,
    album,
    artist,
    onSelect,
}) => {
    const subLine = [];

    if (album) {
        subLine.push(album);
    }

    if (artist) {
        subLine.push(artist);
    }

    return (
        <li className="text-center rounded-lg border w-full mb-4">
            <button onClick={onSelect} className="p-1 w-full">
                <span className="font-semibold block text-base truncate pr-6 pl-6">
                    {name}
                </span>
                <span className="block text-xs truncate pr-6 pl-6 opacity-80">
                    {subLine.join(" · ")}
                </span>
            </button>
        </li>
    );
};
