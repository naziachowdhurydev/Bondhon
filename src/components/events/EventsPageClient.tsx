"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import EventCard from "./EventCard";
import type { Event } from "@/types/event";
import { authClient } from "@/lib/auth-client";

interface EventsPageClientProps {
  events: Event[];
}

const eventTypes = [
  "All",
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Food Distribution",
  "Health Camp",
];

const EventsPageClient = ({ events }: EventsPageClientProps) => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        selectedType === "All" || event.eventType === selectedType;

      return matchesSearch && matchesType;
    });
  }, [events, search, selectedType]);

  return (
    <div>
      {/* Search and Filter */}
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm md:flex-row">
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />

          <input
            type="text"
            placeholder="Search by event name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal size={20} className="text-primary" />

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary sm:w-56"
          >
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type === "All" ? "All Event Types" : type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted">
          Showing{" "}
          <span className="font-bold text-primary">
            {filteredEvents.length}
          </span>{" "}
          events
        </p>
      </div>

      {/* Event Cards */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              isCreatedByUser={
                Boolean(user) &&
                (event.creator?.userId === user?.id ||
                  event.creator?.email?.toLowerCase() ===
                    user?.email.toLowerCase())
              }
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
          <h2 className="text-xl font-bold text-foreground">No events found</h2>

          <p className="mt-2 text-muted">
            Try another search term or select a different event category.
          </p>

          <button
            onClick={() => {
              setSearch("");
              setSelectedType("All");
            }}
            className="mt-5 rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-hover"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsPageClient;
