import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseAuth, isFirebaseConfigured } from './firebase';
import { environment } from '../../environments/environment';

export interface AdminUser {
  email: string;
  roles: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userKey = 'wna_user';
  user = signal<AdminUser | null>(this.loadUser());

  constructor(private http: HttpClient) {}

  private loadUser(): AdminUser | null {
    try {
      const raw = localStorage.getItem(this.userKey);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  login(email: string, password: string): Observable<{ isSuccessful: boolean; message: string }> {
    if (!isFirebaseConfigured) {
      return throwError(() => ({ error: { message: 'Firebase is not configured.' } }));
    }

    return from(signInWithEmailAndPassword(firebaseAuth, email, password)).pipe(
      switchMap(() =>
        this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
      ),
      map(res => {
        const u: AdminUser = {
          email,
          roles: res?.data?.roles ?? res?.roles ?? ['Admin'],
        };
        localStorage.setItem(this.userKey, JSON.stringify(u));
        this.user.set(u);
        return { isSuccessful: true, message: 'Login successful.' };
      }),
      catchError(err => {
        const msg = this.mapFirebaseError(err?.code) ?? err?.error?.message ?? 'Login failed.';
        return of({ isSuccessful: false, message: msg });
      })
    );
  }

  loginWithGoogle(): Observable<{ isSuccessful: boolean; message: string }> {
    if (!isFirebaseConfigured) {
      return throwError(() => ({ error: { message: 'Firebase is not configured.' } }));
    }
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(firebaseAuth, provider)).pipe(
      switchMap(result => {
        const email = result.user.email!;
        return from(result.user.getIdToken()).pipe(
          switchMap(idToken =>
            this.http.post<any>(`${environment.apiUrl}/auth/google-login`, { email, idToken }).pipe(
              map(res => {
                const u: AdminUser = { email, roles: res?.data?.roles ?? res?.roles ?? ['Admin'] };
                localStorage.setItem(this.userKey, JSON.stringify(u));
                this.user.set(u);
                return { isSuccessful: true, message: 'Login successful.' };
              }),
              catchError(err => {
                signOut(firebaseAuth).catch(() => {});
                const msg = err?.error?.message ?? 'Access denied. This account is not registered.';
                return of({ isSuccessful: false, message: msg });
              })
            )
          )
        );
      }),
      catchError(err => {
        const msg = this.mapFirebaseError(err?.code) ?? err?.error?.message ?? 'Google login failed.';
        return of({ isSuccessful: false, message: msg });
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
    this.user.set(null);
    if (isFirebaseConfigured) {
      signOut(firebaseAuth).catch(() => {});
    }
  }

  isAuthenticated(): boolean { return !!this.user(); }
  getUser(): AdminUser | null { return this.user(); }
  hasRole(role: string): boolean {
    return (this.user()?.roles ?? []).some(r => r.toLowerCase() === role.toLowerCase());
  }

  private mapFirebaseError(code?: string): string | null {
    const map: Record<string, string> = {
      'auth/invalid-credential':  'Invalid email or password.',
      'auth/user-not-found':      'No account found for that email.',
      'auth/wrong-password':      'Invalid email or password.',
      'auth/too-many-requests':   'Too many attempts. Please try again later.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
    };
    return code ? (map[code] ?? null) : null;
  }
}
