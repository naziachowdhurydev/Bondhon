import Link from "next/link";
import CurrentYear from "./CurrentYear";
import {
  HeartHandshake,
  ArrowRight,
  Mail,
  Heart,
  CalendarDays,
} from "lucide-react";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/events" },
  { label: "Community", href: "/community" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const getInvolvedLinks = [
  { label: "Create an Event", href: "/create-event" },
  { label: "Manage Events", href: "/manage-events" },
  { label: "Joined Events", href: "/joined-events" },
  { label: "Sign Up", href: "/signup" },
];

const Footer = () => {
  return (
    <footer className="bg-[#211A19] text-[#FFF8F3]">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E76F51] text-white transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                <HeartHandshake size={27} />
              </span>

              <span className="text-2xl font-extrabold tracking-tight">
                Bondhon
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-[#D6C5BD]">
              Bringing people together through meaningful community activities.
              Discover opportunities, meet volunteers, and create positive
              change together.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#493B38] bg-[#302523] px-4 py-2 text-xs font-medium text-[#F4A261]">
              <Heart size={14} fill="currentColor" />
              Together, we make a difference
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-base font-bold text-white">Explore</h3>

            <div className="mt-6 space-y-4">
              {exploreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex w-fit items-center gap-2 text-sm text-[#D6C5BD] transition-colors duration-200 hover:text-[#F4A261]"
                >
                  <ArrowRight
                    size={14}
                    className="text-[#E76F51] transition-transform duration-200 group-hover:translate-x-1"
                  />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-base font-bold text-white">Get Involved</h3>

            <div className="mt-6 space-y-4">
              {getInvolvedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex w-fit items-center gap-2 text-sm text-[#D6C5BD] transition-colors duration-200 hover:text-[#F4A261]"
                >
                  <ArrowRight
                    size={14}
                    className="text-[#E76F51] transition-transform duration-200 group-hover:translate-x-1"
                  />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-bold text-white">Get in Touch</h3>

            <p className="mt-6 text-sm leading-7 text-[#D6C5BD]">
              Have a question or an idea for a community event? We&apos;d love
              to hear from you.
            </p>

            <div className="mt-5 space-y-4">
              <Link
                href="/contact"
                className="flex items-center gap-3 text-sm text-[#D6C5BD] transition-colors hover:text-[#F4A261]"
              >
                <Mail size={18} className="shrink-0 text-[#E76F51]" />
                Contact our team
              </Link>

              <Link
                href="/events"
                className="flex items-center gap-3 text-sm text-[#D6C5BD] transition-colors hover:text-[#F4A261]"
              >
                <CalendarDays size={18} className="shrink-0 text-[#E76F51]" />
                Discover events
              </Link>
            </div>

            <Link
              href="/events"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#E76F51] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-[#D85A3F] hover:shadow-lg hover:shadow-[#E76F51]/20"
            >
              Explore Events
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-[#493B38]" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-[#BFAFA8]">
            © <CurrentYear /> Bondhon. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-sm text-[#BFAFA8]">
            Made for communities, with
            <Heart size={15} fill="#E76F51" className="text-[#E76F51]" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
