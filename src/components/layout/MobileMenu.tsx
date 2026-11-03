"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CalendarDays,
  HeartHandshake,
  Info,
  LogIn,
  Mail,
  Menu,
  UserPlus,
  UsersRound,
  X,
} from "lucide-react";

const mobileNavItems = [
  {
    label: "Home",
    href: "/",
    icon: HeartHandshake,
  },
  {
    label: "Upcoming Events",
    href: "/events",
    icon: CalendarDays,
  },
  {
    label: "Community",
    href: "/community",
    icon: UsersRound,
  },
  {
    label: "About Us",
    href: "/about",
    icon: Info,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Mail,
  },
];

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-(--border) text-(--foreground) transition-colors duration-200 hover:border-(--primary) hover:bg-(--accent-light) hover:text-(--primary)"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={closeMenu}
        >
          {/* Mobile Panel */}
          <aside
            className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-(--background) shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-(--border) px-5 py-4">
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center gap-2"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--primary) text-white">
                  <HeartHandshake size={19} />
                </span>

                <span className="text-lg font-bold text-(--foreground)">
                  Bondhon
                </span>
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close navigation menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-(--muted) transition-colors hover:bg-(--accent-light) hover:text-(--primary)"
              >
                <X size={21} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-(--muted)">
                Explore Bondhon
              </p>

              <div className="space-y-1">
                {mobileNavItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-(--foreground) transition-all duration-200 hover:bg-(--accent-light) hover:pl-4 hover:text-(--primary)"
                    >
                      <Icon size={19} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Authentication Actions */}
            <div className="border-t border-(--border) p-4">
              <div className="grid gap-2">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-xl border border-(--border) px-4 py-3 text-sm font-semibold text-(--foreground) transition-colors duration-200 hover:border-(--primary) hover:bg-(--accent-light) hover:text-(--primary)"
                >
                  <LogIn size={17} />
                  Log In
                </Link>

                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-xl bg-(--primary) px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-(--primary-hover) hover:shadow-md"
                >
                  <UserPlus size={17} />
                  Create Account
                </Link>
              </div>

              <p className="mt-4 text-center text-xs leading-5 text-(--muted)">
                Join Bondhon and take part in meaningful community activities.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
