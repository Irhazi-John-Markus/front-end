import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyA4F5wDPE5y6npwznJMC9njNZMivfgvJmc",
  authDomain: "front-end-ddf3d.firebaseapp.com",
  projectId: "front-end-ddf3d",
  storageBucket: "front-end-ddf3d.firebasestorage.app",
  messagingSenderId: "264142511019",
  appId: "1:264142511019:web:61a2bf3772463bf7a510ee"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};

