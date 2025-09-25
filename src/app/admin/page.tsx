import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {HeroSection} from "@/components/HeroSection";
import {WelcomeSection} from "@/components/WelcomeSection";
import {CompanyStats} from "@/components/Stats";

export default async function AdminPage() {
    const supabase = await createClient();

    // Get JWT claims (includes app_metadata)
    const { data, error } = await supabase.auth.getClaims();

    // If not logged in or claims missing → show 404
    if (error || !data?.claims) {
        notFound();
    }

    // Get custom role from app_metadata
    const role = data.claims.app_metadata?.role ?? "";

    console.log("role:", role);

    // If not admin → show 404
    if (role !== "ADMIN") {
        notFound();
    }

    // ✅ Only accessible by admin
    return (
        <main>
        </main>
    );
}
