import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { environment } from '../../environments/environment';

export const identityConfig = {
    issuer: environment.identityIssuer.replace(/\/$/, ''),
    clientId: environment.identityClientId,
    redirectUri: environment.identityRedirectUri,
    postLogoutRedirectUri: environment.identityPostLogoutRedirectUri,
    resource: environment.identityResource,
    scope: environment.identityScope,
};

const localStorageStore = new WebStorageStateStore({ store: globalThis.localStorage });

export const oauthClient = new UserManager({
    authority: identityConfig.issuer,
    client_id: identityConfig.clientId,
    redirect_uri: identityConfig.redirectUri,
    post_logout_redirect_uri: identityConfig.postLogoutRedirectUri,
    response_type: 'code',
    scope: identityConfig.scope,
    resource: identityConfig.resource,
    loadUserInfo: false,
    automaticSilentRenew: true,
    userStore: localStorageStore,
    stateStore: localStorageStore,
});

export const randomState = (): string => {
    const bytes = new Uint8Array(32);
    globalThis.crypto.getRandomValues(bytes);
    return btoa(String.fromCodePoint(...bytes))
        .replaceAll('+', '-')
        .replaceAll('/', '_')
        .replace(/=+$/, '');
};
