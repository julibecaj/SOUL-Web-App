"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
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
            <span className="profile-dot">AM</span>
            <span className="profile-copy">
              <strong>Alex Morgan</strong>
              <small>My Profile</small>
            </span>
            <Icon name="arrow" className="profile-arrow h-3.5 w-3.5" />
          </Link>
        </aside>

        <section className="dashboard-main">
          <div className="mobile-app-bar">
            <Brand />
            <Link href="/profile" className="mobile-profile" aria-label="My Profile">AM</Link>
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
