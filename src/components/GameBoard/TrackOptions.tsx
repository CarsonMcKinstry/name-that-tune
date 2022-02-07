import { FC } from "react";
import { TrackOption } from "./TrackOption";
import { RoundTrack } from "./types";

interface TrackOptionsProps {
    onSelect: (id: string) => void;
    options: RoundTrack[];
}

export const TrackOptions: FC<TrackOptionsProps> = ({
    onSelect,
    options = [],
}) => {
    return (
        <ul className="w-full p-3 md:p-0 md:pt-6 pb-0 max-w-[360px]">
            {options.map(({ id, ...option }) => {
                return (
                    <TrackOption
                        key={id}
                        {...option}
                        onSelect={() => onSelect(id)}
                    />
                );
            })}
        </ul>
    );
};
