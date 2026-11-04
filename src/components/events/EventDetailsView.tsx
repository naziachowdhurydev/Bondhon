"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Users,
  UserRound,
  Tag,
} from "lucide-react";
import type { Event } from "@/types/event";
import JoinEventButton from "./JoinEventButton";
import Image from "next/image";

interface EventDetailsViewProps {
  event: Event;
}

const EventDetailsView = ({ event }: EventDetailsViewProps) => {
  const participantCount = event.participants?.length || 0;

  // Format the event date
  const eventDate = new Date(event.eventDate);

  // Check whether the event has passed
  const [currentTime, setCurrentTime] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCurrentTime(Date.now());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const isPastEvent =
    currentTime !== null &&
    (!event.eventDate ||
      Number.isNaN(eventDate.getTime()) ||
      eventDate.getTime() < currentTime);

  return (
    <main className="min-h-screen bg-background pb-16">
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-primary"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        {/* Hero Image */}
        <div className="relative mt-7 h-75 overflow-hidden rounded-3xl sm:h-107.5">
          <Image
            src={event.thumbnail}
            alt={event.title}
            className="h-full w-full object-cover"
            width={800}
            height={400}
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

          <div className="absolute bottom-7 left-6 right-6 sm:left-10">
            <span className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
              {event.eventType}
            </span>

            <h1 className="mt-5 max-w-3xl text-3xl font-bold text-white sm:text-5xl">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Event Information */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
          <section>
            <h2 className="text-2xl font-bold text-foreground">
              About This Event
            </h2>

            <p className="mt-5 whitespace-pre-line leading-8 text-muted">
              {event.description}
            </p>

            {/* Organizer */}
            <div className="mt-10 rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold text-foreground">
                Organized By
              </h2>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-light text-primary">
                  <UserRound size={26} />
                </div>

                <div>
                  <p className="font-semibold text-foreground">
                    {event.creator?.name || "Community Organizer"}
                  </p>
                  <p className="text-sm text-muted">
                    {event.creator?.email || ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold text-foreground">
                Event Participants
              </h2>

              <p className="mt-2 text-sm text-muted">
                {participantCount} people have joined this event.
              </p>

              {participantCount > 0 ? (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {event.participants.slice(0, 8).map((person, index) => (
                    <div
                      key={person.userId || person.email || index}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted-background text-muted">
                        <UserRound size={18} />
                      </div>

                      <span className="text-sm font-medium text-foreground">
                        {person.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-sm text-muted">
                  No participants yet. Be the first to join!
                </p>
              )}
            </div>
          </section>

          {/* Event Summary Card */}
          <aside>
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground">
                Event Information
              </h2>

              <div className="mt-6 space-y-6">
                <div className="flex gap-3">
                  <CalendarDays className="shrink-0 text-primary" />
                  <div>
                    <p className="text-xs text-muted">Date</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {Number.isNaN(eventDate.getTime())
                        ? "Date unavailable"
                        : eventDate.toLocaleString("en-US", {
                            dateStyle: "long",
                            timeStyle: "short",
                          })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <MapPin className="shrink-0 text-primary" />
                  <div>
                    <p className="text-xs text-muted">Location</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Tag className="shrink-0 text-primary" />
                  <div>
                    <p className="text-xs text-muted">Category</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {event.eventType}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Users className="shrink-0 text-primary" />
                  <div>
                    <p className="text-xs text-muted">Participants</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {participantCount} people
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <JoinEventButton
                  eventId={event._id}
                  creatorId={event.creator?.userId || ""}
                  participantIds={event.participants
                    .map((person) => person.userId)
                    .filter((id): id is string => Boolean(id))}
                  isPastEvent={isPastEvent}
                />
              </div>

              <p className="mt-4 text-center text-xs text-muted">
                Join this event to take part in making a difference.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default EventDetailsView;
