import { connection } from "next/server";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import type { Event } from "@/types/event";
import EventDetailsView from "@/components/events/EventDetailsView";

interface PageProps {
  params: Promise<{ id: string }>;
}

const EventDetailsPage = async ({ params }: PageProps) => {
  await connection();

  const { id } = await params;

  let result;

  try {
    result = await api.getEventById(id);
  } catch (error) {
    console.error("Event details API error:", error);
    throw error;
  }

  if (!result?.success || !result?.data) {
    notFound();
  }

  const event: Event = result.data;

  return <EventDetailsView event={event} />;
};

export default EventDetailsPage;
