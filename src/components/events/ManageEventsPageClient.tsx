"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  LoaderCircle,
  MapPin,
  Pencil,
  Save,
  UsersRound,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { authApi, type EventUpdateInput } from "@/lib/auth-api";
import { authClient } from "@/lib/auth-client";
import type { Event, EventType } from "@/types/event";
import EventDeleteButton from "./EventDeleteButton";

const eventTypes: EventType[] = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Food Distribution",
  "Health Camp",
];

type EventDraft = Omit<EventUpdateInput, "eventDate"> & {
  eventDate: string;
};

const toLocalDateTime = (date: string) => {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const localDate = new Date(
    parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60_000,
  );
  return localDate.toISOString().slice(0, 16);
};

const toDraft = (event: Event): EventDraft => ({
  title: event.title,
  description: event.description,
  eventType: event.eventType,
  thumbnail: event.thumbnail ?? "",
  location: event.location,
  eventDate: toLocalDateTime(event.eventDate),
});

const ManageEventsPageClient = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user.id;
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [draft, setDraft] = useState<EventDraft | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (!userId) {
      router.replace("/login?callbackURL=%2Fmanage-events");
      return;
    }

    let active = true;

    const loadEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await authApi.getMyEvents();
        if (!result.success || !Array.isArray(result.data)) {
          throw new Error(result.message || "Unable to load your events.");
        }

        if (active) {
          setEvents(result.data);
        }
      } catch (loadError) {
        console.error("Failed to load events for management:", loadError);
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load your events. Please try again.",
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    void loadEvents();
    return () => {
      active = false;
    };
  }, [isPending, retryCount, router, userId]);

  const startEditing = (event: Event) => {
    setEditingEventId(event._id);
    setDraft(toDraft(event));
  };

  const cancelEditing = () => {
    setEditingEventId(null);
    setDraft(null);
  };

  const handleUpdate = async (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    if (!editingEventId || !draft) {
      return;
    }

    const eventDate = new Date(draft.eventDate);
    if (!draft.eventDate || Number.isNaN(eventDate.getTime())) {
      toast.error("Please enter a valid event date and time.");
      return;
    }

    const eventData: EventUpdateInput = {
      title: draft.title.trim(),
      description: draft.description.trim(),
      eventType: draft.eventType,
      thumbnail: draft.thumbnail.trim(),
      location: draft.location.trim(),
      eventDate: eventDate.toISOString(),
    };

    try {
      setIsSaving(true);
      const result = await authApi.updateEvent(editingEventId, eventData);
      if (!result.success) {
        throw new Error(result.message || "Unable to update this event.");
      }

      setEvents((currentEvents) =>
        currentEvents.map((event) =>
          event._id === editingEventId
            ? {
                ...event,
                ...eventData,
                updatedAt: new Date().toISOString(),
              }
            : event,
        ),
      );
      toast.success("Event updated successfully.");
      cancelEditing();
      router.refresh();
    } catch (updateError) {
      console.error("Failed to update event:", updateError);
      toast.error(
        updateError instanceof Error
          ? updateError.message
          : "Unable to update this event. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

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
      <div className="mx-auto max-w-5xl">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-primary"
        >
          <ArrowLeft size={17} />
          Upcoming events
        </Link>

        <div className="mt-6">
          <p className="text-sm font-bold tracking-widest text-primary uppercase">
            Your community activity
          </p>
          <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
            Manage Your Events
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted">
            Update event details or remove events you created. Changes are
            visible to the community.
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
            className="mt-8 rounded-2xl border border-error/30 bg-card p-6 text-center"
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
              No events created yet
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Events you create will appear here so you can manage them.
            </p>
            <Link
              href="/create-event"
              className="mt-5 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              Create an event
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {events.map((event) => {
              const isEditing = editingEventId === event._id;
              const eventDate = new Date(event.eventDate);
              const formattedDate = Number.isNaN(eventDate.getTime())
                ? "Date unavailable"
                : eventDate.toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  });

              return (
                <article
                  key={event._id}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                >
                  <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
                    <div className="min-w-0">
                      <span className="inline-flex rounded-full bg-accent-light px-3 py-1 text-xs font-semibold text-primary">
                        {event.eventType}
                      </span>
                      <h2 className="mt-3 text-xl font-bold text-foreground">
                        {event.title}
                      </h2>
                      <p className="mt-2 line-clamp-3 whitespace-pre-line text-sm leading-6 text-muted">
                        {event.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays
                            size={16}
                            className="text-primary"
                          />
                          {formattedDate}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <MapPin size={16} className="text-secondary" />
                          {event.location}
                        </span>
                      </div>
                    </div>

                    {!isEditing && (
                      <div className="flex shrink-0 flex-wrap gap-2">
                        <Link
                          href={`/events/${event._id}`}
                          className="inline-flex items-center justify-center rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
                        >
                          Details
                        </Link>
                        <button
                          type="button"
                          onClick={() => startEditing(event)}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover"
                        >
                          <Pencil size={16} />
                          Edit
                        </button>
                        <EventDeleteButton
                          event={event}
                          onDeleted={() =>
                            setEvents((currentEvents) =>
                              currentEvents.filter(
                                (item) => item._id !== event._id,
                              ),
                            )
                          }
                        />
                      </div>
                    )}
                  </div>

                  {isEditing && draft && (
                    <form
                      onSubmit={handleUpdate}
                      className="space-y-5 border-t border-border bg-muted-background/40 p-5 sm:p-6"
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor={`title-${event._id}`}
                            className="mb-2 block text-sm font-semibold text-foreground"
                          >
                            Event title
                          </label>
                          <input
                            id={`title-${event._id}`}
                            value={draft.title}
                            onChange={(inputEvent) =>
                              setDraft({
                                ...draft,
                                title: inputEvent.target.value,
                              })
                            }
                            maxLength={120}
                            required
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`type-${event._id}`}
                            className="mb-2 block text-sm font-semibold text-foreground"
                          >
                            Event type
                          </label>
                          <select
                            id={`type-${event._id}`}
                            value={draft.eventType}
                            onChange={(inputEvent) => {
                              const selectedType = eventTypes.find(
                                (type) => type === inputEvent.target.value,
                              );
                              if (selectedType) {
                                setDraft({
                                  ...draft,
                                  eventType: selectedType,
                                });
                              }
                            }}
                            required
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                          >
                            {eventTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor={`description-${event._id}`}
                          className="mb-2 block text-sm font-semibold text-foreground"
                        >
                          Description
                        </label>
                        <textarea
                          id={`description-${event._id}`}
                          value={draft.description}
                          onChange={(inputEvent) =>
                            setDraft({
                              ...draft,
                              description: inputEvent.target.value,
                            })
                          }
                          rows={4}
                          maxLength={10000}
                          required
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                        />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor={`thumbnail-${event._id}`}
                            className="mb-2 block text-sm font-semibold text-foreground"
                          >
                            Thumbnail URL
                          </label>
                          <input
                            id={`thumbnail-${event._id}`}
                            type="url"
                            value={draft.thumbnail}
                            onChange={(inputEvent) =>
                              setDraft({
                                ...draft,
                                thumbnail: inputEvent.target.value,
                              })
                            }
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`location-${event._id}`}
                            className="mb-2 block text-sm font-semibold text-foreground"
                          >
                            Location
                          </label>
                          <input
                            id={`location-${event._id}`}
                            value={draft.location}
                            onChange={(inputEvent) =>
                              setDraft({
                                ...draft,
                                location: inputEvent.target.value,
                              })
                            }
                            maxLength={200}
                            required
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor={`date-${event._id}`}
                          className="mb-2 block text-sm font-semibold text-foreground"
                        >
                          Event date and time
                        </label>
                        <input
                          id={`date-${event._id}`}
                          type="datetime-local"
                          value={draft.eventDate}
                          onChange={(inputEvent) =>
                            setDraft({
                              ...draft,
                              eventDate: inputEvent.target.value,
                            })
                          }
                          required
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary sm:max-w-sm"
                        />
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isSaving ? (
                            <LoaderCircle
                              size={17}
                              className="animate-spin"
                            />
                          ) : (
                            <Save size={17} />
                          )}
                          {isSaving ? "Saving..." : "Save changes"}
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditing}
                          disabled={isSaving}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted-background disabled:opacity-60"
                        >
                          <X size={17} />
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageEventsPageClient;
