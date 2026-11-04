import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Users,
  HeartHandshake,
  Sprout,
  HandHeart,
  BookOpen,
  Send,
} from "lucide-react";

import { api } from "@/lib/api";
import type { Event } from "@/types/event";
import NewsletterForm from "@/components/home/NewsletterForm";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
    title: "Community Together",
    category: "Community Support",
  },
  {
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
    title: "A Greener Tomorrow",
    category: "Environmental Care",
  },
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
    title: "Sharing Kindness",
    category: "Social Development",
  },
];

const causes = [
  {
    icon: Sprout,
    title: "Environmental Care",
    description: "Take part in cleanups, tree planting, and a greener future.",
  },
  {
    icon: BookOpen,
    title: "Education for All",
    description: "Support learning opportunities and educational activities.",
  },
  {
    icon: HandHeart,
    title: "Community Support",
    description: "Help people through donations and meaningful local action.",
  },
];

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Homepage content and dynamic event fetching
const HomePageContent = async () => {
  let events: Event[] = [];

  try {
    const result = await api.getUpcomingEvents();
    events = (result.data ?? []).slice(0, 3);
  } catch (error) {
    console.error("Failed to load homepage events:", error);
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative isolate bg-muted-background">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1800')",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/90 to-background/40" />
        </div>

        <div className="mx-auto grid min-h-155 max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="max-w-2xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-2 text-sm font-medium text-primary">
              <HeartHandshake size={17} />
              Together, We Make a Difference
            </span>

            <h1 className="text-4xl leading-tight font-extrabold text-foreground sm:text-5xl lg:text-6xl">
              Small Actions.
              <span className="block text-primary">Meaningful Change.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
              Bondhon brings people together through community events,
              volunteering, and social initiatives. Discover opportunities to
              help, connect, and make a positive impact.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition hover:bg-primary-hover"
              >
                Explore Events
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/signup"
                className="rounded-xl border border-border bg-card px-6 py-3.5 font-semibold text-foreground transition hover:bg-muted-background"
              >
                Become a Volunteer
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex lg:justify-end">
            <div className="max-w-sm rounded-3xl border border-border bg-card p-8 text-foreground shadow-xl">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
                <Users size={28} />
              </div>

              <h2 className="text-2xl font-bold">Be Part of Something Good</h2>

              <p className="mt-3 leading-7 text-muted">
                Every volunteer, every idea, and every small contribution can
                help build a stronger community.
              </p>

              <div className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                <HeartHandshake className="text-primary" size={25} />
                <span className="text-sm font-medium">
                  Connect. Participate. Make an Impact.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-background px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-sm font-bold tracking-widest text-primary uppercase">
              About Bondhon
            </span>

            <h2 className="mt-3 text-3xl leading-tight font-bold text-foreground sm:text-4xl">
              Bringing People Together for a Better Community
            </h2>

            <p className="mt-5 leading-8 text-muted">
              We believe meaningful change begins when people come together.
              Bondhon makes it easier to discover social development events,
              participate in community activities, and connect with people who
              care about making a difference.
            </p>

            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-hover"
            >
              Learn More About Us
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-accent-light p-6">
              <HeartHandshake size={30} className="text-primary" />
              <h3 className="mt-4 font-bold text-foreground">
                Build Connections
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Meet people who share your passion for helping others.
              </p>
            </div>

            <div className="mt-10 rounded-2xl bg-muted-background p-6">
              <Users size={30} className="text-secondary" />
              <h3 className="mt-4 font-bold text-foreground">Take Action</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Turn good intentions into real community activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Causes */}
      <section className="bg-card px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold tracking-widest text-primary uppercase">
              What We Support
            </span>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Find a Cause That Matters to You
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Discover different ways to contribute your time and energy.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {causes.map((cause) => {
              const Icon = cause.icon;

              return (
                <div
                  key={cause.title}
                  className="rounded-2xl border border-border bg-background p-7 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-light text-primary">
                    <Icon size={27} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-foreground">
                    {cause.title}
                  </h3>

                  <p className="mt-3 leading-7 text-muted">
                    {cause.description}
                  </p>

                  <Link
                    href="/events"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover"
                  >
                    Explore Events
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Events */}
      <section className="bg-background px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-bold tracking-widest text-primary uppercase">
                Get Involved
              </span>
              <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                Upcoming Community Events
              </h2>
              <p className="mt-3 text-muted">
                Find an event and become part of something meaningful.
              </p>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-hover"
            >
              View All Events
              <ArrowRight size={18} />
            </Link>
          </div>

          {events.length > 0 ? (
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <article
                  key={event._id}
                  className="overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link href={`/events/${event._id}`} className="block">
                    <div
                      className="h-52 bg-cover bg-center bg-muted-background"
                      style={{
                        backgroundImage: event.thumbnail
                          ? `url("${event.thumbnail}")`
                          : undefined,
                      }}
                    />

                    <div className="p-5">
                      <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-semibold text-primary">
                        {event.eventType}
                      </span>

                      <h3 className="mt-4 line-clamp-1 text-xl font-bold text-foreground">
                        {event.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
                        {event.description}
                      </p>

                      <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm text-muted">
                        <p className="flex items-center gap-2">
                          <CalendarDays size={16} className="text-primary" />
                          {formatDate(event.eventDate)}
                        </p>

                        <p className="flex items-center gap-2">
                          <MapPin size={16} className="text-primary" />
                          <span className="line-clamp-1">{event.location}</span>
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-sm font-medium text-muted">
                          {event.participants?.length ?? 0} Participants
                        </span>

                        <span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
                          View Details
                          <ArrowRight size={15} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-border bg-card px-6 py-16 text-center">
              <CalendarDays size={38} className="mx-auto text-muted" />
              <h3 className="mt-4 text-xl font-bold text-foreground">
                No Upcoming Events Yet
              </h3>
              <p className="mt-2 text-muted">
                New community events will appear here when they are available.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-card px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold tracking-widest text-primary uppercase">
              Community Moments
            </span>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Together, We Create Memories
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Every community activity starts with people willing to make a
              difference.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {galleryImages.map((item) => (
              <div
                key={item.title}
                className="group relative h-80 overflow-hidden rounded-2xl bg-muted-background"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url("${item.src}")` }}
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute right-0 bottom-0 left-0 p-6">
                  <p className="text-sm font-medium text-[#F4A261]">
                    {item.category}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-muted-background px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
            <Send size={26} />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-foreground sm:text-4xl">
            Stay Connected with Bondhon
          </h2>

          <p className="mt-4 leading-7 text-muted">
            Get updates about community events, volunteering opportunities, and
            initiatives that make a difference.
          </p>

          <div className="mt-8">
            <NewsletterForm />
          </div>

          <p className="mt-4 text-xs text-muted">
            Newsletter subscriptions are a frontend demo at this stage.
          </p>
        </div>
      </section>
    </div>
  );
};

// Homepage with Suspense boundary
const HomePage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading Bondhon...
        </div>
      }
    >
      <HomePageContent />
    </Suspense>
  );
};

export default HomePage;
