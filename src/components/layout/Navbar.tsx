import Link from "next/link";
import { HeartHandshake, LogIn, UserPlus } from "lucide-react";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Upcoming Events",
    href: "/events",
  },
  {
    label: "Community",
    href: "/community",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const navLinkClass =
  "whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium text-(--foreground) transition-all duration-200 hover:bg-(--accent-light) hover:text-(--primary) sm:px-3.5 sm:text-sm";

const NavLinks = () => {
  return (
    <>
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className={navLinkClass}>
          {item.label}
        </Link>
      ))}
    </>
  );
};

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-(--border) bg-(--background)/95 backdrop-blur-md">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between gap-4 lg:h-18">
          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--primary) text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
              <HeartHandshake size={22} strokeWidth={2.2} />
            </span>

            <div className="leading-none">
              <span className="text-xl font-extrabold tracking-tight text-(--foreground)">
                Bondhon
              </span>

              <span className="mt-1 hidden text-[10px] font-medium tracking-widest text-(--muted) sm:block">
                CONNECT • SERVE • GROW
              </span>
            </div>
          </Link>

          {/* Desktop Navigation — centered */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex">
            <NavLinks />
          </nav>

          {/* Authentication Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/login"
              aria-label="Log In"
              className="inline-flex items-center gap-2 rounded-lg px-2.5 py-2.5 text-sm font-semibold text-(--foreground) transition-all duration-200 hover:bg-(--accent-light) hover:text-(--primary) sm:px-4"
            >
              <LogIn size={17} />
              <span className="hidden sm:inline">Log In</span>
            </Link>

            <Link
              href="/signup"
              aria-label="Create Account"
              className="inline-flex items-center gap-2 rounded-lg bg-(--primary) px-2.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--primary-hover) hover:shadow-md sm:px-4"
            >
              <UserPlus size={17} />
              <span className="hidden sm:inline">Create Account</span>
            </Link>
          </div>
        </div>

        {/* Small Screen Navigation — centered below the logo */}
        <nav className="flex overflow-x-auto pb-2 scrollbar-none lg:hidden [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto flex w-max shrink-0 items-center gap-0.5">
            <NavLinks />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
