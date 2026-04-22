import { NextRequest, NextResponse } from "next/server";
import { exchangeOAuthCodeOnServer } from "@/src/features/login/server/callServer/exchangeOAuthCodeOnsServer";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing_code", req.url));
  }

  try {
    const result = await exchangeOAuthCodeOnServer(code);

    if (!result.success) {
      return NextResponse.redirect(new URL("/login?error=oauth_failed", req.url));
    }

    if (result.data.result === "TOKEN_REQUIRED") {
      return NextResponse.redirect(new URL(`/signup?state=${result.data.tempKey}`, req.url));
    }

    const res = NextResponse.redirect(new URL("/home", req.url));

    res.cookies.set("access_token", result.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });
    res.cookies.set("pinpoint_id", result.data.pinpointId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });
    res.cookies.set("refresh_token", result.data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });
    res.cookies.set("is_auth", "true", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 900,
    });

    return res;
  } catch {
    return NextResponse.redirect(new URL("/login?error=oauth_exception", req.url));
  }
}
