import { authClient } from "./auth-client";
import type { Event } from "@/types/event";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export type EventCreateInput = Pick<
  Event,
  | "title"
  | "description"
  | "eventType"
  | "thumbnail"
  | "location"
  | "eventDate"
  | "creator"
>;

export type EventUpdateInput = Pick<
  Event,
  | "title"
  | "description"
  | "eventType"
  | "thumbnail"
  | "location"
  | "eventDate"
>;

interface JoinEventResponse extends ApiResponse<Event> {
  alreadyJoined: boolean;
}

type LeaveEventResponse = ApiResponse<Event>;
interface EventMutationResponse {
  success: boolean;
  message?: string;
}
interface DeleteEventResponse {
  success: boolean;
  message?: string;
}

const getHeaders = async () => {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Please sign in to continue.");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${data.token}`,
  };
};

const request = async <T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const headers = await getHeaders();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  const result: unknown = await response.json();

  if (!response.ok) {
    const message =
      typeof result === "object" &&
      result !== null &&
      "message" in result &&
      typeof result.message === "string"
        ? result.message
        : "Something went wrong.";
    throw new Error(message);
  }

  return result as T;
};

export const authApi = {
  createEvent: (eventData: EventCreateInput) =>
    request<ApiResponse<Event>>("/api/events", {
      method: "POST",
      body: JSON.stringify(eventData),
    }),

  updateEvent: (id: string, eventData: EventUpdateInput) =>
    request<EventMutationResponse>(`/api/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(eventData),
    }),

  deleteEvent: (id: string) =>
    request<DeleteEventResponse>(`/api/events/${id}`, {
      method: "DELETE",
    }),

  getMyEvents: () => request<ApiResponse<Event[]>>("/api/events/my-events"),

  joinEvent: (eventId: string) =>
    request<JoinEventResponse>(`/api/joined-events/${eventId}`, {
      method: "POST",
    }),

  getJoinedEvents: () =>
    request<ApiResponse<Event[]>>("/api/joined-events"),

  leaveEvent: (eventId: string) =>
    request<LeaveEventResponse>(`/api/joined-events/${eventId}`, {
      method: "DELETE",
    }),
};