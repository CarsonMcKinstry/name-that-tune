import { Nullable } from "@packages/types";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import {
    AuthProps,
    SPOTIFY_ACCESS_TOKEN_COOKIE,
    SPOTIFY_REFRESH_TOKEN_COOKIE,
} from "..";
import { refreshAccessToken } from "./refreshAccessToken";

export const getAuthPropsFromContext = async (
    context: GetServerSidePropsContext
): Promise<AuthProps> => {
    const cookies = nookies.get(context);

    const { [SPOTIFY_ACCESS_TOKEN_COOKIE]: accessToken } = cookies;

    if (!accessToken) {
        return {
            accessToken: null,
        };
    }

    return {
        accessToken,
    };
};
