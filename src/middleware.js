import { NextResponse } from "next/server";
import { getAutenticatedhUser } from "./lib/getAuthUser";
import { redirect } from "next/navigation";

const protectedRoutes=["/dashboard","posts/create"]
const publicRoutes=["/login","/regsiter"]
export default async function middleware(req){
        const path=req.nextUrl.pathname;
        const isProtectedRoute=protectedRoutes.includes(path) || path.startsWith("/posts/edit/");
        const isPublicRoute=publicRoutes.includes(path);
        const user=await getAutenticatedhUser();
        console.log("user",user)
        const userId=user?.userId;

        if(isProtectedRoute && !userId){
                return NextResponse.redirect(new URL("/login",req.nextUrl))
        }
        if(isPublicRoute && userId){
                return NextResponse.redirect(new URL("/dashbord",req.nextUrl))
        }
        NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}