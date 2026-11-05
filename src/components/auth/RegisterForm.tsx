"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, HeartHandshake, UsersRound } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import GoogleIcon, { GithubIcon } from "./GoogleIcon";

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validatePassword = (value: string) => {
    return value.length >= 6 && /[A-Z]/.test(value) && /[a-z]/.test(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const profileImage = image.trim();
    if (profileImage) {
      try {
        const imageUrl = new URL(profileImage);
        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          throw new Error("Unsupported image URL protocol.");
        }
      } catch {
        toast.error("Please enter a valid HTTP or HTTPS image URL.");
        return;
      }
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must contain at least 6 characters, one uppercase and one lowercase letter.",
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: cleanEmail,
        password,
        ...(profileImage ? { image: profileImage } : {}),
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
        return;
      }

      toast.success("Account created successfully!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      setLoading(true);

      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        ...(provider === "google"
          ? { additionalParams: { prompt: "select_account" } }
          : {}),
      });

      if (error) {
        toast.error(error.message || "Social login failed.");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to connect to the provider.");
      setLoading(false);
    }
  };

  return (
    <section className="relative isolate flex min-h-[80vh] items-center justify-center overflow-hidden bg-background px-4 py-8 sm:py-10">
      <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-8 -z-10 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-foreground/5 lg:grid-cols-[0.78fr_1.22fr]">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-primary p-9 text-white lg:flex xl:p-11">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/15" />
          <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full border border-white/15" />
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <HeartHandshake size={27} />
            </div>
            <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-white/75">
              Small acts. Real change.
            </p>
            <h2 className="mt-3 text-4xl font-bold leading-tight">
              Good things happen when we show up.
            </h2>
            <p className="mt-4 text-sm leading-6 text-white/85">
              Find your people, lend a hand, and help make your community a
              better place.
            </p>
          </div>
          <div className="relative flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-4">
            <UsersRound size={22} />
            <p className="text-sm font-medium">
              Meet neighbors who care about the same things you do.
            </p>
          </div>
        </aside>

        <div className="p-5 sm:p-8 lg:p-9">
          <div className="mb-6">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-light text-primary">
                <HeartHandshake size={23} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                  Join the community
                </p>
                <h1 className="mt-0.5 text-2xl font-bold text-foreground">
                  Create an Account
                </h1>
              </div>
            </div>

            <p className="mt-3 text-center text-sm text-muted lg:text-left">
              Join Bondhon and make a difference in your community.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2"
          >
          <div>
            <label className="mb-2 block text-[13px] font-semibold text-foreground">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-border bg-muted-background/50 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-semibold text-foreground">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-border bg-muted-background/50 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10"
              required
            />
          </div>

          <div>
            <label
              htmlFor="signup-image"
              className="mb-2 block text-[13px] font-semibold text-foreground"
            >
              Profile Image URL{" "}
              <span className="font-normal text-muted">(Optional)</span>
            </label>

            <input
              id="signup-image"
              type="url"
              autoComplete="url"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              placeholder="https://example.com/your-photo.jpg"
              className="w-full rounded-xl border border-border bg-muted-background/50 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10"
            />
            <p className="mt-1.5 text-[11px] leading-4 text-muted">
              Optional. You can add or change this later in your profile.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-semibold text-foreground">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full rounded-xl border border-border bg-muted-background/50 px-4 py-3 pr-12 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            <p className="mt-1.5 text-[11px] leading-4 text-muted">
              6+ characters with uppercase and lowercase letters.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-semibold text-foreground">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full rounded-xl border border-border bg-muted-background/50 px-4 py-3 pr-12 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10"
                required
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full self-end rounded-xl bg-primary py-3 font-semibold text-white shadow-sm shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted">OR CONTINUE WITH</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialLogin("google")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card-hover hover:shadow-sm disabled:opacity-60"
            >
              <GoogleIcon />
              Google
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialLogin("github")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card-hover hover:shadow-sm disabled:opacity-60"
            >
              <GithubIcon />
              GitHub
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
