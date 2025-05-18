const fs = require('fs');

const envFilePath = './src/environments/environment.prod.ts';

const targetEnvironment = `
export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL}',
  timeoutValue: 3000,
};
`;

fs.writeFile(envFilePath, targetEnvironment, function (err) {
    if (err) {
        console.error('❌ Erreur lors de la création de environment.prod.ts', err);
    } else {
        console.log('✅ Fichier environment.prod.ts généré avec succès');
    }
});
