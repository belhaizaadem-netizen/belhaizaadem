import { useEffect, useState } from "react";
import {
  BookOpen,
  Car,
  ChevronDown,
  Gauge,
  History,
  ListChecks,
  Wrench,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "vag-user-guide-dismissed-v1";

const STEPS = [
  {
    icon: Car,
    title: "1. Choisissez votre véhicule",
    desc: "Sélectionnez la marque, le modèle, la génération, le moteur et la boîte de vitesses. Les entretiens s'adaptent automatiquement à votre configuration.",
  },
  {
    icon: Gauge,
    title: "2. Saisissez votre kilométrage",
    desc: "Entrez le kilométrage actuel de votre voiture pour calculer les entretiens à venir, en retard ou bientôt nécessaires.",
  },
  {
    icon: ListChecks,
    title: "3. Filtrez les entretiens",
    desc: "Utilisez les cartes de statistiques (Retard / À faire / Bientôt / OK) et les catégories pour filtrer la liste des opérations.",
  },
  {
    icon: Wrench,
    title: "4. Marquez comme fait",
    desc: "Cliquez sur « Marquer fait » sur une intervention après l'avoir réalisée. Le prochain seuil sera recalculé automatiquement.",
  },
  {
    icon: History,
    title: "5. Consultez l'historique",
    desc: "L'icône Historique en haut à droite vous permet de revoir toutes les interventions effectuées et de les supprimer si besoin.",
  },
];

export function UserGuide() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [hideReopen, setHideReopen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDismissed = localStorage.getItem(STORAGE_KEY) === "1";
    setDismissed(isDismissed);
    setOpen(!isDismissed);
    if (isDismissed) {
      const t = setTimeout(() => setHideReopen(true), 10000);
      return () => clearTimeout(t);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    setOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "1");
    }
  };

  const handleReopen = () => {
    setDismissed(false);
    setOpen(true);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  if (dismissed && !open) {
    if (hideReopen) return null;
    return (
      <button
        onClick={handleReopen}
        className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card/50 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
      >
        <BookOpen className="h-3.5 w-3.5" />
        Afficher le guide d'utilisation
      </button>
    );
  }

  return (
    <div className="mb-4 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card shadow-glow">
      <div className="flex items-center justify-between gap-2 border-b border-border/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="gradient-primary rounded-lg p-1.5">
            <BookOpen className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground">Guide d'utilisation</h2>
            <p className="text-[10px] text-muted-foreground">Bienvenue ! Voici comment ça marche</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label={open ? "Réduire" : "Développer"}
          >
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", open ? "rotate-180" : "rotate-0")}
            />
          </button>
          <button
            onClick={handleDismiss}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
            aria-label="Fermer le guide"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {open && (
        <div className="space-y-2.5 p-3">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="flex gap-2.5 rounded-xl border border-border/50 bg-background/50 p-2.5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <step.icon className="h-4 w-4" strokeWidth={2.4} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-foreground">{step.title}</div>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
          <button
            onClick={handleDismiss}
            className="w-full rounded-xl bg-primary py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            J'ai compris, masquer le guide
          </button>
        </div>
      )}
    </div>
  );
}
