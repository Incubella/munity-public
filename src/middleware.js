import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function middleware(req) {
  const ip = req.ip || req.headers.get("x-forwarded-for")?.split(",")[0];

  try {
    const response = await fetch(`${req.nextUrl.origin}/api/banned-ips`);
    const data = await response.json();
    // console.log(data);
    if (data.bannedIPs.includes(ip)) {
      return NextResponse.json(
        { message: "Your IP address is banned." },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error("Error checking banned IPs:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
  // const url = req.nextUrl.clone();

  // // Handle requests to munity.ai
  // if (url.hostname === "www.munity.ai") {
  //   if (url.pathname === "/") {
  //     // If it's the landing page, allow it to proceed
  //     return NextResponse.next();
  //   } else {
  //     // Redirect any other path on munity.ai to app.munity.ai with the same path
  //     url.hostname = "app.munity.ai";
  //     return NextResponse.redirect(url);
  //   }
  // }
  // // Check if the hostname is 'app.munity.ai' and pathname is '/'
  // if (url.hostname === "app.munity.ai" && url.pathname === "/") {
  //   // Rewrite to /main
  //   url.pathname = "/main";
  //   return NextResponse.rewrite(url);
  // }

  // Continue with the request if the IP is not banned
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/api/:path*", "/(.*)"], // Apply this middleware to all routes and API routes
};
