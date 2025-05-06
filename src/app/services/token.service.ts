import { Injectable } from '@angular/core';

export interface TokenServiceInterface {

}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
    private accessToken: string | null = null;

    setAccessToken(token: string) {
        this.accessToken = token;
    }

    getAccessToken(): string | null {
        return this.accessToken;
    }

    clearToken() {
        this.accessToken = null;
    }
}
