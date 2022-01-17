import { schema, dataSources } from "@packages/graphql";
import { SPOTIFY_ACCESS_TOKEN_COOKIE } from "@packages/spotify";
import { ApolloServer } from "apollo-server-micro";
import { NextApiHandler, NextApiRequest } from "next";

const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    context({ req }: { req: NextApiRequest }) {
        let spotifyAccessToken =
            req.headers.authorization ??
            req.cookies[SPOTIFY_ACCESS_TOKEN_COOKIE];

        if (spotifyAccessToken && !spotifyAccessToken.startsWith("Bearer")) {
            spotifyAccessToken = `Bearer ${spotifyAccessToken}`;
        }

        return {
            spotifyAccessToken,
        };
    },
    dataSources,
});

export const config = {
    api: {
        bodyParser: false,
    },
};

const startServer = apolloServer.start();

const graphqlHandler: NextApiHandler = async (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Origin",
        "https://studio.apollographql.com"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.end();
        return;
    }
    await startServer;
    await apolloServer.createHandler({
        path: "/api/graphql",
    })(req, res);
};

export default graphqlHandler;
