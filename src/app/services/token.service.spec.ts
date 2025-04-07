import {TestBed} from '@angular/core/testing';

import {TokenService} from './token.service';

describe('TokenService', () => {
    let service: TokenService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TokenService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should remove token', () => {
        const token = 'fake-token';
        document.cookie = `token=${token}; path=/;`;

        service.removeToken();
        expect(document.cookie).toBe('');
    })

    it('should return that token is present', () => {
        const token = 'fake-token';
        document.cookie = `token=${token}; path=/;`;
        expect(service.isTokenPresent()).toBeTruthy();
    })

    it('should return that token is not present', () => {
        expect(service.isTokenPresent()).toBeFalsy();
    })
});
