import Link from "next/link";
import {
  BadgeCheck,
  CalendarDays,
  MapPin,
  ArrowUpRight,
  Users,
} from "lucide-react";

import type { Event } from "@/types/event";

interface EventCardProps {
  event: Event;
  isCreatedByUser: boolean;
}

const EventCard = ({ event, isCreatedByUser }: EventCardProps) => {
  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      {/* Event Image */}
      <div
        role="img"
        aria-label={event.title}
        className="relative h-52 overflow-hidden bg-accent-light bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.01]"
        style={
          event.thumbnail
            ? { backgroundImage: `url("${event.thumbnail}")` }
            : undefined
        }
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-bold text-primary shadow-sm">
          {event.eventType}
        </span>

        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-medium text-white">
          <Users size={16} />
          {event.participants?.length ?? 0} joined
        </div>
      </div>

      {/* Event Information */}
      <div className="p-5">
        <div className="flex min-h-14 items-start justify-between gap-2">
          <h3 className="line-clamp-2 min-w-0 flex-1 text-lg leading-7 font-bold text-foreground transition-colors duration-200 group-hover:text-primary">
            {event.title}
          </h3>
          {isCreatedByUser && (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2.5 py-1.5 text-[10px] leading-4 font-bold text-white">
              <BadgeCheck size={13} />
              Created by you
            </span>
          )}
        </div>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-muted">
          {event.description}
        </p>

        <div className="mt-5 space-y-3 border-t border-border pt-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <CalendarDays size={17} className="shrink-0 text-primary" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted">
            <MapPin size={17} className="shrink-0 text-secondary" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        {/* View Details */}
        <Link
          href={`/events/${event._id}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-hover hover:shadow-md"
        >
          View Details
          <ArrowUpRight
            size={17}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </article>
  );
};

export default EventCard;
