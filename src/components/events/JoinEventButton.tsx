"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoaderCircle, UserRoundMinus } from "lucide-react";
import toast from "react-hot-toast";
import { authApi } from "@/lib/auth-api";
import { authClient } from "@/lib/auth-client";
import type { Event } from "@/types/event";

interface JoinEventButtonProps {
  eventId: string;
  creatorId?: string;
  creatorEmail?: string;
  participantIds: string[];
  participantEmails: string[];
  isPastEvent: boolean;
  onJoined: (event: Event) => void;
  onLeft: (event: Event) => void;
}

const buttonClassName =
  "flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60";

const JoinEventButton = ({
  eventId,
  creatorId,
  creatorEmail,
  participantIds,
  participantEmails,
  isPastEvent,
  onJoined,
  onLeft,
}: JoinEventButtonProps) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const userId = session?.user.id;
  const userEmail = session?.user.email;
  const isCreator =
    Boolean(session?.user) &&
    (creatorId === userId ||
      creatorEmail?.toLowerCase() === userEmail?.toLowerCase());
  const hasJoined =
    (userId ? participantIds.includes(userId) : false) ||
    (userEmail ? participantEmails.includes(userEmail) : false);

  const handleJoin = async () => {
    try {
      setIsJoining(true);
      const result = await authApi.joinEvent(eventId);
      onJoined(result.data);
      if (result.alreadyJoined) {
        toast("You have already joined this event.");
      } else {
        toast.success("You have joined this event!");
      }
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

  const handleLeave = async () => {
    try {
      setIsLeaving(true);
      const result = await authApi.leaveEvent(eventId);
      onLeft(result.data);
      toast.success("You have left this event.");
      router.refresh();
    } catch (error) {
      console.error("Failed to leave event:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to leave this event. Please try again.",
      );
    } finally {
      setIsLeaving(false);
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

  if (hasJoined) {
    return (
      <button
        type="button"
        className={`${buttonClassName} bg-error hover:bg-error/90`}
        onClick={handleLeave}
        disabled={isLeaving}
      >
        {isLeaving ? (
          <LoaderCircle size={18} className="animate-spin" />
        ) : (
          <UserRoundMinus size={18} />
        )}
        {isLeaving ? "Leaving..." : "Leave Event"}
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
    const callbackURL = `/events/${eventId}`;

    return (
      <Link
        href={`/login?callbackURL=${encodeURIComponent(callbackURL)}`}
        className={buttonClassName}
      >
        Sign in to join
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={buttonClassName}
      onClick={handleJoin}
      disabled={isJoining}
      aria-label={isCreator ? "Join your event" : "Join event"}
    >
      {isJoining && <LoaderCircle size={18} className="animate-spin" />}
      {isJoining
        ? "Joining..."
        : isCreator
          ? "Join Your Event"
          : "Join Event"}
    </button>
  );
};

export default JoinEventButton;
