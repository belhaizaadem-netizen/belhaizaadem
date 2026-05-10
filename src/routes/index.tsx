import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  History,
  LogOut,
  Moon,
  CheckCheck,
  RotateCcw,
  Sun,
  Wrench,
} from "lucide-react";
import { useAppState } from "@/hooks/use-app-state";
import { useAuth } from "@/hooks/use-auth";
import {
  CATEGORIES,
  applicableItems,
  computeStatus,
  type Category,
  type MaintenanceItem,
  type Status,
} from "@/lib/maintenance-data";
import { findEngine } from "@/lib/vehicles";
import { BrandSelector } from "@/components/BrandSelector";
import { VehicleSelector } from "@/components/VehicleSelector";
import { VehicleDashboard } from "@/components/VehicleDashboard";
import { StatCard } from "@/components/StatCard";
import { MaintenanceCard } from "@/components/MaintenanceCard";
import { HistorySheet } from "@/components/HistorySheet";
import { MarkDoneDialog } from "@/components/MarkDoneDialog";
import { MarkAllDoneDialog } from "@/components/MarkAllDoneDialog";
import { UserGuide } from "@/components/UserGuide";
import { GpsTracker } from "@/components/GpsTracker";
import { DashboardStartup } from "@/components/DashboardStartup";
import { cn } from "@/lib/utils";

const STARTUP_KEY = "vag-startup-shown";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VAG Maintenance — Suivi entretien Volkswagen Group" },
      {
        name: "description",
        content:
          "Application de suivi de maintenance pour Volkswagen, Audi, SEAT, Škoda, Cupra et Porsche. Calcul automatique des entretiens selon votre kilométrage.",
      },
      { property: "og:title", content: "VAG Maintenance — Suivi entretien Volkswagen Group" },
      {
        property: "og:description",
        content:
          "Suivez les entretiens de votre véhicule du groupe Volkswagen avec une interface mobile moderne.",
      },
    ],
  }),
  component: Index,
});

const STATUS_FILTERS: { key: Status | "all"; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "overdue", label: "En retard" },
  { key: "due", label: "À faire" },
  { key: "soon", label: "Bientôt" },
  { key: "ok", label: "OK" },
];

const GUEST_KEY = "vag-guest-mode";

