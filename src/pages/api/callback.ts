import {
    getAccessToken,
    SPOTIFY_ACCESS_TOKEN_COOKIE,
    SPOTIFY_REFRESH_TOKEN_COOKIE,
} from "@packages/spotify";
import { NextApiHandler } from "next";
import nookies from "nookies";

const handler: NextApiHandler = async (req, res) => {
    const { code, error } = req.query;

    if (!code || error) {
        // come back and do something this?
        res.json({
            error: error ?? "Oops! We didn't get a code for  you...",
        });
        return;
    }

    // otherwise, we need to get the user's access token
    try {
        const { access_token, refresh_token, expires_in } =
            await getAccessToken(String(code));

        nookies.set({ res }, SPOTIFY_ACCESS_TOKEN_COOKIE, access_token, {
            path: "/",
            expires: new Date(Date.now() + expires_in * 1000),
        });
        nookies.set({ res }, SPOTIFY_REFRESH_TOKEN_COOKIE, refresh_token, {
            path: "/api/refresh",
        });

        res.redirect("/game");
    } catch (err: any) {
        res.json({
            error: err.message,
        });
    }
};

export default handler;
