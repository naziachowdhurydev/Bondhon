"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarPlus, LoaderCircle, RotateCw } from "lucide-react";
import { authApi } from "@/lib/auth-api";
import { authClient } from "@/lib/auth-client";

type CreatedEventsStatus = "checking" | "has-events" | "no-events" | "error";
interface CreatedEventsLookup {
  userId: string;
  status: Exclude<CreatedEventsStatus, "checking">;
}

const ManageEventsFooterLink = () => {
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user.id;
  const [lookup, setLookup] = useState<CreatedEventsLookup | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const status =
    lookup && lookup.userId === userId ? lookup.status : "checking";

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (!userId) {
      return;
    }

    let active = true;

    const loadCreatedEvents = async () => {
      try {
        const result = await authApi.getMyEvents();
        if (!result.success || !Array.isArray(result.data)) {
          throw new Error(result.message || "Unable to check your events.");
        }

        if (active) {
          setLookup({
            userId,
            status: result.data.length > 0 ? "has-events" : "no-events",
          });
        }
      } catch (error) {
        console.error("Failed to check created events for footer:", error);
        if (active) {
          setLookup({ userId, status: "error" });
        }
      }
    };

    void loadCreatedEvents();
    return () => {
      active = false;
    };
  }, [isPending, retryCount, userId]);

  const linkClassName =
    "group flex w-fit items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-primary";

  if (isPending || (userId && status === "checking")) {
    return (
      <span className={`${linkClassName} cursor-default`}>
        <LoaderCircle size={14} className="animate-spin text-primary" />
        Checking your events
      </span>
    );
  }

  if (!userId) {
    return (
      <Link href="/create-event" className={linkClassName}>
        <ArrowRight
          size={14}
          className="text-primary transition-transform duration-200 group-hover:translate-x-1"
        />
        Create an Event
        <CalendarPlus size={15} className="text-primary" />
      </Link>
    );
  }

  if (status === "error") {
    return (
      <button
        type="button"
        onClick={() => setRetryCount((count) => count + 1)}
        className={linkClassName}
      >
        <RotateCw size={14} className="text-primary" />
        Retry checking your events
      </button>
    );
  }

  const hasCreatedEvents = status === "has-events";

  return (
    <Link
      href={hasCreatedEvents ? "/manage-events" : "/create-event"}
      className={linkClassName}
    >
      <ArrowRight
        size={14}
        className="text-primary transition-transform duration-200 group-hover:translate-x-1"
      />
      {hasCreatedEvents ? "Manage Events" : "Create an Event"}
      <CalendarPlus size={15} className="text-primary" />
    </Link>
  );
};

export default ManageEventsFooterLink;
