// src/env.d.ts

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_ENV: 'development' | 'production' | 'test';
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
