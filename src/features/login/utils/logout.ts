/**
 * 로그아웃 처리 함수
 */
export const logout = () => {
  // 1. is_auth 쿠키를 false로 설정
  document.cookie = "is_auth=false; path=/; max-age=900";

  // 2. localStorage 정리
  localStorage.clear();

  // 3. 로그인 페이지로 리다이렉트
  window.location.href = "/login";

  console.log("🚪 토큰 갱신 실패로 인한 로그아웃 처리 완료");
};
