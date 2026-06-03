import { Play, Trash2, Upload, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const SOUND_KEY = "vag-alert-sound";
const ENABLED_KEY = "vag-alert-sound-enabled";
const NAME_KEY = "vag-alert-sound-name";

interface Props {
  /** Number of overdue maintenance items — triggers auto-play on mount when > 0 */
  overdueCount: number;
}

export function AlertSoundSettings({ overdueCount }: Props) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playedRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    setDataUrl(localStorage.getItem(SOUND_KEY));
    setFileName(localStorage.getItem(NAME_KEY));
    setEnabled(localStorage.getItem(ENABLED_KEY) !== "0");
  }, []);

  // Auto-play 2s once when there's a delay
  useEffect(() => {
    if (playedRef.current) return;
    if (!enabled || !dataUrl || overdueCount <= 0) return;
    playedRef.current = true;
    playFor2s();
  }, [enabled, dataUrl, overdueCount]);

  const playFor2s = () => {
    if (!dataUrl) return;
    if (!audioRef.current) audioRef.current = new Audio();
    const a = audioRef.current;
    a.src = dataUrl;
    a.currentTime = 0;
    a.play().catch(() => {
      /* autoplay may be blocked until first user gesture */
    });
    window.setTimeout(() => {
      try {
        a.pause();
        a.currentTime = 0;
      } catch {
        /* noop */
      }
    }, 2000);
  };

  const onFile = async (file: File) => {
    if (!file.type.startsWith("audio/") && !/\.(wav|mp3|ogg|m4a)$/i.test(file.name)) {
      alert("Veuillez choisir un fichier audio (.wav, .mp3, .ogg)");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Fichier trop volumineux (max 2 Mo). Utilisez un son court.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result);
      localStorage.setItem(SOUND_KEY, url);
      localStorage.setItem(NAME_KEY, file.name);
      setDataUrl(url);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const clearSound = () => {
    localStorage.removeItem(SOUND_KEY);
    localStorage.removeItem(NAME_KEY);
    setDataUrl(null);
    setFileName(null);
  };

  const toggleEnabled = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem(ENABLED_KEY, next ? "1" : "0");
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {enabled ? (
            <Volume2 className="h-4 w-4 text-primary" strokeWidth={2.4} />
          ) : (
            <VolumeX className="h-4 w-4 text-muted-foreground" strokeWidth={2.4} />
          )}
          <span className="text-xs font-bold uppercase tracking-wider text-foreground">
            Alerte sonore (retard)
          </span>
        </div>
        <button
          onClick={toggleEnabled}
          className={cn(
            "rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors",
            enabled
              ? "border-success/40 bg-success/10 text-success"
              : "border-border bg-muted text-muted-foreground",
          )}
        >
          {enabled ? "Activée" : "Désactivée"}
        </button>
      </div>

      <p className="mb-2 text-[10px] text-muted-foreground">
        Le son joue 2 secondes au chargement si un entretien est en RETARD.
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*,.wav,.mp3,.ogg,.m4a"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
          e.target.value = "";
        }}
      />

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-2.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent"
        >
          <Upload className="h-3.5 w-3.5" strokeWidth={2.5} />
          {dataUrl ? "Changer" : "Importer un son"}
        </button>
        {dataUrl && (
          <>
            <button
              onClick={playFor2s}
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              <Play className="h-3.5 w-3.5" strokeWidth={2.5} />
              Tester 2s
            </button>
            <button
              onClick={clearSound}
              className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/40 bg-destructive/10 px-2.5 py-1.5 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/20"
              aria-label="Supprimer le son"
            >
              <Trash2 className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
          </>
        )}
      </div>

      {fileName && (
        <p className="mt-2 truncate text-[10px] text-muted-foreground" title={fileName}>
          Fichier : <span className="font-semibold text-foreground">{fileName}</span>
        </p>
      )}
    </div>
  );
}
