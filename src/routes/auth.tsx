import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Capacitor } from "@capacitor/core";
import { useEffect, useState, type FormEvent } from "react";
import { Wrench, Loader2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Connexion — VAG Maintenance" },
      { name: "description", content: "Connectez-vous pour synchroniser vos entretiens en ligne." },
    ],
  }),
  component: AuthPage,
});

const emailSchema = z.string().trim().email("Email invalide").max(255);
const passwordSchema = z.string().min(6, "Minimum 6 caractères").max(72);

function AuthPage() {
  const navigate = useNavigate();
  const { session, loading: authLoading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!authLoading && session) {
      navigate({ to: "/" });
    }
  }, [session, authLoading, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailParse = emailSchema.safeParse(email);
    if (!emailParse.success) {
      setError(emailParse.error.issues[0].message);
      return;
    }
    const pwParse = passwordSchema.safeParse(password);
    if (!pwParse.success) {
      setError(pwParse.error.issues[0].message);
      return;
    }

    setBusy(true);
    try {
      if (mode === "signup") {
        const { error: err } = await supabase.auth.signUp({
          email: emailParse.data,
          password: pwParse.data,
          options: { emailRedirectTo: window.location.origin },
        });
        if (err) throw err;
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({
          email: emailParse.data,
          password: pwParse.data,
        });
        if (err) throw err;
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erreur inconnue";
      setError(msg.includes("Invalid login") ? "Email ou mot de passe incorrect." : msg);
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);

    if (Capacitor.isNativePlatform()) {
      setError("Dans l'APK, utilisez la connexion par email et mot de passe. Google ouvre Chrome et peut bloquer le retour vers l'application.");
      return;
    }

    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError(result.error.message ?? "Échec de la connexion Google.");
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <div className="gradient-primary shadow-glow rounded-2xl p-3">
            <Wrench className="h-6 w-6 text-primary-foreground" strokeWidth={2.4} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">VAG Maintenance</h1>
            <p className="text-sm text-muted-foreground">
              {mode === "signin" ? "Connectez-vous à votre compte" : "Créez votre compte"}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-2xl">
          {/* Tabs */}
          <div className="mb-4 grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError(null);
                }}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors",
                  mode === m
                    ? "bg-card text-foreground shadow"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {m === "signin" ? "Connexion" : "Inscription"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-secondary/40 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                placeholder="vous@exemple.com"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Mot de passe
              </label>
              <input
                type="password"
                required
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-secondary/40 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="gradient-primary shadow-glow flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all active:scale-95 disabled:opacity-60"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "signin" ? "Se connecter" : "Créer mon compte"}
            </button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              ou
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 7.1 29.6 5 24 5 16.3 5 9.7 9.3 6.3 14.7z" />
              <path fill="#4CAF50" d="M24 44c5.3 0 10.1-2 13.8-5.3l-6.4-5.4C29.3 35 26.8 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.5 5C9.7 39.7 16.3 44 24 44z" />
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.4 5.4C42 35.6 44 30.2 44 24c0-1.3-.1-2.3-.4-3.5z" />
            </svg>
            Continuer avec Google
          </button>
        </div>
      </div>
    </div>
  );
}
