import type { Metadata } from "next";
import { AppShell } from "../components/AppShell";
import { PageHeader } from "../components/AppContent";
import { LibraryCatalog } from "../components/CatalogViews";

export const metadata: Metadata = { title: "Your Library" };

export default function LibraryPage() {
  return (
    <AppShell>
      <PageHeader eyebrow="Collected by you" title="Your Library." description="Saved sounds and familiar voices, all in one place." />
      <LibraryCatalog />
    </AppShell>
  );
}