function Index() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const [isGuest, setIsGuest] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(GUEST_KEY) === "1";
  });
  const [showStartup, setShowStartup] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!sessionStorage.getItem(STARTUP_KEY)) {
        setShowStartup(true);
        sessionStorage.setItem(STARTUP_KEY, "1");
      }
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !user && !isGuest) {
      navigate({ to: "/auth" });
    }
  }, [authLoading, user, isGuest, navigate]);

  const {
    state,
    hydrated,
    setBrand,
    setVehicle,
    setCurrentKm,
    addKm,
    toggleTheme,
    markDone,
    markManyDone,
    removeHistory,
    resetItems,
  } = useAppState();

  const [liveSpeedKmh, setLiveSpeedKmh] = useState(0);
  const [livePosition, setLivePosition] = useState<{
    latitude: number | null;
    longitude: number | null;
    accuracy: number | null;
    heading: number | null;
    enabled: boolean;
  }>({ latitude: null, longitude: null, accuracy: null, heading: null, enabled: false });
  const handleGpsDistance = useCallback((delta: number) => addKm(delta), [addKm]);

  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState<MaintenanceItem | null>(null);
  const [markAllOpen, setMarkAllOpen] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [showVehiclePickers, setShowVehiclePickers] = useState(true);
  const pagerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pagerRef.current;
    if (!el) return;
    const target = activePage * el.clientWidth;
    if (Math.abs(el.scrollLeft - target) > 4) {
      el.scrollTo({ left: target, behavior: "smooth" });
    }
  }, [activePage]);

  // Hide the "glissez" hint after 10s (one-shot)
  useEffect(() => {
    const t = setTimeout(() => setShowSwipeHint(false), 10000);
    return () => clearTimeout(t);
  }, []);

  // Show vehicle pickers when entering page 0, then hide after 10s
  useEffect(() => {
    if (activePage !== 0) return;
    setShowVehiclePickers(true);
    const t = setTimeout(() => setShowVehiclePickers(false), 10000);
    return () => clearTimeout(t);
  }, [activePage]);

  const engine = useMemo(() => {
    const v = state.vehicle;
    if (!v.modelId || !v.generationId || !v.engineId) return null;
    return findEngine(state.brand, v.modelId, v.generationId, v.engineId) ?? null;
  }, [state.brand, state.vehicle]);

  const items = useMemo(
    () => applicableItems(engine, state.vehicle.transmission),
    [engine, state.vehicle.transmission],
  );

  const statuses = useMemo(() => {
    return items.map((item) =>
      computeStatus(item, state.currentKm, state.lastDone[item.id] ?? 0, engine),
    );
  }, [items, state.currentKm, state.lastDone, engine]);

  const counts = useMemo(() => {
    const c = { overdue: 0, due: 0, soon: 0, ok: 0 };
    statuses.forEach((s) => {
      if (s.status === "overdue") c.overdue++;
      else if (s.status === "due") c.due++;
      else if (s.status === "soon") c.soon++;
      else c.ok++;
    });
    return c;
  }, [statuses]);

  const filtered = useMemo(() => {
    const order: Record<Status, number> = { overdue: 0, due: 1, soon: 2, ok: 3 };
    return statuses
      .filter((s) => (categoryFilter === "all" ? true : s.item.category === categoryFilter))
      .filter((s) => {
        if (statusFilter === "all") return true;
        if (statusFilter === "due")
          return s.status === "due" || s.status === "overdue";
        return s.status === statusFilter;
      })
      .sort((a, b) => order[a.status] - order[b.status] || a.kmRemaining - b.kmRemaining);
  }, [statuses, categoryFilter, statusFilter]);

  if (authLoading || (!user && !isGuest) || !hydrated) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {showStartup && <DashboardStartup onDone={() => setShowStartup(false)} />}

      {/* Header (fixed across pages) */}
      <div className="mx-auto max-w-md px-4 pt-6">
        <header className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="gradient-primary shadow-glow rounded-xl p-2">
              <Wrench className="h-5 w-5 text-primary-foreground" strokeWidth={2.4} />
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight text-foreground">
                VAG Maintenance
              </h1>
              <p className="text-[11px] text-muted-foreground">Volkswagen Group</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setHistoryOpen(true)}
              className="rounded-xl border border-border bg-card p-2.5 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Historique"
            >
              <History className="h-4 w-4" />
            </button>
            <button
              onClick={toggleTheme}
              className="rounded-xl border border-border bg-card p-2.5 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Thème"
            >
              {state.theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={async () => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem(GUEST_KEY);
                }
                if (user) await signOut();
                navigate({ to: "/auth" });
              }}
              className="rounded-xl border border-border bg-card p-2.5 text-muted-foreground transition-colors hover:text-destructive"
              aria-label="Se déconnecter"
              title="Se déconnecter"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>
      </div>

      {/* Page indicator */}
      <div className="mx-auto mb-2 flex max-w-md items-center justify-center gap-2">
        <button
          onClick={() => setActivePage(0)}
          className={cn(
            "h-1.5 rounded-full transition-all",
            activePage === 0 ? "w-8 bg-primary" : "w-1.5 bg-border",
          )}
          aria-label="Page véhicule"
        />
        <button
          onClick={() => setActivePage(1)}
          className={cn(
            "h-1.5 rounded-full transition-all",
            activePage === 1 ? "w-8 bg-primary" : "w-1.5 bg-border",
          )}
          aria-label="Page entretiens"
        />
      </div>
      <div className="mx-auto mb-2 max-w-md px-4 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
        {activePage === 0 ? "← Glissez pour voir les entretiens →" : "← Glissez pour le véhicule →"}
      </div>

      {/* Swipeable pages */}
      <div
        ref={pagerRef}
        onScroll={(e) => {
          const w = e.currentTarget.clientWidth;
          if (w > 0) {
            const p = Math.round(e.currentTarget.scrollLeft / w);
            if (p !== activePage) setActivePage(p);
          }
        }}
        className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Page 1: Véhicule */}
        <section className="w-full shrink-0 snap-center">
          <div className="mx-auto max-w-md px-4 pb-24">
            <UserGuide />
            <div className="mb-3 grid grid-cols-4 gap-2">
              <StatCard
                label="Retard"
                value={counts.overdue}
                icon={AlertCircle}
                variant="danger"
                active={statusFilter === "overdue"}
                onClick={() => {
                  setStatusFilter((s) => (s === "overdue" ? "all" : "overdue"));
                  setActivePage(1);
                }}
              />
              <StatCard
                label="À faire"
                value={counts.due}
                icon={AlertCircle}
                variant="danger"
                active={statusFilter === "due"}
                onClick={() => {
                  setStatusFilter((s) => (s === "due" ? "all" : "due"));
                  setActivePage(1);
                }}
              />
              <StatCard
                label="Bientôt"
                value={counts.soon}
                icon={AlertTriangle}
                variant="warning"
                active={statusFilter === "soon"}
                onClick={() => {
                  setStatusFilter((s) => (s === "soon" ? "all" : "soon"));
                  setActivePage(1);
                }}
              />
              <div className="relative">
                <StatCard
                  label="OK"
                  value={counts.ok}
                  icon={CheckCircle2}
                  variant="success"
                  active={statusFilter === "ok"}
                  onClick={() => {
                    setStatusFilter((s) => (s === "ok" ? "all" : "ok"));
                    setActivePage(1);
                  }}
                />
                {counts.ok > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const okIds = statuses
                        .filter((s) => s.status === "ok")
                        .map((s) => s.item.id);
                      if (
                        okIds.length > 0 &&
                        confirm(`Réinitialiser les ${okIds.length} entretien(s) marqués OK ?`)
                      ) {
                        resetItems(okIds);
                      }
                    }}
                    className="absolute -right-1 -top-1 rounded-full border border-border bg-card p-1 text-muted-foreground shadow-md transition-colors hover:bg-destructive hover:text-destructive-foreground"
                    aria-label="Réinitialiser les entretiens OK"
                    title="Réinitialiser les entretiens OK"
                  >
                    <RotateCcw className="h-3 w-3" strokeWidth={2.5} />
                  </button>
                )}
              </div>
            </div>
            <BrandSelector value={state.brand} onChange={setBrand} />
            <div className="mt-3">
              <VehicleSelector
                brand={state.brand}
                vehicle={state.vehicle}
                onChange={setVehicle}
              />
            </div>
            <div className="mt-3">
              <VehicleDashboard
                brand={state.brand}
                vehicle={state.vehicle}
                km={state.currentKm}
                lastDone={state.lastDone}
                onKmChange={setCurrentKm}
                liveSpeedKmh={liveSpeedKmh}
                livePosition={livePosition}
              />
            </div>
            <div className="mt-3">
              <GpsTracker
                onDistanceDelta={handleGpsDistance}
                onLiveSpeed={setLiveSpeedKmh}
                onLivePosition={setLivePosition}
              />
            </div>
          </div>
        </section>

        {/* Page 2: Entretiens */}
        <section className="w-full shrink-0 snap-center">
          <div className="mx-auto max-w-md px-4 pb-24">

            {(counts.overdue + counts.due + counts.soon) > 0 && (
              <button
                onClick={() => setMarkAllOpen(true)}
                className="gradient-primary shadow-glow mt-3 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-primary-foreground transition-all active:scale-[0.98]"
              >
                <CheckCheck className="h-5 w-5" strokeWidth={2.5} />
                Tout marquer fait (intervention complète)
              </button>
            )}

            <div className="scrollbar-hide -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1">
              {(["all", ...CATEGORIES] as const).map((cat) => {
                const active = cat === categoryFilter;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={cn(
                      "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {cat === "all" ? "Toutes catégories" : cat}
                  </button>
                );
              })}
            </div>

            {statusFilter !== "all" && (
              <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-secondary/50 px-3 py-2 text-xs">
                <span className="text-muted-foreground">
                  Filtre :{" "}
                  <span className="font-semibold text-foreground">
                    {STATUS_FILTERS.find((s) => s.key === statusFilter)?.label}
                  </span>
                </span>
                <div className="flex items-center gap-2">
                  {statusFilter === "ok" && counts.ok > 0 && (
                    <button
                      onClick={() => {
                        const okIds = statuses
                          .filter((s) => s.status === "ok")
                          .map((s) => s.item.id);
                        if (
                          okIds.length > 0 &&
                          confirm(`Réinitialiser les ${okIds.length} entretien(s) marqués OK ?`)
                        ) {
                          resetItems(okIds);
                        }
                      }}
                      className="inline-flex items-center gap-1 rounded-full bg-destructive px-2.5 py-1 font-semibold text-destructive-foreground transition-opacity hover:opacity-90"
                      aria-label="Effacer tous les OK"
                    >
                      <RotateCcw className="h-3 w-3" strokeWidth={2.5} />
                      Tout effacer
                    </button>
                  )}
                  <button
                    onClick={() => setStatusFilter("all")}
                    className="font-semibold text-primary"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 space-y-2.5">
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                  Aucun entretien dans cette sélection.
                </div>
              ) : (
                filtered.map((s) => (
                  <MaintenanceCard
                    key={s.item.id}
                    status={s}
                    onMarkDone={() => setPendingItem(s.item)}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      </div>

      <HistorySheet
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={state.history}
        items={items}
        onRemove={removeHistory}
      />

      <MarkDoneDialog
        item={pendingItem}
        defaultKm={state.currentKm}
        onClose={() => setPendingItem(null)}
        onConfirm={(km) => {
          if (pendingItem) markDone(pendingItem.id, km);
          setPendingItem(null);
        }}
      />

      <MarkAllDoneDialog
        open={markAllOpen}
        statuses={statuses}
        defaultKm={state.currentKm}
        onClose={() => setMarkAllOpen(false)}
        onConfirm={(ids, km) => {
          markManyDone(ids, km);
          setMarkAllOpen(false);
        }}
      />
    </div>
  );
}
