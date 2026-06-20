import type { Metadata } from "next";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/AppContent";
import { FavoritesCatalog } from "../components/CatalogViews";

export const metadata: Metadata = { title: "Favorites" };

export default function FavoritesPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Loved by you" title="Favorites." description="A polished home for the tracks you want closest." />
      <FavoritesCatalog />
    </AppShell>
  );
}
