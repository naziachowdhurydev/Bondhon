import type { Metadata } from "next";
import AboutUs from "@/components/AboutUs";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn how Bondhon brings people together to discover community events, volunteer, and make a difference.",
};

const AboutPage = () => <AboutUs />;

export default AboutPage;
