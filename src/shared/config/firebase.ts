import { initializeApp, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getFunctions, Functions } from 'firebase/functions'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

let app!: FirebaseApp;
let auth!: Auth;
let db!: Firestore;
let functions!: Functions;

try {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
    functions = getFunctions(app)
} catch (error: any) {
    console.error("FIREBASE INIT FAILED:", error);
    if (typeof document !== 'undefined') {
        document.body.innerHTML = `<div style="color:red; margin:20px; font-family:monospace">
            <h1>Firebase Init Failed</h1>
            <p>${error.message}</p>
            <p>API Key defined: ${!!firebaseConfig.apiKey}</p>
        </div>`;
    }
}

export { app as default, auth, db, functions }
