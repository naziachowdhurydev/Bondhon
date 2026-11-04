import { authClient } from "./auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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

const request = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const headers = await getHeaders();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong.");
  }

  return result;
};

export const authApi = {
  createEvent: (eventData: object) =>
    request("/api/events", {
      method: "POST",
      body: JSON.stringify(eventData),
    }),

  updateEvent: (id: string, eventData: object) =>
    request(`/api/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(eventData),
    }),

  deleteEvent: (id: string) =>
    request(`/api/events/${id}`, {
      method: "DELETE",
    }),

  getMyEvents: () =>
    request("/api/events/my-events"),

  joinEvent: (eventId: string) =>
    request(`/api/joined-events/${eventId}`, {
      method: "POST",
    }),

  getJoinedEvents: () =>
    request("/api/joined-events"),

  leaveEvent: (eventId: string) =>
    request(`/api/joined-events/${eventId}`, {
      method: "DELETE",
    }),
};