"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  HeartHandshake,
  LoaderCircle,
  MapPin,
} from "lucide-react";
import toast from "react-hot-toast";
import { authApi, type EventCreateInput } from "@/lib/auth-api";
import { authClient } from "@/lib/auth-client";
import type { EventType } from "@/types/event";

const eventTypes: EventType[] = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Food Distribution",
  "Health Camp",
];

const getMinimumDateTime = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 1, 0, 0);
  date.setTime(date.getTime() - date.getTimezoneOffset() * 60_000);
  return date.toISOString().slice(0, 16);
};

const CreateEventPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [minimumDateTime, setMinimumDateTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState<EventType | "">("");
  const [thumbnail, setThumbnail] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = session?.user;
    if (!user) {
      toast.error("Please sign in to create an event.");
      return;
    }

    if (!eventType) {
      toast.error("Please choose an event type.");
      return;
    }

    if (
      !title.trim() ||
      !description.trim() ||
      !thumbnail.trim() ||
      !location.trim()
    ) {
      toast.error("Please complete all event details.");
      return;
    }

    const parsedEventDate = new Date(eventDate);
    if (
      !eventDate ||
      Number.isNaN(parsedEventDate.getTime()) ||
      parsedEventDate.getTime() <= Date.now()
    ) {
      toast.error("Please choose a future date and time.");
      return;
    }

    const eventData: EventCreateInput = {
      title: title.trim(),
      description: description.trim(),
      eventType,
      thumbnail: thumbnail.trim(),
      location: location.trim(),
      eventDate: parsedEventDate.toISOString(),
      creator: {
        userId: user.id,
        name: user.name,
        email: user.email,
      },
    };

    try {
      setIsSubmitting(true);
      const result = await authApi.createEvent(eventData);

      if (!result.success) {
        throw new Error(result.message || "Unable to create the event.");
      }

      toast.success("Your community event has been created!");
      router.push("/events");
      router.refresh();
    } catch (error) {
      console.error("Failed to create event:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to create the event. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-background">
        <LoaderCircle className="animate-spin text-primary" size={30} />
        <span className="sr-only">Checking your sign-in...</span>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-16">
        <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-light text-primary">
            <HeartHandshake size={30} />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-foreground">
            Sign in to create an event
          </h1>
          <p className="mt-3 leading-7 text-muted">
            Log in to bring your community together and share an opportunity to
            make a difference.
          </p>
          <Link
            href="/login?callbackURL=%2Fcreate-event"
            className="mt-7 inline-flex rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-hover"
          >
            Log In
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-primary"
        >
          <ArrowLeft size={17} />
          Back to upcoming events
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_300px] lg:items-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-9">
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent-light px-3.5 py-2 text-sm font-semibold text-primary">
                <CalendarDays size={16} />
                Bring people together
              </span>
              <h1 className="mt-5 text-3xl font-bold text-foreground sm:text-4xl">
                Create a Community Event
              </h1>
              <p className="mt-3 leading-7 text-muted">
                Share the details and invite your community to make a positive
                difference.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="event-title"
                  className="mb-2 block text-sm font-semibold text-foreground"
                >
                  Event title
                </label>
                <input
                  id="event-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  maxLength={120}
                  placeholder="e.g. Neighborhood park cleanup"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/15"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="event-description"
                  className="mb-2 block text-sm font-semibold text-foreground"
                >
                  Description
                </label>
                <textarea
                  id="event-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={5}
                  maxLength={2000}
                  placeholder="Tell people what the event is about and how they can help..."
                  className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/15"
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="event-type"
                    className="mb-2 block text-sm font-semibold text-foreground"
                  >
                    Event type
                  </label>
                  <select
                    id="event-type"
                    value={eventType}
                    onChange={(event) => {
                      const selectedType = eventTypes.find(
                        (type) => type === event.target.value,
                      );
                      setEventType(selectedType ?? "");
                    }}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                    required
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="event-date"
                    className="mb-2 block text-sm font-semibold text-foreground"
                  >
                    Event date and time
                  </label>
                  <input
                    id="event-date"
                    type="datetime-local"
                    value={eventDate}
                    min={minimumDateTime}
                    onFocus={() =>
                      setMinimumDateTime(getMinimumDateTime())
                    }
                    onChange={(event) => setEventDate(event.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="event-thumbnail"
                  className="mb-2 block text-sm font-semibold text-foreground"
                >
                  Thumbnail image URL
                </label>
                <input
                  id="event-thumbnail"
                  type="url"
                  value={thumbnail}
                  onChange={(event) => setThumbnail(event.target.value)}
                  placeholder="https://example.com/community-event.jpg"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/15"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="event-location"
                  className="mb-2 block text-sm font-semibold text-foreground"
                >
                  Location
                </label>
                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-muted"
                  />
                  <input
                    id="event-location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Street, neighborhood, or meeting point"
                    className="w-full rounded-xl border border-border bg-background py-3 pr-4 pl-11 text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/15"
                    required
                  />
                </div>
              </div>

              <div className="rounded-xl bg-muted-background px-4 py-3 text-sm text-muted">
                Creating as{" "}
                <span className="font-semibold text-foreground">
                  {session.user.email}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting && (
                  <LoaderCircle size={18} className="animate-spin" />
                )}
                {isSubmitting ? "Creating event..." : "Create Event"}
              </button>
            </form>
          </div>

          <aside className="rounded-3xl border border-primary/10 bg-accent-light p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
              <HeartHandshake size={25} />
            </div>
            <h2 className="mt-5 text-lg font-bold text-foreground">
              Make it meaningful
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Clear details help volunteers understand your cause and feel
              ready to take part.
            </p>
            <div className="mt-5 space-y-3 border-t border-primary/10 pt-5 text-sm text-muted">
              <p>Choose a welcoming, easy-to-find location.</p>
              <p>Share a future date so people have time to join.</p>
              <p>Use an image that reflects your community effort.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CreateEventPage;
