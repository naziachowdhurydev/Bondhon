"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Clock3,
  HeartHandshake,
  MapPin,
  Pencil,
  Users,
  UserRound,
  Tag,
} from "lucide-react";
import type { Event, EventParticipant } from "@/types/event";
import JoinEventButton from "./JoinEventButton";
import { authClient } from "@/lib/auth-client";

interface EventDetailsViewProps {
  event: Event;
}

const EventDetailsView = ({ event }: EventDetailsViewProps) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const isCreatedByUser =
    Boolean(user) &&
    (event.creator?.userId === user?.id ||
      event.creator?.email?.toLowerCase() === user?.email.toLowerCase());
  const [updatedParticipants, setUpdatedParticipants] = useState<{
    eventId: string;
    participants: EventParticipant[];
  } | null>(null);
  const participants =
    updatedParticipants?.eventId === event._id
      ? updatedParticipants.participants
      : (event.participants ?? []);
  const participantCount = participants.length;
  const eventDate = new Date(event.eventDate);
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
    <main className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <Link
          href="/events"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted transition hover:border-primary/40 hover:text-primary"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          All events
        </Link>

        <section className="relative mt-6 isolate min-h-105 overflow-hidden rounded-[2rem] bg-muted-background sm:min-h-120">
          {event.thumbnail ? (
            <div
              role="img"
              aria-label={event.title}
              className="absolute inset-0 -z-20 bg-cover bg-center"
              style={{ backgroundImage: `url("${event.thumbnail}")` }}
            />
          ) : null}
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-background via-background/85 to-background/35" />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-background/70 via-transparent to-transparent" />

          <div className="flex min-h-105 flex-col justify-end p-6 sm:min-h-120 sm:p-12 lg:max-w-4xl">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2 text-sm font-semibold text-primary backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {event.eventType}
              </span>
              {isCreatedByUser && (
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white">
                  <BadgeCheck size={16} />
                  Created by you
                </span>
              )}
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Come be part of something good
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {event.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              {event.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-foreground">
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={17} className="text-primary" />
                {Number.isNaN(eventDate.getTime())
                  ? "Date to be announced"
                  : eventDate.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={17} className="text-secondary" />
                {event.location}
              </span>
            </div>
          </div>
        </section>

        <div className="relative z-10 mx-auto -mt-5 grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
          <div className="space-y-6">
            <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-light text-primary">
                  <HeartHandshake size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    The cause
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-foreground">
                    About this event
                  </h2>
                </div>
              </div>

              <p className="mt-6 whitespace-pre-line text-base leading-8 text-muted">
                {event.description}
              </p>
            </section>

            <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">
                    Better together
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-foreground">
                    The community
                  </h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-light text-secondary">
                  <Users size={23} />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4 rounded-2xl bg-muted-background p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card text-primary shadow-sm">
                  <UserRound size={22} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted">Hosted by</p>
                  <p className="truncate font-semibold text-foreground">
                    {event.creator?.name || "Community Organizer"}
                  </p>
                  {event.creator?.email ? (
                    <p className="truncate text-sm text-muted">
                      {event.creator.email}
                    </p>
                  ) : null}
                </div>
                <ArrowUpRight
                  size={18}
                  className="ml-auto shrink-0 text-muted"
                  aria-hidden="true"
                />
              </div>

              <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
                <div>
                  <p className="text-3xl font-bold text-foreground">
                    {participantCount}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {participantCount === 1 ? "person is" : "people are"}{" "}
                    joining in
                  </p>
                </div>
                {participants.length > 0 ? (
                  <div className="flex -space-x-2">
                    {participants.slice(0, 5).map((person, index) => (
                      <div
                        key={person.userId || person.email || index}
                        title={person.name}
                        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-card bg-accent-light text-primary"
                      >
                        <UserRound size={15} />
                      </div>
                    ))}
                    {participantCount > 5 ? (
                      <span className="flex h-9 items-center rounded-full border-2 border-card bg-muted-background px-2 text-xs font-semibold text-muted">
                        +{participantCount - 5}
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <span className="text-right text-sm font-medium text-primary">
                    Be the first to join
                  </span>
                )}
              </div>

              {participants.length > 0 ? (
                <ul className="mt-5 grid gap-3 border-t border-border pt-5 sm:grid-cols-2">
                  {participants.slice(0, 6).map((person, index) => (
                    <li
                      key={person.userId || person.email || index}
                      className="flex min-w-0 items-center gap-3"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted-background text-muted">
                        <UserRound size={16} />
                      </span>
                      <span className="truncate text-sm font-medium text-foreground">
                        {person.name}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          </div>

          <aside className="lg:pt-8">
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lg shadow-[#5B3827]/5 lg:sticky lg:top-24">
              <div className="border-b border-border bg-muted-background px-6 py-5 text-foreground">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Your next good thing
                </p>
                <h2 className="mt-1 text-xl font-bold">Event details</h2>
              </div>

              <div className="space-y-5 p-6">
                <div className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-light text-primary">
                    <CalendarDays size={19} />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-xs font-medium text-muted">Date</p>
                    <p className="mt-1 text-sm font-semibold leading-5 text-foreground">
                      {Number.isNaN(eventDate.getTime())
                        ? "Date unavailable"
                        : eventDate.toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-light text-primary">
                    <Clock3 size={19} />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-xs font-medium text-muted">Time</p>
                    <p className="mt-1 text-sm font-semibold leading-5 text-foreground">
                      {Number.isNaN(eventDate.getTime())
                        ? "Time unavailable"
                        : eventDate.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-light text-secondary">
                    <MapPin size={19} />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-xs font-medium text-muted">Location</p>
                    <p className="mt-1 text-sm font-semibold leading-5 text-foreground">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-light text-primary">
                    <Tag size={19} />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-xs font-medium text-muted">Category</p>
                    <p className="mt-1 text-sm font-semibold leading-5 text-foreground">
                      {event.eventType}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-5">
                  <JoinEventButton
                    eventId={event._id}
                    creatorId={event.creator?.userId}
                    creatorEmail={event.creator?.email}
                    participantIds={participants
                      .map((person) => person.userId)
                      .filter((id): id is string => Boolean(id))}
                    participantEmails={participants.map(
                      (person) => person.email,
                    )}
                    isPastEvent={isPastEvent}
                    onJoined={(joinedEvent) =>
                      setUpdatedParticipants({
                        eventId: event._id,
                        participants: joinedEvent.participants ?? [],
                      })
                    }
                    onLeft={(leftEvent) =>
                      setUpdatedParticipants({
                        eventId: event._id,
                        participants: leftEvent.participants ?? [],
                      })
                    }
                  />
                  {isCreatedByUser && (
                    <div className="mt-3 flex justify-center">
                      <Link
                        href="/manage-events"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/30 px-4 py-3 text-sm font-semibold text-primary transition hover:bg-accent-light"
                      >
                        <Pencil size={17} />
                        Manage Events
                      </Link>
                    </div>
                  )}
                  <p className="mt-3 text-center text-xs leading-5 text-muted">
                    Every helping hand makes a difference.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default EventDetailsView;
