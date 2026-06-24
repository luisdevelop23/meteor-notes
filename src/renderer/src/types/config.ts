// * ─────────────────────────────────────────────────────────────────────────────
// * CONFIG — configuración del usuario y la aplicación
// * ─────────────────────────────────────────────────────────────────────────────

// * Datos del usuario (fase 1: solo local)
export interface UserProfile {
  name: string;
  email: string;
  avatar_path: string | null; // * ruta local a la imagen de perfil
}

// * Tema visual de la app
export type AppTheme = "light" | "dark" | "system";

// * Idioma de la UI
export type AppLanguage = "es" | "en";

// * Vista por defecto al abrir la app
export type DefaultView = "home" | "notes" | "tasks" | "scrum";

/*
 * Configuración completa de la app.
 * Se persiste en ~/MeteorNotes/config.json
 */
export interface AppConfig {
  version: string; // * versión del schema de config, para migraciones futuras

  user: UserProfile;

  preferences: {
    theme: AppTheme;
    language: AppLanguage;
    default_view: DefaultView;
    sidebar_collapsed: boolean;
    font_size: "sm" | "md" | "lg"; // * tamaño base de texto en la app
  };

  storage: {
    base_path: string; // * carpeta donde se guardan los datos — por defecto ~/MeteorNotes
  };

  // * Preparado para fase futura de sync en la nube
  cloud: {
    enabled: boolean;
    provider: "none" | "supabase" | "custom";
    last_sync_at: string | null;
  };
}

// * Config por defecto al instalar la app por primera vez
export const DEFAULT_CONFIG: AppConfig = {
  version: "1.0.0",
  user: {
    name: "",
    email: "",
    avatar_path: null,
  },
  preferences: {
    theme: "system",
    language: "es",
    default_view: "home",
    sidebar_collapsed: false,
    font_size: "md",
  },
  storage: {
    base_path: "", // * electron-main lo rellena con app.getPath('home') + '/MeteorNotes'
  },
  cloud: {
    enabled: false,
    provider: "none",
    last_sync_at: null,
  },
};
