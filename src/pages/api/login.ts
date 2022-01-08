import {
    SCOPES,
    SPOTIFY_ACCESS_TOKEN_COOKIE,
    SPOTIFY_ACCOUNT_BASE_URL,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_REDIRECT_URI,
    SPOTIFY_REFRESH_TOKEN_COOKIE,
} from "@packages/spotify";
import { NextApiHandler } from "next";
import nookies from "nookies";
import { URLSearchParams } from "url";

const handler: NextApiHandler = async (req, res) => {
    const { cookies } = req;
    console.log(cookies);
    // if we already have the cookie, we don't need
    // to do anything and we can head to the game
    if (SPOTIFY_ACCESS_TOKEN_COOKIE in cookies) {
        res.redirect("/game");
        return;
    }

    // otherwise we need to authorize the user
    const query = new URLSearchParams({
        response_type: "code",
        client_id: SPOTIFY_CLIENT_ID,
        scope: SCOPES,
        redirect_uri: SPOTIFY_REDIRECT_URI,
    }).toString();

    res.status(301).redirect(`${SPOTIFY_ACCOUNT_BASE_URL}/authorize?${query}`);
};

export default handler;
