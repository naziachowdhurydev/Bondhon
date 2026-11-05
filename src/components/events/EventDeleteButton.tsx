"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { authApi } from "@/lib/auth-api";
import { authClient } from "@/lib/auth-client";
import type { Event } from "@/types/event";

interface EventDeleteButtonProps {
  event: Event;
  onDeleted?: () => void;
}

const EventDeleteButton = ({
  event,
  onDeleted,
}: EventDeleteButtonProps) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  const user = session?.user;
  const isCreator =
    Boolean(user) &&
    (event.creator?.userId === user?.id ||
      event.creator?.email?.toLowerCase() === user?.email.toLowerCase());

  if (isPending || !isCreator) {
    return null;
  }

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Delete "${event.title}"? This action cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      setIsDeleting(true);
      const result = await authApi.deleteEvent(event._id);
      if (result.success === false) {
        throw new Error(result.message || "Unable to delete this event.");
      }
      toast.success("Event deleted successfully.");
      onDeleted?.();
      router.refresh();
    } catch (error) {
      console.error("Failed to delete event:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to delete this event. Please try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-error/30 px-4 py-3 text-sm font-semibold text-error transition hover:bg-error/10 disabled:cursor-not-allowed disabled:opacity-60"
      aria-label={`Delete ${event.title}`}
    >
      {isDeleting ? (
        <LoaderCircle size={17} className="animate-spin" />
      ) : (
        <Trash2 size={17} />
      )}
      {isDeleting ? "Deleting..." : "Delete Event"}
    </button>
  );
};

export default EventDeleteButton;
