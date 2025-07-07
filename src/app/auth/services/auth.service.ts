import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, user } from '@angular/fire/auth';


export interface UserInterface {
  uid: string;
  email: string | null;
  displayName?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService { 
 firebaseAuth = inject(Auth);
 user$ = user(this.firebaseAuth);
 currentUserSig = signal <UserInterface | null | undefined>(undefined);
  router: any;


 register(email:string, username:string, password:string): Observable<void> {
  const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password,).then(response => updateProfile(response.user,{
    displayName: username
  }))
  return from(promise);
 }
  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(()=>{});
    return from(promise);
  }
}