import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Wrench, Loader2, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Réinitialiser le mot de passe — VAG Maintenance" },
      { name: "description", content: "Définissez un nouveau mot de passe." },
    ],
  }),
  component: ResetPasswordPage,
});

const passwordSchema = z.string().min(6, "Minimum 6 caractères").max(72);

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [hasRecovery, setHasRecovery] = useState(false);

  useEffect(() => {
    // Supabase place le token dans le hash de l'URL après redirection
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash.includes("type=recovery") || hash.includes("access_token")) {
        setHasRecovery(true);
      }
    }
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setHasRecovery(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const r = passwordSchema.safeParse(password);
    if (!r.success) {
      setError(r.error.issues[0].message);
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setBusy(true);
    try {
      const { error: err } = await supabase.auth.updateUser({ password: r.data });
      if (err) throw err;
      setDone(true);
      setTimeout(() => navigate({ to: "/auth" }), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
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
            <h1 className="text-xl font-bold text-foreground">Nouveau mot de passe</h1>
            <p className="text-sm text-muted-foreground">
              Choisissez un nouveau mot de passe sécurisé
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-2xl">
          {done ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <CheckCircle2 className="h-12 w-12 text-primary" />
              <p className="text-sm font-semibold text-foreground">
                Mot de passe modifié !
              </p>
              <p className="text-xs text-muted-foreground">Redirection en cours...</p>
            </div>
          ) : !hasRecovery ? (
            <div className="space-y-3 text-center">
              <p className="text-sm text-muted-foreground">
                Lien invalide ou expiré. Demandez un nouveau lien depuis la page de
                connexion.
              </p>
              <button
                onClick={() => navigate({ to: "/auth" })}
                className="gradient-primary shadow-glow w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Retour à la connexion
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-secondary/40 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Confirmer
                </label>
                <input
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
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
                Enregistrer
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
