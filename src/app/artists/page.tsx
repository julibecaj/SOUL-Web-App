import type { Metadata } from "next";
import { AppShell } from "../components/AppShell";
import { PageHeader, SectionTitle } from "../components/AppContent";
import { ArtistsCatalog } from "../components/CatalogViews";

export const metadata: Metadata = { title: "Artists" };

export default function ArtistsPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Creators in your orbit" title="Artists." description="The voices behind your tracks, grouped by mood and genre." />
      <SectionTitle title="Listen by artist" />
      <ArtistsCatalog />
    </AppShell>
  );
}
