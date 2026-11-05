import { connection } from "next/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import { api } from "@/lib/api";
import type { Event } from "@/types/event";
import EventsPageClient from "@/components/events/EventsPageClient";

export const instant = false;

const EventsPage = async () => {
  await connection();

  let events: Event[] = [];
  let error = false;

  try {
    const result = await api.getUpcomingEvents();
    events = result.data ?? [];
  } catch (err) {
    console.error("Failed to fetch events:", err);
    error = true;
  }

  return (
    <section className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <span className="inline-block rounded-full bg-accent-light px-4 py-2 text-sm font-semibold text-primary">
              Make a Difference
            </span>

            <h1 className="mt-5 text-3xl font-bold text-foreground sm:text-4xl">
              Upcoming Community Events
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-muted sm:mx-0">
              Discover meaningful events, connect with your community, and take
              part in creating positive change.
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-hover"
          >
            <Plus size={19} />
            Create Event
          </Link>
        </div>

        {error ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              Unable to load events
            </h2>
            <p className="mt-2 text-muted">
              Please check your server connection and try again.
            </p>
          </div>
        ) : (
          <EventsPageClient events={events} />
        )}
      </div>
    </section>
  );
};

export default EventsPage;
