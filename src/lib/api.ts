const API_URL =
  process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL}`;

export const api = {
  getUpcomingEvents: async () => {
    const response = await fetch(`${API_URL}/api/events`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to load upcoming events.");
    }

    return response.json();
  },

  getEventById: async (id: string) => {
    const response = await fetch(`${API_URL}/api/events/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to load event.");
    }

    return response.json();
  },
};
