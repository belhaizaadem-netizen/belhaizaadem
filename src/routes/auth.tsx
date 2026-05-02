import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Wrench, Loader2, UserCircle2, AlertTriangle, ArrowLeft, CheckCircle2 } from "lucide-react";
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
const INTERNAL_DOMAIN = "@vag-maintenance.local";

const emailSchema = z.string().trim().email("Email invalide").max(255);
const passwordSchema = z.string().min(6, "Minimum 6 caractères").max(72);
const usernameSchema = z
  .string()
  .trim()
  .min(3, "Minimum 3 caractères")
  .max(30, "Maximum 30 caractères")
  .regex(/^[a-zA-Z0-9._-]+$/, "Lettres, chiffres, . _ - uniquement");

function isLikelyPhone(v: string): boolean {
  const digits = v.replace(/\D/g, "");
  return digits.length >= 6 && digits.length === v.replace(/[\s+\-().]/g, "").length;
}

function toEmailIdentifier(raw: string): string {
  const v = raw.trim();
  if (v.includes("@")) return v.toLowerCase();
  if (isLikelyPhone(v)) {
    const digits = v.replace(/\D/g, "");
    return `phone${digits}${INTERNAL_DOMAIN}`;
  }
  return `${v.toLowerCase()}${INTERNAL_DOMAIN}`;
}

type View = "auth" | "forgot";

function AuthPage() {
  const navigate = useNavigate();
  const { session, loading: authLoading } = useAuth();
  const [view, setView] = useState<View>("auth");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState(""); // optionnel à l'inscription
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!authLoading && session) {
      navigate({ to: "/" });
    }
  }, [session, authLoading, navigate]);

  const identifierIsEmail = identifier.includes("@");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

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
    } else if (isLikelyPhone(trimmed)) {
      emailToUse = toEmailIdentifier(trimmed);
    } else {
      const r = usernameSchema.safeParse(trimmed);
      if (!r.success) {
        setError(r.error.issues[0].message);
        return;
      }
      emailToUse = toEmailIdentifier(trimmed);
    }

    const pwParse = passwordSchema.safeParse(password);
    if (!pwParse.success) {
      setError(pwParse.error.issues[0].message);
      return;
    }

    // Validation email de récupération si fourni
    let recoveryToStore: string | null = null;
    if (mode === "signup" && !identifierIsEmail && recoveryEmail.trim()) {
      const r = emailSchema.safeParse(recoveryEmail.trim());
      if (!r.success) {
        setError("Email de récupération : " + r.error.issues[0].message);
        return;
      }
      recoveryToStore = r.data.toLowerCase();
    }

    setBusy(true);
    try {
      if (mode === "signup") {
        const { error: err } = await supabase.auth.signUp({
          email: emailToUse,
          password: pwParse.data,
          options: {
            emailRedirectTo: window.location.origin,
            data: recoveryToStore ? { recovery_email: recoveryToStore } : undefined,
          },
        });
        if (err) throw err;
        // Compte interne (username/tel) : connexion immédiate
        if (emailToUse.endsWith(INTERNAL_DOMAIN)) {
          await supabase.auth.signInWithPassword({
            email: emailToUse,
            password: pwParse.data,
          });
          if (!recoveryToStore) {
            // Avertir : pas d'email = pas de récupération possible
            setInfo(
              "⚠️ Important : sans email, vous ne pourrez pas récupérer votre compte si vous oubliez le mot de passe. Pensez à en ajouter un dans les paramètres.",
            );
          }
        } else {
          setInfo("Vérifiez votre boîte mail pour confirmer votre compte.");
        }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({
          email: emailToUse,
          password: pwParse.data,
        });
        if (err) throw err;
      }
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

  // ---- Vue "Mot de passe oublié" ----
  if (view === "forgot") {
    return <ForgotPasswordView onBack={() => setView("auth")} />;
  }

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
          <div className="mb-4 grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError(null);
                  setInfo(null);
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

            {/* Email de récupération optionnel — uniquement à l'inscription si pas déjà un email */}
            {mode === "signup" && !identifierIsEmail && (
              <div>
                <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Email de récupération <span className="normal-case text-muted-foreground/70">(recommandé)</span>
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-secondary/40 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  placeholder="vous@exemple.com"
                />
                <p className="mt-1 flex items-start gap-1 text-[10px] text-muted-foreground">
                  <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
                  Sans email, impossible de récupérer le compte si vous oubliez votre mot de passe.
                </p>
              </div>
            )}

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
            {info && (
              <div className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-xs text-foreground">
                {info}
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

            {mode === "signin" && (
              <button
                type="button"
                onClick={() => {
                  setView("forgot");
                  setError(null);
                  setInfo(null);
                }}
                className="w-full text-center text-xs font-medium text-primary hover:underline"
              >
                Mot de passe oublié ?
              </button>
            )}
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

// ---------- Sous-composant : Mot de passe oublié ----------
function ForgotPasswordView({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const r = emailSchema.safeParse(email.trim());
    if (!r.success) {
      setError(r.error.issues[0].message);
      return;
    }
    if (r.data.toLowerCase().endsWith(INTERNAL_DOMAIN)) {
      setError("Cet identifiant n'a pas d'email associé. Récupération impossible.");
      return;
    }

    setBusy(true);
    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(r.data, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (err) throw err;
      setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
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
            <h1 className="text-xl font-bold text-foreground">Mot de passe oublié</h1>
            <p className="text-sm text-muted-foreground">
              Entrez votre email pour recevoir un lien de récupération
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-2xl">
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <CheckCircle2 className="h-12 w-12 text-primary" />
              <p className="text-sm font-semibold text-foreground">Email envoyé !</p>
              <p className="text-xs text-muted-foreground">
                Vérifiez votre boîte mail (et les spams). Cliquez sur le lien pour
                définir un nouveau mot de passe.
              </p>
              <button
                onClick={onBack}
                className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary"
              >
                <ArrowLeft className="h-3 w-3" />
                Retour
              </button>
            </div>
          ) : (
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
                Envoyer le lien
              </button>

              <button
                type="button"
                onClick={onBack}
                className="flex w-full items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-3 w-3" />
                Retour à la connexion
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
