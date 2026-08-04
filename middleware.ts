// middleware.ts — project root
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    "/admin/:path*",
    "/meetings/new",
    "/meetings/:id/edit",
  ],
};