import { Injectable } from '@angular/core';

export interface TokenServiceInterface {
    isTokenPresent(): boolean;
    getToken(): string
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isTokenPresent(): boolean {
      const tokenCookie = document.cookie.split(';').find(x => x.trim().startsWith('token='));
      return !!tokenCookie && tokenCookie.split('=')[1] !== '';
  }

  removeToken(): void { document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'; }
}
