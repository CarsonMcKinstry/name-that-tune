import { FC } from "react";
import cn from "classnames";

interface ProgressBarProps {
    playing: boolean;
}

export const ProgressBar: FC<ProgressBarProps> = ({ playing }) => {
    return (
        <div className="p-3 pb-0 md:p-0 md:pt-6 w-full max-w-[360px] justify-self-start">
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
