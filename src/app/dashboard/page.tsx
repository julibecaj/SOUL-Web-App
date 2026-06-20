import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/AppContent";
import { DashboardCatalog } from "../components/CatalogViews";
import { Icon } from "../components/Icon";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Good evening, Alex" title="Your SOUL." description="Return to the sounds, voices, and artists moving with you." />
      <div className="dashboard-hero">
        <div>
          <p>Made for your evening</p>
          <h2>Late-night colors<br />and slower rhythms.</h2>
          <Link href="/playlists" className="hero-inline-link">Listen now <Icon name="play" className="h-3.5 w-3.5" /></Link>
        </div>
      </div>
      <DashboardCatalog />
    </AppShell>
  );
}
