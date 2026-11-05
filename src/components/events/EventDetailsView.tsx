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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const eventParticipants =
    updatedParticipants?.eventId === event._id
      ? updatedParticipants.participants
      : (event.participants ?? []);
  const participants = eventParticipants.map((participant) => {
    const isCurrentUser =
      participant.userId === user?.id ||
      participant.email.toLowerCase() === user?.email.toLowerCase();

    return isCurrentUser && !participant.image && user?.image
      ? { ...participant, image: user.image }
      : participant;
  });
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
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pb-16 lg:pt-6">
        <Link
          href="/events"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-semibold text-muted transition hover:border-primary/40 hover:text-primary sm:text-sm"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          All events
        </Link>

        <section className="relative mt-4 isolate min-h-90 overflow-hidden rounded-3xl bg-muted-background sm:mt-5 sm:min-h-100 sm:rounded-4xl lg:min-h-120">
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

          <div className="flex min-h-90 flex-col justify-end p-5 sm:min-h-100 sm:p-7 lg:min-h-120 lg:p-12 lg:max-w-4xl">
            <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/90 px-3.5 py-1.5 text-xs font-semibold text-primary backdrop-blur sm:px-4 sm:py-2 sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {event.eventType}
              </span>
              {isCreatedByUser && (
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1.5 text-xs font-semibold text-white sm:px-4 sm:py-2 sm:text-sm">
                  <BadgeCheck size={16} />
                  Created by you
                </span>
              )}
            </div>

            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary sm:mb-3 sm:text-sm sm:tracking-[0.2em]">
              Come be part of something good
            </p>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-[2.75rem] lg:text-6xl">
              {event.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:mt-4 sm:text-base sm:leading-7 lg:mt-5 lg:text-lg">
              {event.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5 text-xs font-medium text-foreground sm:mt-6 sm:gap-x-6 sm:gap-y-3 sm:text-sm lg:mt-8">
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

        <div className="relative z-10 mx-auto -mt-4 grid max-w-6xl gap-4 sm:-mt-5 sm:gap-5 md:grid-cols-[minmax(0,1fr)_280px] lg:gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-8">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-light text-primary sm:h-12 sm:w-12 sm:rounded-2xl">
                  <HeartHandshake size={21} className="sm:h-6 sm:w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    The cause
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                    About this event
                  </h2>
                </div>
              </div>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted sm:mt-6 sm:text-base sm:leading-8">
                {event.description}
              </p>
            </section>

            <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">
                    Better together
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                    The community
                  </h2>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-light text-secondary sm:h-12 sm:w-12 sm:rounded-2xl">
                  <Users size={20} className="sm:h-5.75 sm:w-5.75" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-xl bg-muted-background p-3 sm:mt-6 sm:gap-4 sm:rounded-2xl sm:p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card text-primary shadow-sm sm:h-12 sm:w-12">
                  <UserRound size={19} className="sm:h-5.5 sm:w-5.5" />
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

              <div className="mt-4 flex items-end justify-between border-t border-border pt-4 sm:mt-6 sm:pt-5">
                <div>
                  <p className="text-2xl font-bold text-foreground sm:text-3xl">
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
                      <Avatar
                        key={person.userId || person.email || index}
                        size="default"
                        title={person.name}
                        className="size-9 border-2 border-card bg-accent-light text-primary"
                      >
                        <AvatarImage
                          src={person.image || undefined}
                          alt={person.name}
                        />
                        <AvatarFallback className="bg-accent-light text-primary">
                          <UserRound size={15} />
                        </AvatarFallback>
                      </Avatar>
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
            </section>
          </div>

          <aside className="md:pt-5 lg:pt-8">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-[#5B3827]/5 sm:rounded-3xl md:sticky md:top-24">
              <div className="border-b border-border bg-muted-background px-4 py-4 text-foreground sm:px-6 sm:py-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-xs sm:tracking-[0.18em]">
                  Your next good thing
                </p>
                <h2 className="mt-1 text-lg font-bold sm:text-xl">
                  Event details
                </h2>
              </div>

              <div className="space-y-4 p-4 sm:space-y-5 sm:p-6">
                <div className="flex gap-3 sm:gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-light text-primary sm:h-10 sm:w-10">
                    <CalendarDays size={17} className="sm:h-4.75 sm:w-4.75" />
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

                <div className="flex gap-3 sm:gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-light text-primary sm:h-10 sm:w-10">
                    <Clock3 size={17} className="sm:h-4.75 sm:w-4.75" />
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

                <div className="flex gap-3 sm:gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-light text-secondary sm:h-10 sm:w-10">
                    <MapPin size={17} className="sm:h-4.75 sm:w-4.75" />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-xs font-medium text-muted">Location</p>
                    <p className="mt-1 text-sm font-semibold leading-5 text-foreground">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-light text-primary sm:h-10 sm:w-10">
                    <Tag size={17} className="sm:h-4.75 sm:w-4.75" />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-xs font-medium text-muted">Category</p>
                    <p className="mt-1 text-sm font-semibold leading-5 text-foreground">
                      {event.eventType}
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-4 sm:pt-5">
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
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/30 px-4 py-2.5 text-xs font-semibold text-primary transition hover:bg-accent-light sm:px-4 sm:py-3 sm:text-sm"
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
