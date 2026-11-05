"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, HeartHandshake } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

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
    <section className="flex min-h-[80vh] items-center justify-center bg-background px-4 py-5 sm:py-6">
      <div className="w-full max-w-3xl rounded-3xl border border-border bg-card p-5 shadow-lg sm:p-6">
        <div className="mb-5 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <HeartHandshake size={23} />
          </div>

          <h1 className="mt-3 text-2xl font-bold text-foreground">
            Create an Account
          </h1>

          <p className="mt-2 text-sm text-muted">
            Join Bondhon and make a difference in your community.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground outline-none transition focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground outline-none transition focus:border-primary"
              required
            />
          </div>

          <div>
            <label
              htmlFor="signup-image"
              className="mb-1.5 block text-sm font-medium text-foreground"
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
              className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground outline-none transition focus:border-primary"
            />
            <p className="mt-1 text-[11px] leading-4 text-muted">
              Optional. You can add or change this later in your profile.
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full rounded-xl border border-border bg-background px-4 py-2 pr-12 text-sm text-foreground outline-none transition focus:border-primary"
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

            <p className="mt-1 text-[11px] leading-4 text-muted">
              6+ characters with uppercase and lowercase letters.
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full rounded-xl border border-border bg-background px-4 py-2 pr-12 text-sm text-foreground outline-none transition focus:border-primary"
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
            className="w-full self-end rounded-xl bg-primary py-2.5 font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted">OR CONTINUE WITH</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSocialLogin("google")}
            className="rounded-xl border border-border px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-card-hover disabled:opacity-60"
          >
            Google
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSocialLogin("github")}
            className="rounded-xl border border-border px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-card-hover disabled:opacity-60"
          >
            GitHub
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </section>
  );
}
