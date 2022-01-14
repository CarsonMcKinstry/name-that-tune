import { BatchHttpLink } from "@apollo/client/link/batch-http";

export const httpLink = new BatchHttpLink({
  uri: "/api/graphql",
  credentials: "same-origin",
  batchMax: 10,
  batchInterval: 20,
});
