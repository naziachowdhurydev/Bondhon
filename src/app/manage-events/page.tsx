import type { Metadata } from "next";
import ManageEventsPageClient from "@/components/events/ManageEventsPageClient";

export const metadata: Metadata = {
  title: "Manage Events",
  description: "View and manage the community events you created.",
};

const ManageEventsPage = () => <ManageEventsPageClient />;

export default ManageEventsPage;
