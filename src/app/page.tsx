import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  HeartHandshake,
  UsersRound,
  CalendarCheck,
  HandHeart,
  Sprout,
  ShieldCheck,
  Globe2,
} from "lucide-react";

import EventCard from "@/components/events/EventCard";
import type { Event } from "@/types/event";
import { api } from "@/lib/api";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
    alt: "Volunteers working together on a community project",
    title: "Working Together",
  },
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
    alt: "Children participating in a community learning activity",
    title: "Supporting Education",
  },
  {
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
    alt: "Green trees and environmental conservation",
    title: "Caring for Nature",
  },
  {
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b",
    alt: "People participating in a volunteer activity",
    title: "Creating Connections",
  },
];

const benefits = [
  {
    icon: UsersRound,
    title: "Find Your Community",
    description:
      "Meet people who care about the same causes and build meaningful connections through shared activities.",
    color: "bg-accent-light text-primary",
  },
  {
    icon: CalendarCheck,
    title: "Discover Events",
    description:
      "Explore upcoming community programs and find volunteer opportunities that fit your interests.",
    color: "bg-[#E4F4F0] text-secondary",
  },
  {
    icon: HandHeart,
    title: "Make an Impact",
    description:
      "Turn your time and effort into practical support for people and communities that need it.",
    color: "bg-[#FFF0DF] text-[#C47A35]",
  },
];

const HomePage = async () => {
  let events: Event[] = [];
  let hasError = false;

  try {
    const result = await api.getUpcomingEvents();
    events = (result.data as Event[]).slice(0, 6);
  } catch (error) {
    console.error("Homepage events could not be loaded:", error);
    hasError = true;
  }

  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-background">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent-light px-4 py-2 text-sm font-semibold text-primary">
              <HeartHandshake size={17} />
              Together, We Can Make a Difference
            </span>

            <h1 className="mt-7 max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Small Acts.
              <span className="block text-primary">Stronger Communities.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-muted sm:text-lg">
              Discover meaningful volunteer opportunities, connect with
              compassionate people, and take part in activities that bring
              positive change to your community.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover hover:shadow-xl"
              >
                Explore Events
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 font-semibold text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary"
              >
                Become a Volunteer
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-muted">
              <span className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-secondary" />
                Community focused
              </span>

              <span className="flex items-center gap-2">
                <HeartHandshake size={17} className="text-primary" />
                Volunteer together
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-secondary/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-4xl border-8 border-card shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a"
                alt="Volunteers working together to support their community"
                width={900}
                height={700}
                priority
                className="h-90 w-full object-cover sm:h-112.5"
              />
            </div>

            <div className="absolute -bottom-5 left-3 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-xl sm:-left-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light text-primary">
                <HandHeart size={25} />
              </div>
              <div>
                <p className="font-bold text-foreground">Every Act Matters</p>
                <p className="text-xs text-muted">
                  Be part of something meaningful
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { value: "Community", label: "First approach", icon: UsersRound },
            {
              value: "Together",
              label: "Stronger connections",
              icon: HeartHandshake,
            },
            {
              value: "Action",
              label: "Meaningful participation",
              icon: CalendarCheck,
            },
            { value: "Change", label: "A better tomorrow", icon: Globe2 },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.value} className="text-center">
                <Icon size={25} className="mx-auto text-primary" />
                <h3 className="mt-3 text-xl font-extrabold text-foreground">
                  {item.value}
                </h3>
                <p className="mt-1 text-sm text-muted">{item.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-primary">
                Get Involved
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">
                Upcoming Community Events
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-muted">
                Find an opportunity to help, learn something new, and connect
                with people who want to make a difference.
              </p>
            </div>

            <Link
              href="/events"
              className="inline-flex w-fit items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              View All Events
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-10">
            {hasError ? (
              <div className="rounded-2xl border border-error/30 bg-card p-10 text-center">
                <p className="font-semibold text-foreground">
                  Events are temporarily unavailable.
                </p>
                <p className="mt-2 text-sm text-muted">
                  Please check that the Bondhon server is running and try again.
                </p>
              </div>
            ) : events.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card px-6 py-14 text-center">
                <CalendarCheck size={40} className="mx-auto text-primary" />
                <h3 className="mt-4 text-xl font-bold text-foreground">
                  New opportunities are on the way
                </h3>
                <p className="mt-2 text-sm text-muted">
                  There are no upcoming events available right now. Check back
                  soon for community activities.
                </p>
              </div>
            ) : (
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WHY BONDHON */}
      <section className="bg-accent-light/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Why Bondhon?
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">
              More Than Events. It&apos;s About People.
            </h2>

            <p className="mt-4 leading-7 text-muted">
              We make it easier for people to come together, support one
              another, and turn good intentions into action.
            </p>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${benefit.color}`}
                  >
                    <Icon size={27} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-foreground">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMMUNITY GALLERY */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Our Community
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl">
              Moments That Bring Us Together
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-muted">
              Every volunteer activity creates an opportunity to share kindness,
              build friendships, and inspire change.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((image) => (
              <div
                key={image.title}
                className="group relative h-64 overflow-hidden rounded-2xl bg-muted-background shadow-sm"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

                <h3 className="absolute bottom-5 left-5 font-bold text-white">
                  {image.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-background px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-[#211A19] px-6 py-16 text-center sm:px-12 lg:py-20">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white">
              <Sprout size={32} />
            </div>

            <h2 className="mt-7 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Your Community Needs People Like You.
            </h2>

            <p className="mt-5 leading-8 text-[#D6C5BD]">
              Whether you have an hour to spare or an idea worth sharing,
              there&apos;s a place for you at Bondhon. Start making a difference
              today.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover"
              >
                Join Bondhon
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
              >
                Find an Event
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
