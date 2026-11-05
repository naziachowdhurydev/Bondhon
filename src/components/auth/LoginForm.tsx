"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, HeartHandshake } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import GoogleIcon, { GithubIcon } from "./GoogleIcon";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCallbackURL = () => {
    const callbackURL = new URLSearchParams(window.location.search).get(
      "callbackURL",
    );

    return callbackURL?.startsWith("/") && !callbackURL.startsWith("//")
      ? callbackURL
      : "/";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: getCallbackURL(),
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      toast.success("Welcome back to Bondhon!");

      await authClient.getSession();

      router.replace(getCallbackURL());
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      setLoading(true);

      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: getCallbackURL(),
        ...(provider === "google"
          ? { additionalParams: { prompt: "select_account" } }
          : {}),
      });

      if (error) {
        toast.error(error.message || "Social login failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to connect to the provider.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-[26rem] rounded-3xl border border-border bg-card p-6 shadow-lg sm:p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
            <HeartHandshake size={26} />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-foreground sm:text-[1.7rem]">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-muted">
            Log in to continue making a difference with Bondhon.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 pr-12 text-sm text-foreground outline-none transition focus:border-primary"
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-3 font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted">OR CONTINUE WITH</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSocialLogin("google")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:bg-card-hover disabled:opacity-60"
          >
            <GoogleIcon />
            Google
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSocialLogin("github")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:bg-card-hover disabled:opacity-60"
          >
            <GithubIcon />
            GitHub
          </button>
        </div>

        <p className="mt-7 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </section>
  );
}
