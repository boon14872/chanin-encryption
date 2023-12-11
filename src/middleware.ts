import { checkEmailAndPassword, verifyJwtToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // get the cookie value
  const cookie = request.cookies.get("jwt")?.value;
  const redirectUrl = new URL("/", request.url);
  if (!cookie) {
    return NextResponse.redirect(redirectUrl);
  }
  //   validate jwt token
  const payload = await verifyJwtToken(cookie);
  if (!payload) {
    return NextResponse.redirect(redirectUrl);
  }
  const { email, password } = payload;
  if (!checkEmailAndPassword(`${email}`, `${password}`)) {
    return NextResponse.redirect(redirectUrl);
  }

  // if have request url to / then redirect to /encrypt
  if (request.url === "/") {
    return NextResponse.redirect("/encrypt");
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/encrypt",
};
