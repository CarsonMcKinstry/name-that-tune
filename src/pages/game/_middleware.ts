import { SPOTIFY_ACCESS_TOKEN_COOKIE } from "@packages/spotify";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    if (!req.cookies[SPOTIFY_ACCESS_TOKEN_COOKIE]) {
        return NextResponse.redirect("/");
    }

    return NextResponse.next();
}
