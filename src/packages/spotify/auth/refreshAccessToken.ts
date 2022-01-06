import { URLSearchParams } from "url";
import { SPOTIFY_ACCOUNT_BASE_URL, SPOTIFY_AUTH_HEADER } from "..";
import { AuthSuccess, isAuthFailure, isAuthSuccess } from "../types";

export const refreshAccessToken = async (
    token: string
): Promise<AuthSuccess> => {
    const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token,
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
