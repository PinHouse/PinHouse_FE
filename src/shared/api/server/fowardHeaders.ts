// src/shared/server/forwardHeaders.ts
import "server-only";
import { headers } from "next/headers";

export async function getBffRequestContext() {
  const h = await headers();

  const cookie = h.get("cookie");
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";

  if (!host) throw new Error("Missing host header");

  const baseUrl = `${proto}://${host}`;

  const forwardedHeaders = new Headers();
  if (cookie) forwardedHeaders.set("cookie", cookie);

  const xff = h.get("x-forwarded-for");
  const xri = h.get("x-real-ip");
  if (xff) forwardedHeaders.set("x-forwarded-for", xff);
  if (xri) forwardedHeaders.set("x-real-ip", xri);

  return { baseUrl, forwardedHeaders };
}
