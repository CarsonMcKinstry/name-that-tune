import { Nullable } from "@packages/types";
import { createContext, useContext, useMemo } from "react";

interface RoundTrack {
    id: string;
    name: string;
    album: string;
    artist: string;
}

interface Round {
    track: RoundTrack & {
        preview: string;
        albumArtwork: string;
    };
    options: RoundTrack[];
}

export interface GameContext {
    round: number;
    rounds: Round[];
    score: number;
    playing: boolean;
}

export const defaultGameContext: GameContext = {
    round: 0,
    rounds: [],
    score: 0,
    playing: false,
};

export const gameContext = createContext<GameContext>(defaultGameContext);

export const useGameContext = (): GameContext => {
    return useContext(gameContext);
};

export const useCurrentRound = (): Round => {
    const { round, rounds } = useGameContext();

    return useMemo(() => rounds[round], [round, rounds]);
};
