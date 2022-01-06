import {
    refreshAccessToken,
    SPOTIFY_ACCESS_TOKEN_COOKIE,
    SPOTIFY_REFRESH_TOKEN_COOKIE,
} from "@packages/spotify";
import { NextApiHandler } from "next";
import nookies from "nookies";

const handler: NextApiHandler = async (req, res) => {
    const {
        query: { redirect },
    } = req;
    const { [SPOTIFY_REFRESH_TOKEN_COOKIE]: refreshToken } = nookies.get({
        req,
    });

    try {
        if (!refreshToken) throw new Error();

        const { access_token, expires_in, refresh_token } =
            await refreshAccessToken(refreshToken);

        nookies.set({ res }, SPOTIFY_ACCESS_TOKEN_COOKIE, access_token, {
            path: "/",
            expires: new Date(Date.now() + expires_in * 1000),
        });
        nookies.set({ res }, SPOTIFY_REFRESH_TOKEN_COOKIE, refresh_token, {
            path: "/api/refresh",
        });

        if (redirect) {
            res.redirect(`/${redirect}`);
        } else {
            res.redirect("/");
        }
    } catch (err) {
        res.redirect("/");
    }

    res.json({ andI: "oop" });
};

export default handler;
