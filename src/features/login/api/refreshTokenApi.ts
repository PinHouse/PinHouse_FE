/**
 * Refresh Token으로 Access Token 발급받기
 */
export const refreshAccessToken = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth`, {
    method: "PUT",
    credentials: "include", // refresh_token 쿠키 자동 전송
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
