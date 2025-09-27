"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TextScramble } from "@/components/TextScramble";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

const menuItems = [
  { name: "Services", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "About", href: "/" },
  { name: "Contact Us", href: "/contact" },
];

const Header = () => {
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- Initialize user on mount ---
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;

      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
      setLoading(false);
    };

    fetchUser();

    // Listen for auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        setIsLoggedIn(!!currentUser);
      },
    );
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.push("/auth/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isContactPage = pathname === "/contact";

  return (
    <main>
      <nav
        className="fixed z-20 w-full px-2 group"
        data-state={menuState && "active"}
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5",
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Logo />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="group-data-[state=active]:rotate-180 m-auto size-6 duration-200" />
                <X className="absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100" />
              </button>
            </div>

            {/* Desktop menu */}
            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={`text-muted-foreground block duration-150 ${
                        isContactPage
                          ? "hover:text-white"
                          : "hover:text-accent-foreground"
                      }`}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                {/* Login / Dashboard / Admin */}
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className={cn(isScrolled && "lg:hidden")}
                >
                  {loading ? (
                    <span>Loading...</span>
                  ) : (
                    <Link href={isLoggedIn ? "/dashboard" : "/auth/login"}>
                      <span className="text-foreground">
                        {isLoggedIn ? "Dashboard" : "Login"}
                      </span>
                    </Link>
                  )}
                </Button>

                {/* Sign Up / Logout */}
                <Button
                  asChild
                  size="sm"
                  className={cn(isScrolled && "lg:hidden")}
                >
                  {loading ? (
                    <span>...</span>
                  ) : isLoggedIn ? (
                    <button onClick={handleLogout}>Logout</button>
                  ) : (
                    <Link href="/auth/sign-up">
                      <span>Sign Up</span>
                    </Link>
                  )}
                </Button>

                {/* Get Started / Dashboard / Admin */}
                <Button
                  asChild
                  size="sm"
                  className={cn(isScrolled ? "lg:inline-flex" : "hidden")}
                >
                  {loading ? (
                    <span>...</span>
                  ) : (
                    <Link href={isLoggedIn ? "/dashboard" : "/auth/sign-up"}>
                      <span>{isLoggedIn ? "Dashboard" : "Get Started"}</span>
                    </Link>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </main>
  );
};

const Logo = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";

  return (
    <TextScramble className={`text-2xl ${isContactPage ? "text-white" : ""}`}>
      devinfotech
    </TextScramble>
  );
};

export default Header;
