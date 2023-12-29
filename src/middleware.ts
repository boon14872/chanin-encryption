import { checkEmailAndPassword, verifyJwtToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // get the cookie value
  const cookie = request.cookies.get("jwt")?.value;
  const redirectUrl = new URL("/", request.url);
  if (!cookie ) {
    if (new URL(request.url).pathname === "/") {
      return NextResponse.next();
    }
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
  if (new URL(request.url).pathname === "/") {
    return NextResponse.redirect(new URL("/encrypt", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/encrypt", "/decrypt", "/"],
};
