import { FC } from "react";
import { useGameContext } from "./gameContext";

interface GameboardHeaderProps {
    onQuit: () => void;
}

export const Header: FC<GameboardHeaderProps> = ({ onQuit }) => {
    const { round, rounds, score } = useGameContext();
    return (
        <header className="sticky top-0 flex justify-center">
            <div className="w-full md:max-w-[375px] p-3 grid grid-cols-3 items-center bg-zinc-800 bg-opacity-75 filter">
                <div className="justify-self-start">
                    <button onClick={onQuit}>Quit</button>
                </div>
                <h2 className="font-extrabold text-2xl justify-self-center">
                    {round} / {rounds.length}
                </h2>
                <div className="justify-self-end">{score}</div>
            </div>
        </header>
    );
};
