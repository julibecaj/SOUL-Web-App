"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "../components/AppShell";
import { GlassCard, PageHeader } from "../components/AppContent";
import { ProfileCatalog } from "../components/CatalogViews";

type StoredUser = {
  id: number | string;
  fullName: string;
  username: string;
  email: string;
  avatarUrl: string | null;
};

function parseStoredUser(value: string | null): StoredUser | null {
  if (!value) return null;

  try {
    const user = JSON.parse(value) as Partial<StoredUser> & { name?: string };
    return {
      id: user.id ?? "",
      fullName: user.fullName ?? user.name ?? "SOUL Listener",
      username: user.username ?? "",
      email: user.email ?? "",
      avatarUrl: user.avatarUrl ?? null,
    };
  } catch {
    return null;
  }
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem("soul_token");

    if (!token) {
      router.replace("/login");
      return;
    }

    const storedUser = parseStoredUser(window.localStorage.getItem("soul_user"));
    if (storedUser) {
      setUser(storedUser);
      setIsLoading(false);
      return;
    }

    fetch("http://localhost:8080/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Profile request failed");
        return response.json() as Promise<StoredUser>;
      })
      .then((profile) => {
        const normalizedUser: StoredUser = {
          id: profile.id,
          fullName: profile.fullName || "SOUL Listener",
          username: profile.username || "",
          email: profile.email || "",
          avatarUrl: profile.avatarUrl || null,
        };
        window.localStorage.setItem("soul_user", JSON.stringify(normalizedUser));
        setUser(normalizedUser);
      })
      .catch(() => {
        window.localStorage.removeItem("soul_token");
        window.localStorage.removeItem("soul_user");
        router.replace("/login");
      })
      .finally(() => setIsLoading(false));
  }, [router]);

  if (isLoading || !user) {
    return (
      <AppShell>
        <PageHeader eyebrow="Your listening identity" title="Your profile." description="Tuning into your SOUL identity." />
        <div className="catalog-loading">
          {[0, 1, 2, 3].map((item) => <span key={item} />)}
        </div>
      </AppShell>
    );
  }

  const initials = user.fullName
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <AppShell>
      <PageHeader
        eyebrow={`@${user.username || "listener"}`}
        title={`${user.fullName}.`}
        description="The shape of your sound, calculated from what is playing in SOUL."
      />

      <GlassCard className="profile-hero-card">
        <div
          className={`profile-avatar ${user.avatarUrl ? "has-cover" : ""}`}
          style={user.avatarUrl ? {
            backgroundImage: `url("${user.avatarUrl}")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          } : undefined}
        >
          {!user.avatarUrl && initials}
        </div>
        <div className="profile-identity">
          <span>SOUL listener</span>
          <h2>{user.fullName}</h2>
          <p>@{user.username || "listener"} · {user.email}</p>
        </div>
      </GlassCard>

      <div className="real-profile-stats">
        <style>{`.real-profile-stats > .profile-hero-card { display: none; }`}</style>
        <ProfileCatalog />
      </div>
    </AppShell>
  );
}
