import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { Nullable } from "@packages/types";
import { isServerSide } from "@packages/utils/isServerSide";
import { authLink } from "./auth-link";
import { httpLink } from "./http-link";

let CLIENT: Nullable<ApolloClient<any>> = null;
const windowApolloState =
    !isServerSide && (window.__NEXT_DATA__ as any).apolloState;

export function getApolloClient(forceNew: boolean = false) {
    if (!CLIENT || forceNew) {
        const link = ApolloLink.from([authLink, httpLink]);

        CLIENT = new ApolloClient({
            ssrMode: isServerSide,
            link,
            cache: new InMemoryCache(),
        });
    }

    return CLIENT;
}
