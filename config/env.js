const env = require('dotenv').config();
const parsed = env.parsed;

module.exports = {
  parsed: parsed,
  stringified: {
    'process.env': Object.keys(parsed).reduce((env, key) => {
      env[key] = JSON.stringify(parsed[key]);
      return env;
    }, {}),
  },
}
