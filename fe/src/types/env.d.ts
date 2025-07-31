// src/types/env.d.ts

interface ImportMetaEnv {
  VITE_ACCESS_KEY_ID: string;
  VITE_SECRET_ACCESS_KEY: string;
  VITE_MAP_API_KEY: string;
  VITE_MAP_REGION: string;
  VITE_MAP_STYLE: string;
  VITE_MAP_COLOR_SCHEME: string;
  VITE_MAP_NAME: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
