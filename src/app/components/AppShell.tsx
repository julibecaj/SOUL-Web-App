"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Brand } from "./Brand";
import { Icon } from "./Icon";

const primaryNav = [
  { label: "Dashboard", href: "/dashboard", icon: "home" },
  { label: "Playlists", href: "/playlists", icon: "playlist" },
  { label: "Your Library", href: "/library", icon: "album" },
];

const collectionNav = [
  { label: "Albums", href: "/albums", icon: "album" },
  { label: "Podcasts", href: "/podcasts", icon: "podcast" },
  { label: "Favorites", href: "/favorites", icon: "heart" },
  { label: "Artists", href: "/artists", icon: "artist" },
  { label: "Uploads", href: "/uploads", icon: "upload" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("soul_token");

    if (!token) {
      router.replace("/login");
      return;
    }

    setIsAuthenticated(true);
  }, [router]);

  const handleLogout = () => {
    window.localStorage.removeItem("soul_token");
    window.localStorage.removeItem("soul_user");
    router.replace("/login");
    router.refresh();
  };

  const navLink = (item: (typeof primaryNav)[number]) => (
    <Link
      href={item.href}
      className={pathname === item.href ? "is-active" : ""}
      key={item.href}
    >
      <Icon name={item.icon} className="h-4 w-4" />
      <span>{item.label}</span>
    </Link>
  );

  if (!isAuthenticated) {
    return (
      <main className="dashboard-shell grid min-h-screen place-items-center">
        <div className="app-aurora app-aurora-one" />
        <div className="app-aurora app-aurora-two" />
        <div className="relative z-10 flex flex-col items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.03] px-12 py-10 backdrop-blur-2xl">
          <Brand />
          <Icon name="wave" className="h-7 w-7 text-cyan-200" />
          <p className="text-xs uppercase tracking-[0.24em] text-white/35">
            Tuning into your SOUL
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-shell">
      <div className="app-aurora app-aurora-one" />
      <div className="app-aurora app-aurora-two" />
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <Brand />
          <nav className="dashboard-nav" aria-label="Main navigation">
            {primaryNav.map(navLink)}
            <p className="sidebar-label">Your collection</p>
            {collectionNav.map(navLink)}
          </nav>
          <Link href="/profile" className={`dashboard-profile ${pathname === "/profile" ? "is-active" : ""}`}>
            <span className="profile-dot">AC</span>
            <span className="profile-copy">
              <strong>Alex Carter</strong>
              <small>My Profile</small>
            </span>
            <Icon name="arrow" className="profile-arrow h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs text-white/40 transition hover:bg-white/5 hover:text-white"
          >
            <Icon name="back" className="h-4 w-4" />
            <span className="profile-copy">Logout</span>
          </button>
        </aside>

        <section className="dashboard-main">
          <div className="mobile-app-bar">
            <Brand />
            <div className="flex items-center gap-2">
              <button type="button" onClick={handleLogout} className="button-ghost" aria-label="Logout">Logout</button>
              <Link href="/profile" className="mobile-profile" aria-label="My Profile">AC</Link>
            </div>
          </div>
          {children}
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {primaryNav.map((item) => (
              <Link href={item.href} className={pathname === item.href ? "is-active" : ""} key={item.href}>
                <Icon name={item.icon} className="h-5 w-5" />
                <span>{item.label === "Your Library" ? "Library" : item.label}</span>
              </Link>
            ))}
            <Link href="/profile" className={pathname === "/profile" ? "is-active" : ""}>
              <Icon name="artist" className="h-5 w-5" />
              <span>Profile</span>
            </Link>
          </nav>
        </section>
      </div>
    </main>
  );
}
