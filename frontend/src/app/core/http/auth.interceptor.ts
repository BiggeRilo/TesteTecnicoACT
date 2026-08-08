import { type HttpEvent, type HttpHandlerFn, type HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorage } from '../services/token-storage.service';

function isPublicAuthRequest(url: string): boolean {
  return /\/api\/auth\/(login|register)$/.test(url);
}

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const tokenStorage = inject(TokenStorage);
  if (isPublicAuthRequest(req.url)) {
    return next(req);
  }
  const token = tokenStorage.getAccessToken();
  if (token) {
    const cloned = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return next(cloned);
  }
  return next(req);
}
