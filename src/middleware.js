import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const token = request.cookies.get("token")?.value;
    if(request.nextUrl.pathname.startsWith("/dashboard")&& !token){
        const response=NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("token");
        return response;
    }
    if(request.nextUrl.pathname.startsWith("/sales")&& !token){
        const response=NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("token");
        return response;
    }
    if(token && request.nextUrl.pathname.startsWith("/login")){
        const response=NextResponse.redirect(new URL("/dashboard",request.url));
        return response;
    }
}

// matcher son las rutas sobra el cual va actuar el middleware
export const config = {
  matcher: ["/dashboard/:path*","/sales/:path*"],
};
