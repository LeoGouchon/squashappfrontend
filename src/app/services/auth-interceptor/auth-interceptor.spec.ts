import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './auth-interceptor';

describe('AuthInterceptor', () => {
    let httpClient: HttpClient;
    let httpTesting: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(
                    withInterceptors([authInterceptor]),
                ),
                provideHttpClientTesting()
            ]
        })
    });
    beforeEach(() => {
        httpClient = TestBed.inject(HttpClient);
        httpTesting = TestBed.inject(HttpTestingController);
    })

    afterEach(() => {
        httpTesting.verify();
    });

    it('should add and Authorization header', () => {
        const token = 'fake-token';
        document.cookie = `token=${token}; path=/;`;

        httpClient.get('/test').subscribe();
        const req = httpTesting.expectOne('/test');
        expect(req.request.withCredentials).toBeTrue();
    })
})
