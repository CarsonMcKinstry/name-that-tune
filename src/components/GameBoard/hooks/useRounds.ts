import { useEffect, useMemo, useState } from "react";
import { GameInput } from "./../types";
import { useRecommendationsQuery } from "./getRecommendations.hook";

export const useRounds = ({ artists, genre, tracks }: GameInput) => {
    const [limit, setLimit] = useState(20);
    const [building, setBuilding] = useState(true);
    const { data, loading } = useRecommendationsQuery({
        variables: {
            input: {
                seed_artists: artists,
                seed_genres: [genre],
                seed_tracks: tracks,
                limit,
            },
        },
    });

    useEffect(() => {
        if (!loading) {
            const usableTracks =
                data?.recommendations.tracks.filter(
                    (track) => !!track.preview_url
                ) ?? [];

            if (usableTracks?.length < 20) {
                setLimit((l) => l + 20);
            } else {
                setBuilding(false);
            }
        }
    }, [loading, data]);

    return useMemo(() => {
        if (loading)
            return {
                building,
                rounds: [],
            };

        const usableTracks = data?.recommendations.tracks.filter(
            (track) => !!track.preview_url
        );

        console.log(usableTracks);

        return {
            building,
            rounds: [],
        };
    }, [data, loading, building]);
};
