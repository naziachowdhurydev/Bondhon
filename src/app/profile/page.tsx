import type { Metadata } from "next";
import ProfilePageClient from "@/components/profile/ProfilePageClient";

export const metadata: Metadata = {
  title: "My Profile",
  description: "View and update your Bondhon profile.",
};

const ProfilePage = () => <ProfilePageClient />;

export default ProfilePage;
