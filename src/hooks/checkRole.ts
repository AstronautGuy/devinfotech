"use client";

import React from "react";
import { createClient } from "@/lib/supabase/client";

export function useCheckRole() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkRole = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.getClaims();

      if (error || !data?.claims?.app_metadata?.role) {
        setIsLoggedIn(false);
        setIsAdmin(false);
      } else {
        const role = data.claims.app_metadata.role;
        setIsLoggedIn(role === "user" || role === "admin");
        setIsAdmin(role === "admin");
      }
      setLoading(false);
    };

    checkRole();
  }, []);

  return { isLoggedIn, isAdmin, loading };
}
