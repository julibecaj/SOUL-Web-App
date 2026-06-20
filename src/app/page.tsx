import Link from "next/link";
import { Brand } from "./components/Brand";
import { Icon } from "./components/Icon";
import { Player } from "./components/Player";
import { BackendTrackTable } from "./components/TrackList";
import { HomeAlbumGrid } from "./components/CatalogViews";
import { LiveTrackArt } from "./components/LiveTrackArt";

const features = [
  {
    icon: "headphones",
    label: "For listeners",
    title: "Music that meets you there.",
    copy: "Discover sounds shaped around your mood, your memories, and the moment you are in.",
    className: "feature-violet",
  },
  {
    icon: "spark",
    label: "For artists",
    title: "A stage for honest work.",
    copy: "Share music and stories in a space designed to make the art—not the algorithm—the focus.",
    className: "feature-cyan",
  },
  {
    icon: "wave",
    label: "The SOUL brand",
    title: "Streaming with a pulse.",
    copy: "Cinematic design, intentional discovery, and an identity that feels alive after dark.",
    className: "feature-gold",
  },
];

export default function Home() {
  return (
    <main className="site-shell overflow-hidden">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <nav className="nav-glass">
        <div className="page-wrap flex h-20 items-center justify-between">
          <Brand />
          <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
            <a href="#discover" className="nav-link">Discover</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#artists" className="nav-link">For artists</a>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login" className="button-ghost hidden sm:inline-flex">Sign in</Link>
            <Link href="/register" className="button-small">Join SOUL</Link>
          </div>
        </div>
      </nav>

      <section className="page-wrap hero-grid min-h-[860px] items-center pb-24 pt-36 lg:min-h-screen">
        <div className="relative z-10">
          <div className="eyebrow reveal">Music, felt differently</div>
          <h1 className="hero-title reveal reveal-delay-1">
            Find your
            <span className="block text-gradient">SOUL.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/58 reveal reveal-delay-2">
            A cinematic home for the music, voices, and stories that stay
            with you long after the sound fades.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row reveal reveal-delay-3">
            <Link href="/register" className="button-primary">
              Start listening <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <a href="#experience" className="button-secondary">
              <Icon name="play" className="h-4 w-4" /> View experience
            </a>
          </div>
          <div className="mt-14 flex items-center gap-8 text-xs uppercase tracking-[0.22em] text-white/35 reveal reveal-delay-3">
            <span>Curated daily</span>
            <span className="h-px w-8 bg-white/20" />
            <span>Made for feeling</span>
          </div>
        </div>

        <div className="hero-visual reveal reveal-delay-2">
          <div className="vinyl-orbit">
            <div className="vinyl">
              <LiveTrackArt variant="vinyl" />
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-card-art album-violet">
              <span className="art-noise" />
              <span className="art-orb" />
              <LiveTrackArt variant="hero" />
            </div>
            <Player compact />
          </div>
          <div className="floating-note">
            <Icon name="wave" className="h-5 w-5 text-cyan-200" />
            <div>
              <strong>12,842</strong>
              <span>feeling this now</span>
            </div>
          </div>
        </div>
      </section>

      <section id="discover" className="section page-wrap">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">Fresh frequencies</p>
            <h2>Discover your next <em>obsession.</em></h2>
          </div>
          <a href="#tracks" className="text-link">
            Explore all <Icon name="arrow" className="h-4 w-4" />
          </a>
        </div>
        <HomeAlbumGrid />
      </section>

      <section id="experience" className="section page-wrap">
        <div className="experience-panel reveal">
          <div className="experience-copy">
            <p className="eyebrow">Now playing</p>
            <h2>Every track deserves a <em>moment.</em></h2>
            <p>
              A listening experience with room to breathe. Clear controls,
              rich artwork, and nothing between you and the sound.
            </p>
            <div className="sound-stats">
              <div><strong>Hi-Fi</strong><span>Crystal audio</span></div>
              <div><strong>∞</strong><span>Endless discovery</span></div>
              <div><strong>24/7</strong><span>Your frequency</span></div>
            </div>
          </div>
          <div className="player-stage">
            <div className="player-cover album-cyan">
              <span className="art-noise" />
              <LiveTrackArt variant="stage" />
            </div>
            <Player />
          </div>
        </div>
      </section>

      <section id="tracks" className="section page-wrap">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">The night list</p>
            <h2>Selected for <em>right now.</em></h2>
          </div>
          <span className="hidden text-sm text-white/35 sm:block">Updated 8 minutes ago</span>
        </div>
        <div className="reveal reveal-delay-1">
          <BackendTrackTable limit={4} variant="home" />
        </div>
      </section>

      <section id="artists" className="section page-wrap">
        <div className="mb-12 max-w-2xl reveal">
          <p className="eyebrow">Built with intention</p>
          <h2 className="section-title">More than a platform.<br /><em>A feeling.</em></h2>
        </div>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <article className={`feature-card ${feature.className} reveal reveal-delay-${index + 1}`} key={feature.label}>
              <div className="feature-icon"><Icon name={feature.icon} className="h-6 w-6" /></div>
              <p>{feature.label}</p>
              <h3>{feature.title}</h3>
              <span>{feature.copy}</span>
              <Icon name="arrow" className="feature-arrow h-5 w-5" />
            </article>
          ))}
        </div>
      </section>

      <section className="page-wrap pb-8 pt-20">
        <div className="final-cta reveal">
          <div className="cta-glow" />
          <p className="eyebrow">Your next favorite song is waiting</p>
          <h2>Press play on<br /><span className="text-gradient">something real.</span></h2>
          <p className="cta-copy">Join SOUL and let the right sound find you.</p>
          <Link href="/register" className="button-primary">
            Enter SOUL <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="page-wrap flex flex-col gap-6 py-12 text-sm text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <Brand />
        <p>© 2026 SOUL. Streaming with a pulse.</p>
        <div className="flex gap-5">
          <Link href="/artists">Artists</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/library">Library</Link>
        </div>
      </footer>
    </main>
  );
}
