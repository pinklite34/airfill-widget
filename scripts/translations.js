const { exec } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

const i18n = require('../config/i18n');

const LOCIZE_PROJECT_ID = '3a082193-3b75-4cdb-9be4-018cee014baa';

const translationPath = path.relative(process.cwd(), './translations');

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
  fs.writeFileSync(`${translationPath}/index.js`, '');

  i18n.supportedLanguageKeys.map(lng => {
    i18n.namespaces.map(namespace => downloadTranslations({ lng, namespace }));
  });
}

downloadAllTranslations();
