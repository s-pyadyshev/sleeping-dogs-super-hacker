const readEnv = (key: keyof ImportMetaEnv): string =>
  (import.meta.env[key] ?? "").trim();

export const getFirebaseConfig = () => ({
  apiKey: readEnv("VITE_FIREBASE_API_KEY"),
  authDomain: readEnv("VITE_FIREBASE_AUTH_DOMAIN"),
  databaseURL: readEnv("VITE_FIREBASE_DATABASE_URL"),
  projectId: readEnv("VITE_FIREBASE_PROJECT_ID"),
  storageBucket: readEnv("VITE_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: readEnv("VITE_FIREBASE_MESSAGING_SENDER_ID"),
  appId: readEnv("VITE_FIREBASE_APP_ID"),
});

export const isFirebaseConfigured = (): boolean =>
  Boolean(getFirebaseConfig().apiKey && getFirebaseConfig().projectId);
