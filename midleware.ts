import { checkEmailAndPassword, verifyJwtToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // get the cookie value
  const cookie = request.cookies.get("jwt");
  const redirectUrl = new URL("/", request.url);
  if (!cookie) {
    // return a 401 if the cookie is missing
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
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/encrypt",
};
