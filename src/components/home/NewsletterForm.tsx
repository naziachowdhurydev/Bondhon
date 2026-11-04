"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Frontend demonstration only. Connect a newsletter API to save subscriptions.
    toast.success("Thank you for your interest in Bondhon!");
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        required
        className="min-w-0 flex-1 rounded-xl border border-border bg-card px-5 py-3.5 text-foreground outline-none transition placeholder:text-muted focus:border-primary"
      />

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition hover:bg-primary-hover"
      >
        Subscribe
        <Send size={17} />
      </button>
    </form>
  );
};

export default NewsletterForm;
