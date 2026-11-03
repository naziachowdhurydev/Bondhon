import { api } from "@/lib/api";
import { Event } from "@/types/event";

const EventsPage = async () => {
  const result = await api.getUpcomingEvents();

  const events: Event[] = result.data;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>

        <p className="mt-2 text-muted-foreground">
          Discover upcoming social service events and make a difference.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">No upcoming events found.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event._id} className="rounded-xl border p-5 shadow-sm">
              <h2 className="text-xl font-semibold">{event.title}</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                {event.description}
              </p>

              <div className="mt-4 space-y-2 text-sm">
                <p>
                  <strong>Type:</strong> {event.eventType}
                </p>

                <p>
                  <strong>Location:</strong> {event.location}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.eventDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default EventsPage;
