import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  CalendarDays,
  Heart,
  MapPin,
  Users,
  HeartHandshake,
  Sprout,
  HandHeart,
  BookOpen,
  Mail,
  Sparkles,
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
      <section
        id="bondhon-home-hero"
        className="relative isolate overflow-hidden bg-muted-background"
      >
        <style>{`
          @keyframes bondhon-hero-reveal {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bondhon-hero-pan {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.055); }
          }
          @keyframes bondhon-hero-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-9px); }
          }
          @keyframes bondhon-hero-heartbeat {
            0%, 100% { transform: scale(1); }
            8%, 18% { transform: scale(1.1); }
            13%, 23% { transform: scale(1); }
          }
          @keyframes bondhon-hero-orbit {
            from { transform: rotate(0deg) translateX(76px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(76px) rotate(-360deg); }
          }
          @keyframes bondhon-hero-ring {
            0%, 100% { opacity: .45; transform: scale(.98); }
            50% { opacity: .9; transform: scale(1.02); }
          }
          #bondhon-home-hero .bondhon-hero-orbit {
            transform: translateY(-76px);
          }
          #bondhon-home-hero .bondhon-hero-orbit-slow {
            transform: translate(66px, 38px);
          }
          #bondhon-home-hero .bondhon-hero-orbit-delay {
            transform: translate(-66px, 38px);
          }
          #bondhon-home-hero .bondhon-hero-overlay {
            background: linear-gradient(
              90deg,
              color-mix(in srgb, var(--background) 82%, transparent) 0%,
              color-mix(in srgb, var(--background) 64%, transparent) 48%,
              color-mix(in srgb, var(--background) 28%, transparent) 100%
            );
          }
          @media (prefers-reduced-motion: no-preference) {
            #bondhon-home-hero .bondhon-hero-reveal {
              animation: bondhon-hero-reveal 700ms cubic-bezier(.2,.8,.2,1) both;
            }
            #bondhon-home-hero .bondhon-hero-delay-1 { animation-delay: 100ms; }
            #bondhon-home-hero .bondhon-hero-delay-2 { animation-delay: 200ms; }
            #bondhon-home-hero .bondhon-hero-delay-3 { animation-delay: 300ms; }
            #bondhon-home-hero .bondhon-hero-delay-4 { animation-delay: 400ms; }
            #bondhon-home-hero .bondhon-hero-pan {
              animation: bondhon-hero-pan 24s ease-in-out infinite;
            }
            #bondhon-home-hero .bondhon-hero-float {
              animation: bondhon-hero-float 5s ease-in-out infinite;
            }
            #bondhon-home-hero .bondhon-hero-heartbeat {
              animation: bondhon-hero-heartbeat 4s ease-in-out infinite;
            }
            #bondhon-home-hero .bondhon-hero-orbit {
              animation: bondhon-hero-orbit 22s linear infinite;
            }
            #bondhon-home-hero .bondhon-hero-orbit-slow {
              animation-duration: 30s;
              animation-direction: reverse;
            }
            #bondhon-home-hero .bondhon-hero-orbit-delay {
              animation-delay: -11s;
            }
            #bondhon-home-hero .bondhon-hero-ring {
              animation: bondhon-hero-ring 5s ease-in-out infinite;
            }
          }
        `}</style>
        <div className="absolute inset-0 -z-10">
          <div
            className="bondhon-hero-pan absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1800')",
            }}
          />
          <div className="bondhon-hero-overlay absolute inset-0" />
        </div>

        <div className="mx-auto grid min-h-155 max-w-7xl items-center gap-5 px-4 py-16 sm:px-6 md:grid-cols-[minmax(0,1.35fr)_minmax(10rem,0.65fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:gap-12 lg:px-8">
          <div className="max-w-2xl">
            <span className="bondhon-hero-reveal inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-2 text-sm font-medium text-primary">
              <HeartHandshake className="bondhon-hero-heartbeat" size={17} />
              Together, We Make a Difference
            </span>

            <h1 className="bondhon-hero-reveal bondhon-hero-delay-1 mt-5 text-4xl leading-tight font-extrabold text-foreground sm:text-5xl md:text-5xl lg:text-6xl">
              Small Actions.
              <span className="block text-primary">Meaningful Change.</span>
            </h1>

            <p className="bondhon-hero-reveal bondhon-hero-delay-2 mt-5 max-w-xl text-base leading-8 text-muted sm:text-lg md:text-lg">
              Bondhon brings people together through community events,
              volunteering, and social initiatives. Discover opportunities to
              help, connect, and make a positive impact.
            </p>

            <div className="bondhon-hero-reveal bondhon-hero-delay-3 mt-7">
              <Link
                href="/events"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-base font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Explore Events
                <ArrowRight
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  size={18}
                />
              </Link>
            </div>
          </div>

          <div className="bondhon-hero-reveal bondhon-hero-delay-4 flex justify-center lg:justify-end">
            <div
              role="img"
              aria-label="Community icons orbiting a shared meeting point"
              className="relative flex aspect-square w-full max-w-[17rem] items-center justify-center"
            >
              <div className="absolute inset-1 rounded-full border border-dashed border-border/80" />
              <div className="absolute inset-6 rounded-full border border-border/60" />
              <div className="bondhon-hero-ring absolute inset-12 rounded-full border border-secondary/30" />

              <div className="bondhon-hero-float relative flex h-28 w-28 items-center justify-center rounded-full border border-secondary/20 bg-card text-secondary shadow-xl shadow-secondary/10">
                <div className="absolute inset-2 rounded-full border border-dashed border-secondary/40" />
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10">
                  <Users
                    className="bondhon-hero-heartbeat"
                    size={44}
                    strokeWidth={1.35}
                    aria-hidden="true"
                  />
                </div>
                <span className="absolute -right-2 top-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-light text-primary shadow-md">
                  <HeartHandshake size={21} aria-hidden="true" />
                </span>
              </div>

              <span
                aria-hidden="true"
                className="bondhon-hero-orbit absolute left-1/2 top-1/2 z-10 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-2xl border-4 border-background bg-card text-secondary shadow-lg"
              >
                <Sprout size={19} />
              </span>
              <span
                aria-hidden="true"
                className="bondhon-hero-orbit bondhon-hero-orbit-slow absolute left-1/2 top-1/2 z-10 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-2xl border-4 border-background bg-card text-primary shadow-lg"
              >
                <HandHeart size={19} />
              </span>
              <span
                aria-hidden="true"
                className="bondhon-hero-orbit bondhon-hero-orbit-delay absolute left-1/2 top-1/2 z-10 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-primary text-white shadow-lg"
              >
                <Heart size={16} fill="currentColor" />
              </span>

              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-card px-3 py-1.5 text-[0.65rem] font-medium text-muted shadow-sm">
                Good grows together
              </span>
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex h-full min-h-48 flex-col rounded-2xl border border-primary/10 bg-accent-light p-6 transition hover:-translate-y-1 hover:shadow-md">
              <HeartHandshake size={30} className="shrink-0 text-primary" />
              <h3 className="mt-4 font-bold text-foreground">
                Build Connections
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Meet people who share your passion for helping others.
              </p>
            </div>

            <div className="flex h-full min-h-48 flex-col rounded-2xl border border-border bg-muted-background p-6 transition hover:-translate-y-1 hover:shadow-md">
              <Users size={30} className="shrink-0 text-secondary" />
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

      {/* About Bondhon */}
      <section className="bg-muted-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
            <HeartHandshake size={28} />
          </div>
          <div className="max-w-3xl">
            <p className="text-sm font-bold tracking-widest text-primary uppercase">
              About Bondhon
            </p>
            <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
              Bringing communities together through action
            </h2>
            <p className="mt-3 leading-7 text-muted">
              Bondhon helps people discover local events, connect with
              volunteers, and take part in causes that matter. From planting
              trees to supporting neighbors, every shared effort helps build a
              more caring and connected community.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section
        aria-labelledby="newsletter-heading"
        className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-3xl bg-footer px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div
            aria-hidden="true"
            className="absolute -top-32 -right-20 -z-10 h-80 w-80 rounded-full bg-primary/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-40 left-1/3 -z-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
          />

          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-sm font-medium text-white/85">
                <Mail size={16} className="text-accent" />A little good in your
                inbox
              </span>

              <h2
                id="newsletter-heading"
                className="mt-6 text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl"
              >
                Stay close to the{" "}
                <span className="text-accent">good happening</span> around you.
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-white/70 sm:text-lg">
                Get a thoughtful round-up of upcoming community events,
                volunteer stories, and simple ways to make a difference with
                Bondhon.
              </p>

              <div className="mt-8">
                <NewsletterForm />
              </div>
              <p className="mt-3 text-xs text-white/50">
                Just community, kindness, and opportunities to get involved.
              </p>
            </div>

            <div className="relative mx-auto flex min-h-64 w-full max-w-sm items-center justify-center">
              <div
                aria-hidden="true"
                className="absolute h-56 w-56 rounded-full border border-white/10"
              />
              <div
                aria-hidden="true"
                className="absolute h-44 w-44 rounded-full border border-white/10"
              />
              <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-primary text-white shadow-2xl shadow-primary/20">
                <HeartHandshake size={54} strokeWidth={1.5} />
                <span className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-footer shadow-lg">
                  <Sparkles size={20} />
                </span>
              </div>

              <div className="absolute top-7 right-0 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm sm:right-2">
                <p className="text-xs text-white/60">Small steps</p>
                <p className="mt-1 text-sm font-semibold">Big-hearted impact</p>
              </div>
              <div className="absolute bottom-6 left-0 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm sm:left-2">
                <p className="text-xs text-white/60">Made for</p>
                <p className="mt-1 text-sm font-semibold">our community</p>
              </div>
            </div>
          </div>
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
