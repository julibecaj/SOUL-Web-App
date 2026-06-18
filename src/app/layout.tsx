import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SOUL — Music, felt differently",
    template: "%s | SOUL",
  },
  description:
    "A cinematic home for music, podcasts, artists, and the stories that stay with you.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
