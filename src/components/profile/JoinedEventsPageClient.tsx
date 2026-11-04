"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  LoaderCircle,
  MapPin,
  Trash2,
  UsersRound,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authApi } from "@/lib/auth-api";
import type { Event } from "@/types/event";

const JoinedEventsPageClient = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user.id;
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [leavingEventId, setLeavingEventId] = useState<string | null>(null);

  const handleLeaveEvent = async (eventId: string) => {
    try {
      setLeavingEventId(eventId);
      await authApi.leaveEvent(eventId);
      setEvents((currentEvents) =>
        currentEvents.filter((event) => event._id !== eventId),
      );
      toast.success("You have left this event.");
    } catch (leaveError) {
      console.error("Failed to leave event:", leaveError);
      toast.error(
        leaveError instanceof Error
          ? leaveError.message
          : "Unable to leave this event. Please try again.",
      );
    } finally {
      setLeavingEventId(null);
    }
  };

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (!userId) {
      router.replace("/login");
      return;
    }

    let isActive = true;

    const loadJoinedEvents = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await authApi.getJoinedEvents();
        if (!Array.isArray(result.data)) {
          throw new Error(result.message || "Unable to load joined events.");
        }

        if (isActive) {
          setEvents(result.data);
        }
      } catch (loadError) {
        console.error("Failed to load joined events:", loadError);
        if (isActive) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load joined events. Please try again.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadJoinedEvents();

    return () => {
      isActive = false;
    };
  }, [isPending, retryCount, router, userId]);

  if (isPending || !session?.user) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-background px-4">
        <div className="flex items-center gap-3 text-sm font-medium text-muted">
          <LoaderCircle size={20} className="animate-spin text-primary" />
          {isPending ? "Checking your account..." : "Redirecting to sign in..."}
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[75vh] bg-background px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div>
          <p className="text-sm font-bold tracking-widest text-primary uppercase">
            Your community activity
          </p>
          <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
            Joined Events
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted">
            Events you&apos;ve signed up for and the details you need to take
            part.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl border border-border bg-card p-10 text-sm text-muted">
            <LoaderCircle size={20} className="animate-spin text-primary" />
            Loading your events...
          </div>
        ) : error ? (
          <div
            role="alert"
            className="mt-8 rounded-2xl border border-error/30 bg-card p-6 text-center sm:p-10"
          >
            <h2 className="text-lg font-semibold text-foreground">
              Unable to load your events
            </h2>
            <p className="mt-2 text-sm text-muted">{error}</p>
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-5 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              Try again
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-border bg-card px-6 py-12 text-center sm:px-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-light text-primary">
              <UsersRound size={24} />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-foreground">
              No joined events yet
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Explore upcoming events and join an activity that matters to you.
            </p>
            <Link
              href="/events"
              className="mt-5 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              Explore events
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {events.map((event) => {
              const eventDate = new Date(event.eventDate);
              const formattedDate = Number.isNaN(eventDate.getTime())
                ? "Date to be announced"
                : eventDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  });

              return (
                <article
                  key={event._id}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <span className="inline-flex rounded-full bg-accent-light px-3 py-1 text-xs font-semibold text-primary">
                        {event.eventType}
                      </span>
                      <h2 className="mt-3 text-xl font-bold text-foreground">
                        {event.title}
                      </h2>
                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-muted">
                        {event.description}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                      <Link
                        href={`/events/${event._id}`}
                        className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
                      >
                        Event details
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleLeaveEvent(event._id)}
                        disabled={leavingEventId === event._id}
                        aria-label={`Remove ${event.title} from your joined events`}
                        title="Remove from joined events"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-error/30 px-4 py-2 text-sm font-semibold text-error transition hover:bg-error/10 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {leavingEventId === event._id ? (
                          <LoaderCircle size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                        {leavingEventId === event._id ? "Removing..." : "Remove"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 text-sm text-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays size={17} className="shrink-0 text-primary" />
                      {formattedDate}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={17} className="shrink-0 text-secondary" />
                      {event.location}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default JoinedEventsPageClient;
