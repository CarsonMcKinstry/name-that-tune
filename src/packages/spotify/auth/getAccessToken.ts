import {
    SPOTIFY_ACCOUNT_BASE_URL,
    SPOTIFY_AUTH_HEADER,
    SPOTIFY_REDIRECT_URI,
} from "..";
import {
    AuthFailure,
    AuthSuccess,
    isAuthFailure,
    isAuthSuccess,
} from "../types";

export const getAccessToken = async (code: string): Promise<AuthSuccess> => {
    const body = new URLSearchParams({
        code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
        grant_type: "authorization_code",
    });

    const headers = {
        Authorization: SPOTIFY_AUTH_HEADER,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
    };

    const response = await fetch(`${SPOTIFY_ACCOUNT_BASE_URL}/api/token`, {
        method: "POST",
        headers,
        body,
    }).then((res) => res.json());

    if (isAuthSuccess(response)) {
        return response;
    }

    if (isAuthFailure(response)) {
        console.error(response.error_description);
        throw new Error(response.error);
    }

    throw new Error("Unknown error occurred...");
};
