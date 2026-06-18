import Link from "next/link";
import { Brand } from "./Brand";
import { Icon } from "./Icon";

type AuthCardProps = {
  mode: "login" | "register";
};

export function AuthCard({ mode }: AuthCardProps) {
  const isLogin = mode === "login";

  return (
    <main className="auth-shell">
      <Link href="/" className="auth-back"><Icon name="back" className="h-4 w-4" /> Back home</Link>
      <section className="auth-visual">
        <Brand />
        <div className="auth-visual-copy">
          <h1>Sound that<br /><span className="text-gradient">stays.</span></h1>
          <p>Step into a more personal way to discover music, podcasts, and artists.</p>
        </div>
      </section>
      <section className="auth-panel">
        <div className="auth-card">
          <Brand />
          <h2>{isLogin ? "Welcome back." : "Find your frequency."}</h2>
          <p className="auth-subtitle">
            {isLogin ? "Sign in to continue your listening journey." : "Create your free SOUL account."}
          </p>
          <form className="auth-form">
            {!isLogin && (
              <div className="field">
                <label htmlFor="name">Full name</label>
                <input id="name" name="name" type="text" autoComplete="name" placeholder="Your name" />
              </div>
            )}
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" autoComplete={isLogin ? "current-password" : "new-password"} placeholder="••••••••" />
            </div>
            <button type="submit" className="button-primary auth-submit">
              {isLogin ? "Sign in" : "Create account"} <Icon name="arrow" className="h-4 w-4" />
            </button>
          </form>
          <p className="auth-switch">
            {isLogin ? "New to SOUL? " : "Already have an account? "}
            <Link href={isLogin ? "/register" : "/login"}>{isLogin ? "Create account" : "Sign in"}</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
