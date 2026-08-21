const fs = require('fs');
const path = require('path');

const envDir = path.join(__dirname, 'src/environments');
const envFilePath = path.join(envDir, 'environment.prod.ts');

const apiUrl = process.env.API_URL;

if (!apiUrl) {
    console.error('❌ Variable d\'environnement API_URL non définie !');
    process.exit(1);
}

const targetEnvironment = `
export const environment = {
  production: true,
  apiUrl: '${apiUrl}',
  timeoutValue: 3000,
  identityIssuer: '${process.env.IDENTITY_ISSUER || 'https://identity.leogouchon.com'}',
  identityAuthFrontendUrl: '${process.env.IDENTITY_AUTH_FRONTEND_URL || 'https://identity.leogouchon.com'}',
  identityClientId: '${process.env.IDENTITY_CLIENT_ID || 'squash-client'}',
  identityRedirectUri: '${process.env.IDENTITY_REDIRECT_URI || 'https://squash.leogouchon.com/'}',
  identityPostLogoutRedirectUri: '${process.env.IDENTITY_POST_LOGOUT_REDIRECT_URI || 'https://squash.leogouchon.com/'}',
  identityResource: '${process.env.IDENTITY_RESOURCE || 'https://backend.api.default/'}',
  identityScope: '${process.env.IDENTITY_SCOPE || 'openid profile email'}',
};
`;

if (!fs.existsSync(envDir)) {
    fs.mkdirSync(envDir, { recursive: true });
    console.log('📁 Dossier environments/ créé');
}

fs.writeFile(envFilePath, targetEnvironment, function (err) {
    if (err) {
        console.error('❌ Erreur lors de la création de environment.prod.ts', err);
    } else {
        console.log('✅ Fichier environment.prod.ts généré avec succès');
        console.log('Using API URL:', apiUrl);
    }
});
