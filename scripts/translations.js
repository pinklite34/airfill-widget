const { exec } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

const getClientEnv = require('../config/env');
const i18n = require('../config/i18n');

const { LOCIZE_PROJECT_ID } = getClientEnv().raw

const translationPath = path.relative(process.cwd(), './src/translations');

function downloadTranslations({ lng, namespace }) {
  const cmd = `npx locize download --language ${lng} --project-id ${LOCIZE_PROJECT_ID} --ver latest  --namespace ${namespace} --target ${translationPath} --format flat`;

  return new Promise((resolve, reject) => {
    exec(cmd, { maxBuffer: 500 * 1024 }, (error, stdout, stderr) => {
      console.info(stdout);
      console.error(stderr);
      if (error) return reject(error);
      resolve();
    });
  });
}

function downloadAllTranslations() {
  fs.emptyDirSync(translationPath);

  i18n.supportedLanguageKeys.map(lng => {
    i18n.namespaces.map(namespace => downloadTranslations({ lng, namespace }));
  });
}

downloadAllTranslations();
