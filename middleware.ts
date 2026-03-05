import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 인증 없이 접근 가능한 라우트 목록
const PUBLIC_ROUTES = ["/", "/login", "/signup", "/onboarding"];

/**
 * 공개 라우트 판별
 * - "/"는 startsWith("/")가 모든 경로에 true가 되므로 별도 처리
 * - 나머지는 정확히 일치하거나 하위 경로까지 허용
 */
function isPublicPath(pathname: string) {
  if (pathname === "/") return true;

  return PUBLIC_ROUTES.filter(route => route !== "/").some(
    route => pathname === route || pathname.startsWith(`${route}/`)
  );
}

/**
 * 인증 상태 판별
 * - access_token: 서버 API 인증에 사용되는 토큰
 * - is_auth=true: 클라이언트 인증 체크 훅이 세팅하는 보조 플래그
 */
function isAuthenticated(request: NextRequest): boolean {
  const accessToken = request.cookies.get("access_token")?.value;
  const isAuth = request.cookies.get("is_auth")?.value === "true";

  return Boolean(accessToken || isAuth);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuth = isAuthenticated(request);

  // OAuth 콜백(/signup?state=...)은 인증 여부와 무관하게 통과
  // (소셜 로그인 리다이렉트 흐름 보장)
  if (pathname.startsWith("/signup") && request.nextUrl.searchParams.get("state")) {
    return NextResponse.next();
  }

  // 공개 라우트는 항상 허용
  if (isPublicPath(pathname)) {
    // 로그인 페이지는 인증 상태면 홈으로 보내 중복 로그인 진입 방지
    if (pathname === "/login" && isAuth) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.next();
  }

  // 보호 라우트는 미인증 시 로그인으로 리다이렉트
  if (!isAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 인증된 요청은 정상 통과
  return NextResponse.next();
}

export const config = {
  matcher: [
    // 정적 리소스와 API 경로를 제외한 페이지 요청만 미들웨어 적용
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.ico|.*\\.webp|.*\\.woff|.*\\.woff2|.*\\.ttf|.*\\.eot|.*\\.css|.*\\.js|.*\\.map).*)",
  ],
};
