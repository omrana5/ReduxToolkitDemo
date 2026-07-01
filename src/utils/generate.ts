import fs from 'fs';

const genRanHex = (size: number): string =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('')
    .toUpperCase();

const EncKey = genRanHex(32);
//? write secure generated key
const keyWrite = fs.createWriteStream('src/utils/encryption/encKey.ts');
keyWrite.write("export const key = '" + EncKey + "';\n");
