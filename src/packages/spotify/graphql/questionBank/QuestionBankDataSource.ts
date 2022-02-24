import { RESTDataSource } from "apollo-datasource-rest";
import {
    GraphqlContext,
    QueryQuestionBankArgs,
    QuestionBank,
    Track,
} from "@packages/graphql";

function shuffle<T>(cards: T[]): T[] {
    return [...cards].sort(() => 0.5 - Math.random());
}

function draw<T>(cards: T[], n: number): T[] {
    return shuffle(cards).slice(0, n);
}

export class QuestionBankDataSource extends RESTDataSource<GraphqlContext> {
    async buildQuestionBank(
        args: QueryQuestionBankArgs
    ): Promise<QuestionBank> {
        const recommendations =
            await this.context.dataSources.users.getRecommendations({
                input: {
                    seed_artists: args.artists,
                    seed_genres: [args.genre],
                    seed_tracks: args.tracks,
                    limit: 100,
                },
            });

        const used = new Set<Track>();

        const usableTracks = recommendations.tracks.filter(
            (track) => !!track.id && !!track.preview_url
        );

        const questions = Array.from({ length: 5 }, () => {
            const tracks = usableTracks.filter((t) => !used.has(t));

            const options = draw(tracks, 4);

            for (const track of options) {
                used.add(track);
            }

            return {
                options,
            };
        });

        return {
            questions,
        };
    }
}
