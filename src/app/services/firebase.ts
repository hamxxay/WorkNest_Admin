import { initializeApp, FirebaseApp } from 'firebase/app';
import { Auth, browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import { environment } from '../../environments/environment';

const cfg = environment.firebase;

export const isFirebaseConfigured = Boolean(cfg.apiKey && cfg.authDomain && cfg.projectId && cfg.appId);

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;

if (isFirebaseConfigured) {
  _app = initializeApp(cfg);
  _auth = getAuth(_app);
  void setPersistence(_auth, browserLocalPersistence);
}

export const firebaseAuth = _auth as Auth;
