"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  UserRound,
  LogOut,
  CalendarDays,
  ChevronDown,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/events" },
  { name: "About Us", href: "/about" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending, error } = authClient.useSession();

  const user = session?.user;

  console.log("Navbar session:", session);
  console.log("Navbar user:", user);
  console.log("Session error:", error);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully!");
      setIsProfileOpen(false);
      setIsMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Unable to log out. Please try again.");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <CalendarDays size={23} />
          </div>

          <span className="text-2xl font-bold tracking-tight text-foreground">
            Bond<span className="text-primary">hon</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === link.href
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-accent-light text-primary"
                    : "text-muted hover:bg-muted-background hover:text-primary"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute right-1/2 -bottom-1 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-muted-background" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 rounded-full border border-border px-3 py-2 transition hover:bg-muted-background"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-light text-primary">
                    <UserRound size={18} />
                  </div>
                )}

                <span className="max-w-28 truncate text-sm font-semibold text-foreground">
                  {user.name}
                </span>

                <ChevronDown size={16} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-52 rounded-xl border border-border bg-card p-2 shadow-lg">
                  <Link
                    href="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-foreground hover:bg-muted-background"
                  >
                    <UserRound size={17} />
                    My Profile
                  </Link>

                  <Link
                    href="/joined-events"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-foreground hover:bg-muted-background"
                  >
                    <CalendarDays size={17} />
                    Joined Events
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-error hover:bg-muted-background"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-foreground transition hover:text-primary"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-foreground hover:bg-muted-background lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-border bg-card px-4 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === link.href
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-xl border-l-4 px-3 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "border-primary bg-accent-light text-primary"
                      : "border-transparent text-foreground hover:bg-muted-background hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="my-2 border-t border-border" />

            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm font-semibold text-foreground">
                Appearance
              </span>
              <ThemeToggle />
            </div>

            {isPending ? (
              <p className="px-3 py-2 text-sm text-muted">Loading...</p>
            ) : user ? (
              <>
                <div className="flex flex-col items-center gap-2 rounded-xl bg-muted-background px-4 py-5">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full border-2 border-primary object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-accent-light text-primary">
                      <UserRound size={28} />
                    </div>
                  )}

                  <div className="min-w-0 text-center">
                    <p className="truncate text-base font-semibold text-foreground">
                      {user.name}
                    </p>
                    <p className="truncate text-sm text-muted">{user.email}</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-foreground hover:bg-muted-background"
                >
                  My Profile
                </Link>

                <Link
                  href="/joined-events"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-foreground hover:bg-muted-background"
                >
                  Joined Events
                </Link>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg border border-border px-4 py-3 text-center text-sm font-semibold text-foreground"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-white hover:bg-primary-hover"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
