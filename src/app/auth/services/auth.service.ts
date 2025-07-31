import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, User, signOut } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// ✅ Interface for your app's user
export interface UserInterface {
  uid: string;
  email: string | null;
  displayName: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  constructor() {
    onAuthStateChanged(this.firebaseAuth, (user: User | null) => {
      if (user) {
        this.currentUserSig.set({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        this.currentUserSig.set(null);
      }
    });
  }

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(async (response) => {

        await updateProfile(response.user, {
          displayName: username,
        });

        this.currentUserSig.set({
          uid: response.user.uid,
          email: response.user.email,
          displayName: username,
        });
      })
      .catch((error) => {
        console.error('Registration failed', error);
        throw error;
      });

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(() => {
      })
      .catch((error) => {
        console.error('Login failed', error);
        throw error;
      });

    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth).then(() => {
      this.currentUserSig.set(null);
    });
    return from(promise);
  }
}