import { ContextResolvers } from "@packages/graphql";

export const questionBankResolvers: ContextResolvers = {
    Query: {
        questionBank(parent, args, { dataSources }) {
            return dataSources.questionBank.buildQuestionBank(args);
        },
    },
};
