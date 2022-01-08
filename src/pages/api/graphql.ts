import { schema } from "@packages/graphql";
import { SPOTIFY_ACCESS_TOKEN_COOKIE } from "@packages/spotify";
import { SpotifyDataSource } from "@packages/spotify/graphql/SpotifyDataSource";
import { ApolloServer } from "apollo-server-micro";
import { NextApiHandler } from "next";

const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    context({ req }) {
        const spotifyAccessToken = req.cookies[SPOTIFY_ACCESS_TOKEN_COOKIE];

        return {
            spotifyAccessToken,
        };
    },
    dataSources: () => {
        return {
            spotify: new SpotifyDataSource(),
        };
    },
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
        "Origin, X-Requested-With, Content-Type, Accept"
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
