const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const outPath = path.join(__dirname, 'src', 'environments', 'environment.ts');

const env = {};
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    const [key, ...rest] = line.split('=');
    env[key.trim()] = rest.join('=').trim();
  });
}

const get = (key, fallback = '') => env[key] || fallback;

const content = `export const environment = {
  production: false,
  apiUrl: '${get('NG_APP_API_URL', 'http://localhost:8000/api')}',
  firebase: {
    apiKey:            '${get('NG_APP_FIREBASE_API_KEY')}',
    authDomain:        '${get('NG_APP_FIREBASE_AUTH_DOMAIN')}',
    projectId:         '${get('NG_APP_FIREBASE_PROJECT_ID')}',
    storageBucket:     '${get('NG_APP_FIREBASE_STORAGE_BUCKET')}',
    messagingSenderId: '${get('NG_APP_FIREBASE_MESSAGING_SENDER_ID')}',
    appId:             '${get('NG_APP_FIREBASE_APP_ID')}',
  },
};
`;

fs.writeFileSync(outPath, content);
console.log('environment.ts generated from .env');
