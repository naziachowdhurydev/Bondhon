"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  HeartHandshake,
  House,
  MapPin,
  Sparkles,
  Sprout,
} from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    document.body.classList.add("bondhon-not-found-active");

    return () => {
      document.body.classList.remove("bondhon-not-found-active");
    };
  }, []);

  return (
    <section
      id="bondhon-not-found"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-background px-4 py-12 text-foreground sm:px-6 sm:py-16"
    >
      <style>{`
        body.bondhon-not-found-active > header,
        body.bondhon-not-found-active > footer {
          display: none !important;
        }

        @keyframes bondhon-404-enter {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bondhon-404-float {
          0%, 100% { transform: translateY(0) rotate(-7deg); }
          50% { transform: translateY(-12px) rotate(4deg); }
        }
        @keyframes bondhon-404-drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(8px, -10px); }
        }
        @keyframes bondhon-404-orbit {
          from { transform: rotate(0deg) translateX(102px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(102px) rotate(-360deg); }
        }
        @keyframes bondhon-404-pulse {
          0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--secondary) 18%, transparent); }
          50% { box-shadow: 0 0 0 18px color-mix(in srgb, var(--secondary) 0%, transparent); }
        }

        @media (prefers-reduced-motion: no-preference) {
          #bondhon-not-found .bondhon-404-enter {
            animation: bondhon-404-enter 700ms cubic-bezier(.2,.8,.2,1) both;
          }
          #bondhon-not-found .bondhon-404-delay-1 { animation-delay: 100ms; }
          #bondhon-not-found .bondhon-404-delay-2 { animation-delay: 200ms; }
          #bondhon-not-found .bondhon-404-delay-3 { animation-delay: 300ms; }
          #bondhon-not-found .bondhon-404-float { animation: bondhon-404-float 4s ease-in-out infinite; }
          #bondhon-not-found .bondhon-404-drift { animation: bondhon-404-drift 6s ease-in-out infinite; }
          #bondhon-not-found .bondhon-404-orbit { animation: bondhon-404-orbit 18s linear infinite; }
          #bondhon-not-found .bondhon-404-pulse { animation: bondhon-404-pulse 3s ease-in-out infinite; }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-0 -z-10 h-80 w-80 rounded-full bg-accent-light blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-20 -z-10 h-96 w-96 rounded-full bg-muted-background blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1fr_0.9fr] md:gap-16">
        <section className="bondhon-404-enter">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary shadow-sm">
            <MapPin size={16} aria-hidden="true" />A little off the map
          </div>

          <p className="bondhon-404-enter bondhon-404-delay-1 mt-7 text-7xl font-black leading-none tracking-tight text-primary sm:text-8xl">
            404
          </p>
          <h1 className="bondhon-404-enter bondhon-404-delay-2 mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Looks like this path ends here.
          </h1>
          <p className="bondhon-404-enter bondhon-404-delay-2 mt-4 max-w-xl leading-7 text-muted">
            The page you&apos;re looking for may have moved or no longer exists.
            Let&apos;s get you back to the people and causes that bring us
            together.
          </p>

          <div className="bondhon-404-enter bondhon-404-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              replace
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <House size={18} aria-hidden="true" />
              Back to home
            </Link>
          </div>
        </section>

        <div
          role="img"
          aria-label="A gently animated community garden with a path leading back to Bondhon"
          className="bondhon-404-enter bondhon-404-delay-2 relative mx-auto flex aspect-square w-full max-w-100 items-center justify-center"
        >
          <div className="absolute inset-2 rounded-full border border-dashed border-border/80 sm:inset-5" />
          <div className="absolute inset-9 rounded-full border border-border/60 sm:inset-12" />

          <div
            aria-hidden="true"
            className="bondhon-404-orbit absolute left-1/2 top-1/2 z-10 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-primary text-white shadow-lg"
          >
            <Heart size={17} fill="currentColor" />
          </div>

          <div className="bondhon-404-pulse relative flex h-40 w-40 items-center justify-center rounded-full border border-secondary/20 bg-card shadow-xl shadow-secondary/10 sm:h-52 sm:w-52">
            <div
              aria-hidden="true"
              className="absolute inset-3 rounded-full border border-dashed border-secondary/40"
            />
            <div className="bondhon-404-drift flex h-28 w-28 items-center justify-center rounded-full bg-secondary/10 text-secondary sm:h-36 sm:w-36">
              <MapPin size={72} strokeWidth={1.3} aria-hidden="true" />
            </div>
            <span className="absolute -right-2 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-light text-primary shadow-md">
              <HeartHandshake size={25} aria-hidden="true" />
            </span>
          </div>

          <span
            aria-hidden="true"
            className="bondhon-404-float absolute left-[12%] top-[17%] flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card text-secondary shadow-lg"
          >
            <Sprout size={28} />
          </span>
          <span
            aria-hidden="true"
            className="bondhon-404-float absolute bottom-[18%] right-[10%] flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card text-primary shadow-lg [animation-delay:500ms]"
          >
            <Sparkles size={23} />
          </span>
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted shadow-sm">
            Find your way back to community
          </span>
        </div>
      </div>
    </section>
  );
}
