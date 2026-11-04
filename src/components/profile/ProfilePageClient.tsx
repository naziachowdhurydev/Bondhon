"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  LoaderCircle,
  Mail,
  MapPin,
  Save,
  UserRound,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

interface ProfileUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

const ProfilePageClient = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login");
    }
  }, [isPending, router, user]);

  if (isPending || !user) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-background px-4">
        <div className="flex items-center gap-3 text-sm font-medium text-muted">
          <LoaderCircle size={20} className="animate-spin text-primary" />
          {isPending ? "Loading your profile..." : "Redirecting to sign in..."}
        </div>
      </section>
    );
  }

  return <ProfileEditor key={user.id} user={user} />;
};

const ProfileEditor = ({ user }: { user: ProfileUser }) => {
  const router = useRouter();
  const { refetch } = authClient.useSession();
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image ?? "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedName = name.trim();
    const updatedImage = image.trim();

    if (!updatedName) {
      toast.error("Please enter your name.");
      return;
    }

    if (updatedImage) {
      try {
        const imageUrl = new URL(updatedImage);
        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          throw new Error("Unsupported image URL protocol.");
        }
      } catch {
        toast.error("Please enter a valid HTTP or HTTPS image URL.");
        return;
      }
    }

    try {
      setIsSaving(true);
      const { error } = await authClient.updateUser({
        name: updatedName,
        image: updatedImage || null,
      });

      if (error) {
        toast.error(error.message || "Unable to update your profile.");
        return;
      }

      await refetch();
      toast.success("Your profile has been updated.");
      router.refresh();
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Unable to update your profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="min-h-[75vh] bg-background px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-primary"
        >
          <ArrowLeft size={17} />
          Back to home
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <aside className="h-fit rounded-3xl border border-border bg-card p-6 text-center shadow-sm sm:p-8">
            {user.image ? (
              <Image
                src={user.image}
                alt={`${user.name}'s profile photo`}
                width={104}
                height={104}
                className="mx-auto h-26 w-26 rounded-full border-4 border-accent-light object-cover"
                unoptimized
              />
            ) : (
              <div className="mx-auto flex h-26 w-26 items-center justify-center rounded-full bg-accent-light text-primary">
                <UserRound size={42} />
              </div>
            )}

            <h1 className="mt-5 break-words text-2xl font-bold text-foreground">
              {user.name}
            </h1>
            <p className="mt-1 break-all text-sm text-muted">{user.email}</p>

            <div className="mt-6 border-t border-border pt-5 text-left">
              <Link
                href="/joined-events"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-foreground transition hover:bg-muted-background hover:text-primary"
              >
                <CalendarDays size={18} className="text-primary" />
                View joined events
              </Link>
              <div className="flex items-center gap-3 px-3 py-3 text-sm text-muted">
                <MapPin size={18} className="text-secondary" />
                Making a difference with Bondhon
              </div>
            </div>
          </aside>

          <div className="rounded-3xl border border-border bg-card shadow-sm">
            <div className="border-b border-border bg-muted-background px-6 py-6 sm:px-8">
              <p className="text-sm font-semibold text-primary">
                Your Bondhon account
              </p>
              <h2 className="mt-1 text-2xl font-bold text-foreground">
                Profile details
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Keep your information up to date so your community knows who
                they&apos;re joining.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
              <div className="flex items-center gap-4 rounded-2xl bg-muted-background p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card text-primary">
                  <Mail size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted">Email address</p>
                  <p className="mt-1 break-all text-sm font-semibold text-foreground">
                    {user.email}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Email changes aren&apos;t available here.
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-2 block text-sm font-semibold text-foreground"
                >
                  Full name
                </label>
                <input
                  id="profile-name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={100}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="profile-image"
                  className="mb-2 block text-sm font-semibold text-foreground"
                >
                  Profile photo URL
                  <span className="ml-2 font-normal text-muted">Optional</span>
                </label>
                <input
                  id="profile-image"
                  type="url"
                  autoComplete="url"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder="https://example.com/your-photo.jpg"
                />
                <p className="mt-2 text-xs leading-5 text-muted">
                  Leave blank to use the default profile icon.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isSaving ? (
                  <LoaderCircle size={17} className="animate-spin" />
                ) : (
                  <Save size={17} />
                )}
                {isSaving ? "Saving..." : "Save changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePageClient;
