import { FC } from "react";
import { useCurrentRound } from "./gameContext";
import { TrackOption } from "./TrackOption";

interface TrackOptionsProps {
    onSelect: (id: string) => void;
}

export const TrackOptions: FC<TrackOptionsProps> = ({ onSelect }) => {
    const { options } = useCurrentRound();
    return (
        <ul className="w-full p-3 md:p-0 md:pt-6 pb-0 h-full max-w-[360px]">
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
