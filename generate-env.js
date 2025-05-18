const fs = require('fs');
const path = require('path');

const envDir = path.join(__dirname, 'src/environments');
const envFilePath = path.join(envDir, 'environment.prod.ts');

const targetEnvironment = `
export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL}',
  timeoutValue: 3000,
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
    }
});
