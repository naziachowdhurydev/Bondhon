"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CircleAlert,
  Clock3,
  MapPin,
  Plus,
  RotateCw,
  Sparkles,
  Users,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { authApi } from "@/lib/auth-api";
import { Skeleton } from "@/components/ui/skeleton";
import type { Event } from "@/types/event";

const formatEventDate = (date: string) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date to be announced";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsedDate);
};

const MyEventCardSkeleton = () => (
  <div className="overflow-hidden rounded-3xl border border-border bg-card">
    <Skeleton className="h-48 w-full rounded-none" />
    <div className="space-y-4 p-5">
      <Skeleton className="h-5 w-24 rounded-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="border-t border-border pt-4">
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </div>
  </div>
);

const MyEventsPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user.id;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyEvents = useCallback(() => {
    if (!userId) return;

    void authApi
      .getMyEvents()
      .then((result) => {
        setEvents(result.data ?? []);
      })
      .catch((err: unknown) => {
        setError(
          err instanceof Error ? err.message : "Failed to load your events.",
        );
      })
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    if (isPending) return;

    if (!userId) {
      router.replace("/login?callbackURL=%2Fmy-events");
      return;
    }

    void fetchMyEvents();
  }, [fetchMyEvents, isPending, router, userId]);

  if (isPending || loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mb-8 space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-5 w-full max-w-lg" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <MyEventCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!userId) return null;

  const handleRetry = () => {
    setLoading(true);
    setError("");
    void fetchMyEvents();
  };

  const participantTotal = events.reduce(
    (total, event) =>
      total + (event.participantCount ?? event.participants?.length ?? 0),
    0,
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 right-1/4 h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent-light px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                <Sparkles size={14} />
                Your impact
              </span>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                My Events
              </h1>
              <p className="mt-2 text-sm leading-6 text-muted sm:text-base">
                Create and manage the community events you bring to life.
              </p>
            </div>

            <Link
              href="/create-event"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md"
            >
              <Plus size={18} />
              Create an Event
            </Link>
          </div>

          <div className="relative mt-7 grid max-w-xl grid-cols-2 gap-3 sm:gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/80 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-light text-primary">
                <CalendarDays size={19} />
              </span>
              <div>
                <p className="text-xl font-bold text-foreground">{events.length}</p>
                <p className="text-xs text-muted">Events created</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/80 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-light text-secondary">
                <Users size={19} />
              </span>
              <div>
                <p className="text-xl font-bold text-foreground">
                  {participantTotal}
                </p>
                <p className="text-xs text-muted">Community participants</p>
              </div>
            </div>
          </div>
        </section>

        {error ? (
          <section
            role="alert"
            className="rounded-2xl border border-error/30 bg-error/5 p-6 text-center sm:p-10"
          >
            <CircleAlert size={32} className="mx-auto text-error" />
            <h2 className="mt-3 text-lg font-bold text-foreground">
              We couldn&apos;t load your events
            </h2>
            <p className="mt-2 text-sm text-muted">{error}</p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              <RotateCw size={16} />
              Try again
            </button>
          </section>
        ) : events.length === 0 ? (
          <section className="rounded-3xl border border-dashed border-border bg-card px-6 py-14 text-center shadow-sm sm:py-20">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-light text-primary">
              <CalendarDays size={30} />
            </div>
            <h2 className="mt-5 text-xl font-bold text-foreground sm:text-2xl">
              Your first event starts here
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
              Bring people together around a cause. Your created events will
              appear here so you can keep track of them.
            </p>
            <Link
              href="/create-event"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              <Plus size={18} />
              Create your first event
            </Link>
          </section>
        ) : (
          <section>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Events you created
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Select an event to see its details or manage it.
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted">
                {events.length} {events.length === 1 ? "event" : "events"}
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => {
                const participantCount =
                  event.participantCount ?? event.participants?.length ?? 0;

                return (
                  <article
                    key={event._id}
                    className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                  >
                    <Link
                      href={`/events/${event._id}`}
                      aria-label={`View ${event.title}`}
                      className="block"
                    >
                      <div
                        role="img"
                        aria-label={event.title}
                        className="relative h-48 overflow-hidden bg-muted-background bg-cover bg-center"
                        style={
                          event.thumbnail
                            ? {
                                backgroundImage: `url("${event.thumbnail}")`,
                              }
                            : undefined
                        }
                      >
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                        <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-card/95 px-3 py-1.5 text-xs font-bold text-primary shadow-sm">
                          {event.eventType}
                        </span>
                        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                          <Users size={16} />
                          {participantCount} joined
                        </span>
                      </div>
                    </Link>

                    <div className="p-5">
                      <h3 className="line-clamp-1 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                        {event.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-muted">
                        {event.description}
                      </p>

                      <div className="mt-4 space-y-3 border-t border-border pt-4">
                        <p className="flex items-center gap-2 text-sm text-muted">
                          <CalendarDays
                            size={16}
                            className="shrink-0 text-primary"
                          />
                          {formatEventDate(event.eventDate)}
                        </p>
                        <p className="flex items-center gap-2 text-sm text-muted">
                          <MapPin
                            size={16}
                            className="shrink-0 text-secondary"
                          />
                          <span className="line-clamp-1">{event.location}</span>
                        </p>
                        <p className="flex items-center gap-2 text-sm text-muted">
                          <Clock3
                            size={16}
                            className="shrink-0 text-primary"
                          />
                          {Number.isNaN(new Date(event.eventDate).getTime())
                            ? "Time to be announced"
                            : new Date(event.eventDate).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  timeZone: "UTC",
                                },
                              )}
                        </p>
                      </div>

                      <div className="mt-5 grid grid-cols-[1fr_auto] gap-2 border-t border-border pt-4">
                        <Link
                          href={`/events/${event._id}`}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
                        >
                          View details
                          <ArrowUpRight size={16} />
                        </Link>
                        <Link
                          href="/manage-events"
                          aria-label={`Manage ${event.title}`}
                          title="Manage your events"
                          className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-3 text-foreground transition hover:border-secondary hover:bg-accent-light hover:text-secondary"
                        >
                          <ArrowRight size={18} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default MyEventsPage;
