import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.lovable.vagmaintenance",
  appName: "VAG Maintenance",
  webDir: "dist",
  server: {
    // Hot-reload depuis le preview Lovable pendant le dev.
    // Pour générer un APK de PRODUCTION, supprime ce bloc `server`
    // (l'app utilisera alors le contenu local de `dist/`).
    url: "https://4993f4ad-2316-438c-a00d-2b05104894c4.lovableproject.com?forceHideBadge=true",
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: "#0a0a0a",
      showSpinner: false,
    },
  },
};

export default config;
