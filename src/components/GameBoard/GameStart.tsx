import { FC } from "react";

interface RoundStartProps {
    onStart: () => void;
    onQuit: () => void;
    score: number;
    round: number;
    rounds: number;
}

export const GameStart: FC<RoundStartProps> = ({ onQuit, onStart, rounds }) => {
    return (
        <div className="h-full w-full flex justify-center items-center bg-gray-800/25">
            <div className="bg-gray-50 p-6 text-center min-w-[340px] max-w-[360px] rounded-lg">
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>Explainer Goes here</div>
                    <button
                        className="bg-rose-500 p-2 rounded-lg text-gray-50"
                        onClick={onQuit}
                    >
                        Quit
                    </button>
                    <button
                        className="bg-emerald-500 p-2 rounded-lg text-gray-50"
                        onClick={onStart}
                    >
                        Start
                    </button>
                </div>
            </div>
        </div>
    );
};
