import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (req.nextUrl.pathname == "/api/auth/signin") {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  } else if (token) {
    // Signed in
    // console.log("JSON Web Token", JSON.stringify(token, null, 2))
  } else {
    // Not signed in: Redirect to signing page
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
  // Continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin", "/api/protected/:path*", "/api/auth/signin"],
};
