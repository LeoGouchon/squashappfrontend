import {TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TokenService} from './token.service';

describe('TokenService', () => {
    const storageKey = 'squashapp.accessToken';
    let service: TokenService;

    beforeEach(() => {
        localStorage.removeItem(storageKey);

        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });

        service = TestBed.inject(TokenService);
    });

    afterEach(() => {
        localStorage.removeItem(storageKey);
    });

    it('should store the access token in localStorage', () => {
        service.setAccessToken('fake-token');

        expect(localStorage.getItem(storageKey)).toBe('fake-token');
        expect(service.getAccessToken()).toBe('fake-token');
    });

    it('should read the access token from localStorage', () => {
        localStorage.setItem(storageKey, 'stored-token');

        expect(service.getAccessToken()).toBe('stored-token');
    });

    it('should remove the access token from localStorage when cleared', () => {
        service.setAccessToken('fake-token');

        service.clearToken();

        expect(localStorage.getItem(storageKey)).toBeNull();
        expect(service.getAccessToken()).toBeNull();
    });
});
