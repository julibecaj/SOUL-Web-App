type IconName =
  | "arrow"
  | "play"
  | "heart"
  | "wave"
  | "headphones"
  | "spark"
  | "back"
  | "home"
  | "album"
  | "podcast"
  | "playlist"
  | "artist"
  | "upload"
  | "search"
  | "clock"
  | "plus"
  | "pause"
  | "previous"
  | "next"
  | "trash";

export function Icon({ name, className = "" }: { name: string; className?: string }) {
  const props = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    play: <path d="m9 7 8 5-8 5V7Z" fill="currentColor" stroke="none" />,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    wave: <><path d="M3 12v2" /><path d="M7 8v8" /><path d="M11 4v16" /><path d="M15 7v10" /><path d="M19 10v4" /></>,
    headphones: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><path d="M4 14h3v6H5a1 1 0 0 1-1-1v-5Z" /><path d="M20 14h-3v6h2a1 1 0 0 0 1-1v-5Z" /></>,
    spark: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></>,
    back: <><path d="M19 12H5" /><path d="m10 17-5-5 5-5" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10" /></>,
    album: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2" /><path d="M12 3v7" /></>,
    podcast: <><circle cx="12" cy="11" r="3" /><path d="M6.3 17.7a8 8 0 1 1 11.4 0" /><path d="m10 14 1 7h2l1-7" /></>,
    playlist: <><path d="M4 6h11M4 11h11M4 16h7" /><path d="m16 15 4-2v5" /><circle cx="16" cy="19" r="2" /></>,
    artist: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    upload: <><path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M4 15v5h16v-5" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    pause: <><path d="M9 7v10" /><path d="M15 7v10" /></>,
    previous: <><path d="M6 6v12" /><path d="m18 7-8 5 8 5V7Z" fill="currentColor" stroke="none" /></>,
    next: <><path d="M18 6v12" /><path d="m6 7 8 5-8 5V7Z" fill="currentColor" stroke="none" /></>,
    trash: <><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="m6 7 1 13h10l1-13" /></>,
  };

  return <svg {...props}>{paths[name as IconName] ?? paths.spark}</svg>;
}
