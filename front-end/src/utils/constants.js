const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBGhJowvZDv3cn0FXBdn7tatTiJ2OQo47U",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fir-mern-f9d21.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fir-mern-f9d21",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "fir-mern-f9d21.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "451592028456",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:451592028456:web:c82b4171d9297a0d4b101d",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-HFYKLSHQ0H"
};

const BACKEND_API_URI = import.meta.env.VITE_BACKEND_API || "http://localhost:3333/api/v1";

export {
    firebaseConfig,
    BACKEND_API_URI
}