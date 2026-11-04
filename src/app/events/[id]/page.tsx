import { connection } from "next/server";
import { notFound } from "next/navigation";
import EventDetailsView from "@/components/events/EventDetailsView";
import { api } from "@/lib/api";
import type { Event } from "@/types/event";

export const instant = false;

interface PageProps {
  params: Promise<{ id: string }>;
}

const EventDetailsPage = async ({ params }: PageProps) => {
  await connection();

  const { id } = await params;
  const result = await api.getEventById(id);

  if (!result?.success || !result?.data) {
    notFound();
  }

  const event: Event = result.data;

  return <EventDetailsView event={event} />;
};

export default EventDetailsPage;
