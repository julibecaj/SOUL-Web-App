import type { Metadata } from "next";
import { AppShell } from "../../components/AppShell";
import { PlaylistDetails } from "../../components/PlaylistDetails";

export const metadata: Metadata = { title: "Playlist" };

export default async function PlaylistDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AppShell>
      <PlaylistDetails playlistId={id} />
    </AppShell>
  );
}
