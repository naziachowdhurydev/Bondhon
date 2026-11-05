"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  UserRound,
  LogOut,
  CalendarDays,
  HeartHandshake,
  ChevronDown,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { authApi } from "@/lib/auth-api";
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
  const [hasCreatedEvents, setHasCreatedEvents] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending, error } = authClient.useSession();

  const user = session?.user;

  // Check whether the logged-in user has created any events
  useEffect(() => {
    if (!user) return;

    let isActive = true;

    const checkCreatedEvents = async () => {
      try {
        const result = await authApi.getMyEvents();

        if (isActive) {
          setHasCreatedEvents(result.success && result.data.length > 0);
        }
      } catch (error) {
        console.error("Failed to check created events:", error);

        if (isActive) {
          setHasCreatedEvents(false);
        }
      }
    };

    checkCreatedEvents();

    return () => {
      isActive = false;
    };
  }, [user?.id, pathname]);

  // Show My Events only when the user has created an event
  const displayedNavLinks = hasCreatedEvents
    ? [...navLinks, { name: "My Events", href: "/my-events" }]
    : navLinks;

  // Close profile dropdown when clicking outside
  useEffect(() => {
    if (!isProfileOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !profileMenuRef.current?.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsProfileOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileOpen]);

  console.log("Navbar session:", session);
  console.log("Navbar user:", user);
  console.log("Session error:", error);

  // Logout
  const handleLogout = async () => {
    try {
      await authClient.signOut();

      setHasCreatedEvents(false);

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
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white sm:h-10 sm:w-10">
            <HeartHandshake size={23} strokeWidth={2.2} aria-hidden="true" />
          </div>

          <span className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Bond<span className="text-primary">hon</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-3 min-[900px]:flex xl:gap-5">
          {displayedNavLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === link.href
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative rounded-full px-3 py-2 text-[13px] font-semibold transition-colors xl:px-4 xl:text-sm ${
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
        <div className="hidden items-center gap-2 min-[900px]:flex xl:gap-3">
          <ThemeToggle />

          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-muted-background" />
          ) : user ? (
            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-expanded={isProfileOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-full border border-border px-3 py-2 transition hover:bg-muted-background"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={32}
                    height={32}
                    className="h-7 w-7 rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-light text-primary">
                    <UserRound size={16} />
                  </div>
                )}

                <span className="max-w-28 truncate text-sm font-semibold text-foreground">
                  {user.name}
                </span>

                <ChevronDown size={16} />
              </button>

              {isProfileOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-3 w-52 rounded-xl border border-border bg-card p-2 shadow-lg"
                >
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
                className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition hover:text-primary"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-muted-background min-[900px]:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-border bg-card px-4 py-5 min-[900px]:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {displayedNavLinks.map((link) => {
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
