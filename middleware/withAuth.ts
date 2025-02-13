"use server";
import axios from "axios";
import { cookies } from "next/headers";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import Cookies from "js-cookie";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default function withAuth(
  middleware: NextMiddleware,
  requireCheck: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    const cookiess = await cookies();
    const authToken: RequestCookie | undefined = cookiess.get("auth");
    if (requireCheck.includes(pathname)) {
      if (authToken) {
        const token = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/auth/me`,
          {
            headers: {
              Authorization: authToken.value,
            },
          }
        );
        if (token.status === 401) {
          const url = new URL(pathname, req.url);
          cookiess.delete("auth");
          url.searchParams.set("callbackUrl", encodeURI(req.url));
          return NextResponse.redirect(url);
        }
      } else {
        const url = new URL("/", req.url);
        cookiess.delete("auth");
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }
    }else{
      if (authToken) {
        const token = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/auth/me`,
          {
            headers: {
              Authorization: authToken.value,
            },
          }
        );
        if (token.status === 401) {
          const url = new URL(pathname, req.url);
          cookiess.delete("auth");
          url.searchParams.set("callbackUrl", encodeURI(req.url));
          return NextResponse.redirect(url);
        }
      }
    }
    return middleware(req, next);
  };
}
