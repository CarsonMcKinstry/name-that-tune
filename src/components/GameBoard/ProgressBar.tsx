import "./gameBoard.css";
import { FC } from "react";
import cn from "classnames";
import { useGameContext } from "./gameContext";

interface ProgressBarProps {}

export const ProgressBar: FC<ProgressBarProps> = ({}) => {
    const { playing } = useGameContext();
    return (
        <div className="p-3 pb-0 md:p-0 md:pt-6 w-full max-w-[360px]">
            <div className="rounded-lg h-2 w-full bg-zinc-500 overflow-hidden">
                <div
                    className={cn(
                        "w-full bg-zinc-100 h-full reveal-animation progress",
                        {
                            play: playing,
                        }
                    )}
                ></div>
            </div>
        </div>
    );
};
