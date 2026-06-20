"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { login, saveAuthSession } from "@/lib/api";
import { Brand } from "../components/Brand";
import { Icon } from "../components/Icon";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    const formData = new FormData(event.currentTarget);
    setIsLoading(true);
    setError("");

    try {
      const auth = await login({
        email: String(formData.get("email") ?? "").trim(),
        password: String(formData.get("password") ?? ""),
      });

      if (!auth.token) throw new Error("Missing token");
      saveAuthSession(auth);
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("We could not sign you in. Check your email and password, then try again.");
      setIsLoading(false);
    }
  };

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
          <h2>Welcome back.</h2>
          <p className="auth-subtitle">Sign in to continue your listening journey.</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" placeholder="••••••••" required />
            </div>
            {error && <p className="auth-error" role="alert">{error}</p>}
            <button type="submit" className="button-primary auth-submit" disabled={isLoading}>
              {isLoading ? "Signing in…" : "Sign in"} <Icon name="arrow" className="h-4 w-4" />
            </button>
          </form>
          <p className="auth-switch">New to SOUL? <Link href="/register">Create account</Link></p>
        </div>
      </section>
    </main>
  );
}
