import Link from "next/link";
import {
  ArrowRight,
  HandHeart,
  HeartHandshake,
  Leaf,
  MapPin,
  Sparkles,
  UsersRound,
} from "lucide-react";

const iconMap = {
  HeartHandshake,
  Leaf,
  Sparkles,
};

type AboutFeature = {
  id: string;
  icon: keyof typeof iconMap;
  title: string;
  description: string;
};

type AboutFeaturesResponse = {
  success: boolean;
  message: string;
  data: AboutFeature[];
};

const steps = [
  {
    number: "01",
    title: "Find your cause",
    description:
      "Explore community events and discover the work that speaks to you.",
  },
  {
    number: "02",
    title: "Show up together",
    description:
      "Meet local organizers and volunteers who care about the same things.",
  },
  {
    number: "03",
    title: "Make a difference",
    description:
      "Turn a little time and care into a meaningful community impact.",
  },
];

const AboutUs = async () => {
  let values: AboutFeature[] = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/about/features`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch About features");
    }

    const result: AboutFeaturesResponse = await response.json();

    if (result.success && Array.isArray(result.data)) {
      values = result.data;
    }
  } catch (error) {
    console.error("Error fetching About features:", error);
  }

  return (
    <div className="overflow-hidden bg-background">
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1800')",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/95 to-background/65" />
        </div>

        <div className="mx-auto grid min-h-110 max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card/90 px-4 py-2 text-sm font-semibold text-primary">
              <HeartHandshake size={17} />
              About Bondhon
            </span>

            <h1 className="mt-6 text-4xl leading-tight font-extrabold text-foreground sm:text-5xl lg:text-6xl">
              Good things happen
              <span className="block text-primary">when we come together.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
              Bondhon brings people and purpose closer. We help you discover
              community events, meet people who care, and turn the desire to
              help into action.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition hover:bg-primary-hover"
              >
                Find an event <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:ml-auto">
            <div className="absolute -inset-3 rotate-3 rounded-4xl bg-accent/30" />

            <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card p-7 shadow-xl sm:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-light text-primary">
                <HandHeart size={29} />
              </div>

              <p className="mt-6 text-sm font-bold tracking-widest text-primary uppercase">
                Our purpose
              </p>

              <h2 className="mt-3 text-2xl leading-snug font-bold text-foreground sm:text-3xl">
                Make it easier for people to care, connect, and take action.
              </h2>

              <p className="mt-4 leading-7 text-muted">
                We believe a stronger community grows when helping out feels
                accessible, welcoming, and shared.
              </p>

              <div className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                <MapPin size={19} className="shrink-0 text-secondary" />
                <span className="text-sm font-medium text-foreground">
                  Rooted in community. Open to everyone.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
          <div>
            <span className="text-sm font-bold tracking-widest text-primary uppercase">
              Why Bondhon
            </span>

            <h2 className="mt-3 text-3xl leading-tight font-bold text-foreground sm:text-4xl">
              Connection is where change begins.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-muted">
            <p>
              It can be hard to know where to start when you want to help.
              Bondhon brings community initiatives into one place, so finding an
              opportunity and joining in feels simple.
            </p>

            <p>
              From neighborhood cleanups to education and community support,
              every event is a chance to meet people, share what you can, and
              make a difference side by side.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold tracking-widest text-primary uppercase">
              What guides us
            </span>

            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              A community built on care
            </h2>

            <p className="mt-4 leading-7 text-muted">
              The way we show up matters as much as the work we do.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map(({ id, icon, title, description }) => {
              const Icon = iconMap[icon];

              return (
                <article
                  key={id}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light text-primary">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-foreground">
                    {title}
                  </h3>

                  <p className="mt-3 leading-7 text-muted">{description}</p>
                </article>
              );
            })}
          </div>

          {values.length === 0 && (
            <p className="mt-8 text-center text-muted">
              About features are currently unavailable.
            </p>
          )}
        </div>
      </section>

      <section className="bg-muted-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <span className="text-sm font-bold tracking-widest text-primary uppercase">
                Get involved
              </span>

              <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                Your next good thing starts here.
              </h2>

              <p className="mt-4 leading-7 text-muted">
                You don&apos;t need a special skill or a lot of free time. Just
                find an opportunity that feels right and take the first step.
              </p>

              <Link
                href="/events"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-primary transition hover:text-primary-hover"
              >
                Browse community events <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-border bg-card p-5 sm:p-6"
                >
                  <span className="text-sm font-extrabold tracking-widest text-secondary">
                    {step.number}
                  </span>

                  <h3 className="mt-4 font-bold text-foreground">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary px-4 py-14 text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <UsersRound size={30} className="mt-1 shrink-0" />

            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                There&apos;s a place for you here.
              </h2>

              <p className="mt-2 max-w-xl leading-7 text-white/85">
                Find your people, discover a cause, and help make your community
                stronger.
              </p>
            </div>
          </div>

          <Link
            href="/events"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 font-semibold text-primary transition hover:bg-accent-light"
          >
            Explore Events <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
