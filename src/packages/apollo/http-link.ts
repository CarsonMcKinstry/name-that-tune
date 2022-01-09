import { ApolloLink, createHttpLink } from "@apollo/client";

export const httpLink = createHttpLink({
    uri: "/api/graphql",
    credentials: "same-origin",
});
