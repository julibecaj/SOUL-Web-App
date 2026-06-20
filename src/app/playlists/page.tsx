import type { Metadata } from "next";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/AppContent";
import { PlaylistsCatalog } from "../components/CatalogViews";

export const metadata: Metadata = { title: "Playlists" };

export default function PlaylistsPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Your worlds" title="Playlists." description="Three distinct frequencies shaped from the music available to you." />
      <PlaylistsCatalog />
    </AppShell>
  );
}
