import { FC } from "react";
import { useBuildQuestionBankQuery } from "./questionBank.hook";

export const Questions: FC = () => {
    const { data, loading } = useBuildQuestionBankQuery({
        variables: {
            artists: ["0p4nmQO2msCgU4IF37Wi3j", "7hU3IHwjX150XLoTVmjD0q"],
            tracks: ["2z4U9d5OAA4YLNXoCgioxo", "7hU3IHwjX150XLoTVmjD0q"],
            genre: "punk-rock",
        },
    });

    if (loading) return <>loading...</>;

    return <pre>{JSON.stringify(data, null, 4)}</pre>;
};
