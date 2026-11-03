export type EventType =
  | "Cleanup"
  | "Plantation"
  | "Donation"
  | "Education"
  | "Food Distribution"
  | "Health Camp";

export interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: EventType;
  thumbnail: string;
  location: string;
  eventDate: string;

  creator: {
    name: string;
    email: string;
  };

  participants: {
    name: string;
    email: string;
    joinedAt: string;
  }[];

  createdAt: string;
  updatedAt: string;
}