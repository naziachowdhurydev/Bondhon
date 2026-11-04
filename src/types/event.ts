
export type EventType =
  | "Cleanup"
  | "Plantation"
  | "Donation"
  | "Education"
  | "Food Distribution"
  | "Health Camp";

export interface EventParticipant {
  userId?: string;
  name: string;
  email: string;
  joinedAt: string;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: EventType;
  thumbnail: string;
  location: string;
  eventDate: string;

  creator: {
    userId?: string;
    name: string;
    email: string;
  };

  participants: EventParticipant[];

  participantCount?: number;
  createdAt: string;
  updatedAt: string;
}
