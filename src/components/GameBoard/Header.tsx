import { FC } from "react";

interface GameboardHeaderProps {
    round: number;
    rounds: number;
    score: number;
    onQuit: () => void;
}

export const Header: FC<GameboardHeaderProps> = ({
    onQuit,
    round,
    rounds,
    score,
}) => {
    return (
        <header className="sticky top-0 flex justify-center">
            <div className="w-full md:max-w-[375px] p-3 grid grid-cols-3 items-center bg-opacity-75 filter">
                <div className="justify-self-start">
                    <button onClick={onQuit}>Quit</button>
                </div>
                <h2 className="font-extrabold text-2xl justify-self-center">
                    {round} / {rounds}
                </h2>
                <div className="justify-self-end">{score}</div>
            </div>
        </header>
    );
};
