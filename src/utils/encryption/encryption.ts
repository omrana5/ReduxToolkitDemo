/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const Crypto = require('crypto-js');
const fs = require('fs');
const readline = require('readline');

console.log('\nStarting project encryption');

const ignoreArrayOfEnv = [
  'ENVIRONMENT',
  'APP_VERSION',
  'CODE_PUSH_ANDROID',
  'ANDROID_VERSION_CODE',
  'IOS_BUILD_NUMBER',
  'DISPLAY_NAME',
  'CAST_APP_ID',
  'CODE_PUSH_SERVER_URL',
];

//?for get arguments
const args = process.argv;

let EncKey = null;
const envLineReaderOfEnc = readline.createInterface({
  input: fs.createReadStream('./src/utils/encryption/encKey.ts'),
});
envLineReaderOfEnc.on('line', line => {
  if (line && !!line && line.length > 0) {
    line = line.split('=');
    line = line[1];
    line = line.replace(/'/g, '');
    line = line.replace(/;/g, '');
    line = line.trim();
    EncKey = line;

    const envLineReader = readline.createInterface({
      input: fs.createReadStream(args[2]),
    });

    const outputToEnv = fs.createWriteStream('.env');

    //?read file line by line
    envLineReader.on('line', function (subLine) {
      if (subLine && !!subLine && subLine.length > 0) {
        const s = subLine.split('=');
        if (s?.[0] && !!s[0] && s[0] !== '' && s[1] && !!s[1] && s[1] !== '') {
          if (!ignoreArrayOfEnv.includes(s[0])) {
            const e = Crypto.AES.encrypt(s[1], EncKey).toString();
            const e1 = s.toString().replace(s[1], e);
            const s1 = e1.split(',');
            let f = s[0].concat('=' + s1[1]);
            f += '\r\n';
            outputToEnv.write(f);
          } else {
            subLine += '\r\n';
            outputToEnv.write(subLine);
          }
        }
      }
    });

    const outputToJs = fs.createWriteStream('./src/utils/encryption/Config.ts');
    outputToJs.write(
      `
  import Config from 'react-native-config-encrypted'; //?! This as double import anywhere in project won't work
  import ConfigProvider from 'react-native-config';
  import { key } from './encKey';


  Config.configure({
    key: key,
    provider: ConfigProvider,
  });

  function getConfigValue(value:string): string{
    return Config.get(value, true)
  }

  const config = {\n`,
    );

    //?read file line by line
    envLineReader.on('line', function (subLine) {
      if (subLine && !!subLine && subLine.length > 0) {
        const s = subLine.split('=');
        if (s?.[0] && !!s[0] && s[0] !== '' && s[1] && !!s[1] && s[1] !== '') {
          if (!ignoreArrayOfEnv.includes(s[0])) {
            outputToJs.write(`${s[0]}: getConfigValue('${s[0]}'),\n`);
          } else {
            outputToJs.write(`${s[0]}: '${s[1]}',\n`);
          }
        }
      }
    });

    setTimeout(() => {
      outputToJs.write('};\n\n export default config;');
      console.log('\nEncryption done\n\n');
    }, 1000);
  }
});

setTimeout(() => {
  if (!EncKey) {
    console.log('\n\nSomething went wrong!!\n\n\n');
  }
}, 3000);
