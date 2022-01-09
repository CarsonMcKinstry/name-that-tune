import { fromPromise } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

export const authLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
        for (let err of graphQLErrors) {
            if (err.extensions.code === "UNAUTHENTICATED") {
                return fromPromise(
                    fetch("/api/refresh", {
                        headers: { accept: "application/json" },
                    }).catch((err) => {
                        console.error(err);
                        window.location.replace("/");
                    })
                ).flatMap<any>(() => {
                    return forward(operation);
                });
            }
        }

        return forward(operation);
    }
});
