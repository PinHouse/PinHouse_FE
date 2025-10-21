import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js 미들웨어 - 인증 및 권한 체크
 * 모든 요청이 서버로 가기 전에 실행됨
 */

// 보호된 라우트들 (인증 필요)
const PROTECTED_ROUTES = ["/dashboard", "/signup"];
// 공개 라우트들 (인증이 필요 없는)
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/onboarding/diagnosis",
  "/onboarding/compare",
  "/onboarding/agent",
];

/**
 * 인증 상태 확인 함수
 */
function isAuthenticated(request: NextRequest): boolean {
  // 쿠키에서 토큰 확인
  const token = request.cookies.get("refresh_token")?.value;
  if (token) return true;

  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuth = isAuthenticated(request);

  console.log(`🔍 Middleware - Path: ${pathname}, Auth: ${isAuth}`);
  // 1. OAuth 콜백 처리
  if (pathname.startsWith("/signup") && request.nextUrl.searchParams.get("state")) {
    console.log("✅ OAuth 리다이렉트 허용");
    return NextResponse.next();
  }

  // 2. 공개 라우트는 항상 허용
  if (PUBLIC_ROUTES.includes(pathname)) {
    // 로그인된 사용자가 로그인 페이지에 접근하면 홈으로 리다이렉트
    if (pathname === "/login" && isAuth) {
      console.log("🔄 로그인된 사용자 - 홈으로 리다이렉트");
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // 3. 보호된 라우트 체크
  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    if (!isAuth) {
      console.log("🚫 인증 필요 - 로그인 페이지로 리다이렉트");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  console.log("✅ 라우트 접근 허용");
  return NextResponse.next();
}

/**
 * 미들웨어가 실행될 경로 설정
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
