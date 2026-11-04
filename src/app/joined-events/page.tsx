import type { Metadata } from "next";
import JoinedEventsPageClient from "@/components/profile/JoinedEventsPageClient";

export const metadata: Metadata = {
  title: "Joined Events",
  description: "View the community events you have joined on Bondhon.",
};

const JoinedEventsPage = () => <JoinedEventsPageClient />;

export default JoinedEventsPage;
