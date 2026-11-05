import { Send } from "lucide-react";

const NewsletterForm = () => {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row">
      <input
        type="email"
        aria-label="Email address"
        placeholder="Enter your email address"
        className="min-w-0 flex-1 rounded-xl border border-border bg-background px-5 py-3.5 text-foreground outline-none transition placeholder:text-muted focus:border-primary"
      />

      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition hover:bg-primary-hover"
      >
        Subscribe
        <Send size={17} />
      </button>
    </div>
  );
};

export default NewsletterForm;
