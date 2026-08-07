import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import type { AuthResponse, AuthUser, LoginRequest, RegisterRequest, User } from '../../shared/models/user';
import { environment } from '../../../environments/environment';
import { TokenStorage } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenStorage = inject(TokenStorage);
  private readonly router = inject(Router);

  private readonly userSignal = signal<AuthUser | null>(this.tokenStorage.getUser());

  readonly user = this.userSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.tokenStorage.getAccessToken());
  readonly isAdmin = computed(() => this.userSignal()?.role === 'ADMIN');

  login(request: LoginRequest) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, request).pipe(
      tap((response) => this.handleAuth(response)),
    );
  }

  register(request: RegisterRequest) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, request).pipe(
      tap((response) => this.handleAuth(response)),
    );
  }

  logout(): void {
    this.tokenStorage.clear();
    this.userSignal.set(null);
    this.router.navigate(['/login']);
  }

  private handleAuth(response: AuthResponse): void {
    this.tokenStorage.save(response.accessToken, response.refreshToken, response.user);
    this.userSignal.set(response.user);
  }
}

export type { User };
