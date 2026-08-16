import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TokenService } from './token.service';
import { oauthClient } from '../auth/config';

describe('TokenService', () => {
    let service: TokenService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        service = TestBed.inject(TokenService);
    });

    afterEach(async () => {
        await oauthClient.removeUser();
    });

    it('starts without an access token', () => {
        expect(service.getAccessToken()).toBeNull();
    });

    it('clears the OIDC user and application state', () => {
        service.clearToken();

        expect(service.getAccessToken()).toBeNull();
        expect(service.getUser()).toBeNull();
        expect(service.getIsAdmin()).toBeFalse();
    });
});
