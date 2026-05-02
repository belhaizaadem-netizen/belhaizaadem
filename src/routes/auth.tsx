import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Wrench, Loader2, UserCircle2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Connexion — VAG Maintenance" },
      { name: "description", content: "Connectez-vous ou continuez en mode invité." },
    ],
  }),
  component: AuthPage,
});

const GUEST_KEY = "vag-guest-mode";

const emailSchema = z.string().trim().email("Email ou identifiant invalide").max(255);
const passwordSchema = z.string().min(6, "Minimum 6 caractères").max(72);
// Username: lettres/chiffres/._- (3-30) — converti en email interne pour Supabase
const usernameSchema = z
  .string()
  .trim()
  .min(3, "Minimum 3 caractères")
  .max(30, "Maximum 30 caractères")
  .regex(/^[a-zA-Z0-9._-]+$/, "Lettres, chiffres, . _ - uniquement");

// Convertit un identifiant (username, téléphone ou email) en email valide pour Supabase
function toEmailIdentifier(raw: string): string {
  const v = raw.trim();
  if (v.includes("@")) return v.toLowerCase();
  // Téléphone : on garde uniquement les chiffres
  const digits = v.replace(/\D/g, "");
  if (digits.length >= 6 && digits.length === v.replace(/[\s+\-().]/g, "").length) {
    return `phone${digits}@vag-maintenance.local`;
  }
  // Username
  return `${v.toLowerCase()}@vag-maintenance.local`;
}

function AuthPage() {
  const navigate = useNavigate();
  const { session, loading: authLoading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [identifier, setIdentifier] = useState("");
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

    // Valider l'identifiant : soit email, soit username, soit téléphone
    const trimmed = identifier.trim();
    if (!trimmed) {
      setError("Identifiant requis");
      return;
    }

    let emailToUse: string;
    if (trimmed.includes("@")) {
      const r = emailSchema.safeParse(trimmed);
      if (!r.success) {
        setError(r.error.issues[0].message);
        return;
      }
      emailToUse = r.data.toLowerCase();
    } else {
      // username ou téléphone
      const digits = trimmed.replace(/\D/g, "");
      const looksLikePhone = digits.length >= 6 && digits.length === trimmed.replace(/[\s+\-().]/g, "").length;
      if (!looksLikePhone) {
        const r = usernameSchema.safeParse(trimmed);
        if (!r.success) {
          setError(r.error.issues[0].message);
          return;
        }
      }
      emailToUse = toEmailIdentifier(trimmed);
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
          email: emailToUse,
          password: pwParse.data,
          options: { emailRedirectTo: window.location.origin },
        });
        if (err) throw err;
        // Si on a créé via username/téléphone, pas besoin de confirmation email
        // (l'email interne n'est pas réel) — on tente une connexion immédiate
        if (!emailToUse.endsWith("@vag-maintenance.local")) {
          // email réel : confirmation requise
        } else {
          await supabase.auth.signInWithPassword({
            email: emailToUse,
            password: pwParse.data,
          });
        }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({
          email: emailToUse,
          password: pwParse.data,
        });
        if (err) throw err;
      }
      // Sortir du mode invité si on s'authentifie
      if (typeof window !== "undefined") localStorage.removeItem(GUEST_KEY);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erreur inconnue";
      setError(
        msg.includes("Invalid login")
          ? "Identifiant ou mot de passe incorrect."
          : msg.includes("already registered")
          ? "Ce compte existe déjà. Essayez de vous connecter."
          : msg,
      );
    } finally {
      setBusy(false);
    }
  };

  const handleGuest = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(GUEST_KEY, "1");
    }
    navigate({ to: "/" });
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
                Nom d'utilisateur, téléphone ou email
              </label>
              <input
                type="text"
                required
                autoComplete="username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-secondary/40 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                placeholder="ex. ahmed, 0612345678 ou vous@exemple.com"
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
            onClick={handleGuest}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <UserCircle2 className="h-4 w-4" />
            Continuer en invité
          </button>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Mode invité : vos données restent sur cet appareil uniquement.
          </p>
        </div>
      </div>
    </div>
  );
}
