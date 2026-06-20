"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { saveAuthSession } from "@/lib/api";
import { Brand } from "../components/Brand";
import { Icon } from "../components/Icon";

type RegisterResponse = {
  token: string;
  user: {
    id: number | string;
    fullName: string;
    username: string;
    email: string;
    avatarUrl: string | null;
  };
};

export default function RegisterPage() {
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
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: String(formData.get("fullName") ?? "").trim(),
          username: String(formData.get("username") ?? "").trim(),
          email: String(formData.get("email") ?? "").trim(),
          password: String(formData.get("password") ?? ""),
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        let message = body;

        try {
          const parsed = JSON.parse(body) as { message?: string; error?: string };
          message = parsed.message ?? parsed.error ?? body;
        } catch {
          // The response body is already plain text.
        }

        throw new Error(message || "Registration failed.");
      }

      const auth = await response.json() as RegisterResponse;
      if (!auth.token) throw new Error("Registration did not return an access token.");

      saveAuthSession({
        token: auth.token,
        user: {
          ...auth.user,
          name: auth.user.fullName,
        },
      });
      router.push("/dashboard");
      router.refresh();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error && caughtError.message
          ? caughtError.message
          : "We could not create your account. Review your details and try again.",
      );
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
          <h2>Find your frequency.</h2>
          <p className="auth-subtitle">Create your free SOUL account.</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="fullName">Full name</label>
              <input id="fullName" name="fullName" type="text" autoComplete="name" placeholder="Your name" required />
            </div>
            <div className="field">
              <label htmlFor="username">Username</label>
              <input id="username" name="username" type="text" autoComplete="username" placeholder="Choose a username" required />
            </div>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" autoComplete="new-password" placeholder="••••••••" required minLength={6} />
            </div>
            {error && <p className="auth-error" role="alert">{error}</p>}
            <button type="submit" className="button-primary auth-submit" disabled={isLoading}>
              {isLoading ? "Creating account…" : "Create account"} <Icon name="arrow" className="h-4 w-4" />
            </button>
          </form>
          <p className="auth-switch">Already have an account? <Link href="/login">Sign in</Link></p>
        </div>
      </section>
    </main>
  );
}
