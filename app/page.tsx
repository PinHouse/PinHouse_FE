import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const isAuth = cookieStore.get("is_auth")?.value === "true";

  redirect(accessToken || isAuth ? "/home" : "/login");
}
