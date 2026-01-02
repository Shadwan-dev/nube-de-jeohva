import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

// Tu configuración de Firebase (REEMPLAZA CON TUS DATOS REALES)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'TU_API_KEY',
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'TU_PROYECTO.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'TU_PROYECTO',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'TU_PROYECTO.appspot.com',
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'TU_SENDER_ID',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'TU_APP_ID',
  measurementId:
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'TU_MEASUREMENT_ID',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// NO exportar servicios que no existen aquí
// Los servicios como userService están en otro archivo

export default app;
