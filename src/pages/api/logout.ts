import {
    SPOTIFY_ACCESS_TOKEN_COOKIE,
    SPOTIFY_REFRESH_TOKEN_COOKIE,
} from "@packages/spotify";
import { NextApiHandler } from "next";
import nookies from "nookies";

const handler: NextApiHandler = (req, res) => {
    const {
        query: { redirect },
    } = req;

    nookies.destroy({ res }, SPOTIFY_ACCESS_TOKEN_COOKIE, { path: "/ " });
    nookies.destroy({ res }, SPOTIFY_REFRESH_TOKEN_COOKIE, { path: "/api" });

    if (redirect) {
        res.redirect(`/${redirect}`);
    } else {
        res.redirect("/");
    }
};

export default handler;
