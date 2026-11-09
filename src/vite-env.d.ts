/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  readonly VITE_MONGODB_URI?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
