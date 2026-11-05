import { Skeleton } from "@/components/ui/skeleton";

const EventCardSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-border bg-card">
    <Skeleton className="h-52 w-full rounded-none" />
    <div className="space-y-4 p-5">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="space-y-3 border-t border-border pt-4">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Skeleton className="h-11 w-full rounded-xl" />
    </div>
  </div>
);

export const EventsPageSkeleton = () => (
  <section className="min-h-screen bg-background">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="w-full space-y-4 sm:max-w-2xl">
          <Skeleton className="h-8 w-40 rounded-full" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-full max-w-xl" />
        </div>
        <Skeleton className="h-12 w-40 rounded-xl" />
      </div>
      <Skeleton className="mb-8 h-20 w-full rounded-2xl" />
      <Skeleton className="mb-6 h-5 w-32" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    </div>
  </section>
);

export const EventDetailsSkeleton = () => (
  <main className="min-h-screen bg-background pb-20">
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <Skeleton className="h-10 w-32 rounded-full" />
      <div className="mt-4 flex min-h-[360px] flex-col justify-end rounded-3xl bg-muted-background p-5 sm:mt-5 sm:min-h-[400px] sm:rounded-4xl sm:p-7 lg:min-h-[480px] lg:p-12">
        <Skeleton className="h-9 w-36 rounded-full" />
        <Skeleton className="mt-5 h-5 w-56" />
        <Skeleton className="mt-4 h-14 w-full max-w-2xl" />
        <Skeleton className="mt-4 h-5 w-full max-w-xl" />
        <Skeleton className="mt-8 h-5 w-64" />
      </div>
      <div className="mx-auto mt-4 grid max-w-6xl gap-4 sm:mt-5 sm:gap-5 md:grid-cols-[minmax(0,1fr)_280px] lg:gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
          <Skeleton className="h-48 rounded-3xl" />
          <Skeleton className="h-64 rounded-3xl" />
        </div>
        <Skeleton className="h-96 rounded-3xl" />
      </div>
    </div>
  </main>
);

export const AccountPageSkeleton = () => (
  <section className="min-h-[75vh] bg-background px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
    <div className="mx-auto max-w-5xl">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="mt-5 h-10 w-72" />
      <Skeleton className="mt-3 h-5 w-full max-w-xl" />
      <div className="mt-8 space-y-5">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="h-36 rounded-2xl" />
        ))}
      </div>
    </div>
  </section>
);

export const FormPageSkeleton = () => (
  <section className="min-h-[75vh] bg-background px-4 py-12 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-5xl space-y-6">
      <Skeleton className="h-5 w-40" />
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-9">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="mt-3 h-5 w-full max-w-xl" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          ))}
        </div>
        <Skeleton className="mt-6 h-12 w-full rounded-xl" />
      </div>
    </div>
  </section>
);

export const HomePageSkeleton = () => (
  <div className="bg-background">
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-120 max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <Skeleton className="h-10 w-64 rounded-full" />
          <Skeleton className="mt-7 h-16 w-full max-w-xl" />
          <Skeleton className="mt-3 h-16 w-4/5" />
          <Skeleton className="mt-6 h-5 w-full max-w-xl" />
          <Skeleton className="mt-3 h-5 w-4/5" />
          <Skeleton className="mt-9 h-12 w-48 rounded-xl" />
        </div>
        <Skeleton className="hidden h-80 rounded-3xl lg:block" />
      </div>
    </section>
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Skeleton className="mx-auto h-10 w-80" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  </div>
);
