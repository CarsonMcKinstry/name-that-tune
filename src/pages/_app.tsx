import "../styles/preflight.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "@packages/apollo";
import { ThemeProvider } from "styled-components";
import { theme } from "@styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
    const client = getApolloClient();

    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default MyApp;
