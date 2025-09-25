import { redirect } from "next/navigation";
import { createClient } from "@/lib/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    console.log("role:", undefined);
    redirect("/auth/login");
  }

  // ✅ prefer app_metadata.role (your custom role) over default
  const role = data?.claims?.app_metadata?.role ?? "undefined";

  console.log("role:", role);

  return (
    <div className="flex-1 w-full flex flex-col gap-12 items-center justify-center text-2xl">
      <p>Role: {role}</p>
    </div>
  );
}
