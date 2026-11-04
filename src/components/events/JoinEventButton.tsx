"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { authApi } from "@/lib/auth-api";
import { authClient } from "@/lib/auth-client";

interface JoinEventButtonProps {
  eventId: string;
  creatorId: string;
  participantIds: string[];
  isPastEvent: boolean;
}

const buttonClassName =
  "flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60";

const JoinEventButton = ({
  eventId,
  creatorId,
  participantIds,
  isPastEvent,
}: JoinEventButtonProps) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isJoining, setIsJoining] = useState(false);
  const [didJoin, setDidJoin] = useState(false);

  const userId = session?.user.id;
  const hasJoined =
    didJoin || (userId ? participantIds.includes(userId) : false);

  const handleJoin = async () => {
    try {
      setIsJoining(true);
      await authApi.joinEvent(eventId);
      setDidJoin(true);
      toast.success("You have joined this event!");
      router.refresh();
    } catch (error) {
      console.error("Failed to join event:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to join this event. Please try again.",
      );
    } finally {
      setIsJoining(false);
    }
  };

  if (isPending) {
    return (
      <button type="button" className={buttonClassName} disabled>
        <LoaderCircle size={18} className="animate-spin" />
        Checking sign-in...
      </button>
    );
  }

  if (isPastEvent) {
    return (
      <button type="button" className={buttonClassName} disabled>
        Event has ended
      </button>
    );
  }

  if (!userId) {
    return (
      <Link href="/login" className={buttonClassName}>
        Sign in to join
      </Link>
    );
  }

  if (userId === creatorId) {
    return (
      <button type="button" className={buttonClassName} disabled>
        Your event
      </button>
    );
  }

  if (hasJoined) {
    return (
      <button type="button" className={buttonClassName} disabled>
        Already joined
      </button>
    );
  }

  return (
    <button
      type="button"
      className={buttonClassName}
      onClick={handleJoin}
      disabled={isJoining}
    >
      {isJoining && <LoaderCircle size={18} className="animate-spin" />}
      {isJoining ? "Joining..." : "Join Event"}
    </button>
  );
};

export default JoinEventButton;
