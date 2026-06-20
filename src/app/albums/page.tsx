import type { Metadata } from "next";
import { AppShell } from "../components/AppShell";
import { PageHeader, SectionTitle } from "../components/AppContent";
import { AlbumsCatalog } from "../components/CatalogViews";

export const metadata: Metadata = { title: "Albums" };

export default function AlbumsPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Full-length feelings" title="Albums." description="Your available tracks, gathered into the records they belong to." />
      <SectionTitle title="In your rotation" />
      <AlbumsCatalog />
    </AppShell>
  );
}
