// src/types/env.d.ts

interface ImportMetaEnv {
  readonly VITE_AWS_REGION: string;
  readonly VITE_AWS_LOCATION_API_KEY: string;
  readonly VITE_AWS_MAP_STYLE: string;
  readonly VITE_AWS_COLOR_SCHEME: string;
  readonly VITE_AWS_DEFAULT_LONGITUDE: string;
  readonly VITE_AWS_DEFAULT_LATITUDE: string;
  readonly VITE_AWS_DEFAULT_ZOOM: string;

  // Additional environment variables for map services
  readonly VITE_MAP_API_KEY: string;
  readonly VITE_MAP_REGION: string;
  readonly VITE_MAP_STYLE: string;
  readonly VITE_MAP_COLOR_SCHEME: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
