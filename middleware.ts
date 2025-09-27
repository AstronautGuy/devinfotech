import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();

    if (!data?.claims || data.claims.app_metadata?.role !== "ADMIN") {
      // Not logged in or not admin → show 404
      return NextResponse.rewrite(new URL("/404", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // protects all /admin/* routes
};
