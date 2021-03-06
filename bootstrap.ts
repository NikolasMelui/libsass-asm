/*tslint:disable:no-console*/

/**
 * Script to download libsass wasm binary from https://github.com/kwonoj/docker-libsass-wasm.
 */

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { exec, rm } from 'shelljs';
import { promisify } from 'util';
//tslint:disable-next-line: no-require-imports no-var-requires
const { config } = require('./package.json');

// Package.json defines `libsass-version` under `config` section to find corresponding release version
const version = config['libsass-version'];
const readFile = promisify(fs.readFile);
const asyncExec = promisify(exec);

/**
 * Generate sha512 checksum from given string.
 */
const calculateChecksumFromFile = async (filePath: string) =>
  crypto
    .createHash('sha512')
    .update(await readFile(filePath))
    .digest('hex');

/**
 * Get remote release checksum.
 */
const getRemoteChecksum = (url: string) => {
  const { stdout } = exec(`wget -qO- ${url}.sha512`, { silent: true });
  return (stdout as string).slice(0, (stdout as string).indexOf(' '));
};

/**
 * Actually download binary from remote. This is direct invocation to wget, need local wget installation.
 *
 */
const downloadSingleBinary = async (libPath: string, binaryFile: { url: string; localBinaryPath: string }) => {
  const { url } = binaryFile;
  await asyncExec(`wget -q --directory-prefix=${libPath} ${url}`);

  if (!validateBinaries([binaryFile])) {
    throw new Error(`Downloaded binary checksum mismatch, cannot complete bootstrap`);
  }
};

/**
 * Compare checksum of given file between remote.
 */
const validateBinaries = async (binaryFiles: Array<{ url: string; localBinaryPath: string }>) => {
  for (const binaryFile of binaryFiles) {
    const { url, localBinaryPath } = binaryFile;

    //Create checksum validator
    const remoteChecksum = getRemoteChecksum(url);
    const validateBinary = async () => (await calculateChecksumFromFile(localBinaryPath)) === remoteChecksum;
    const isBinaryExists = () => fs.existsSync(localBinaryPath);

    if (isBinaryExists() && (await validateBinary())) {
      continue;
    } else {
      return false;
    }
  }

  return true;
};

/**
 * Main script execution
 */
(async () => {
  const libPath = path.resolve('./src/bin');
  const binaryFiles = [`libsass.js`, `libsass.wasm`].map(fileName => ({
    url: `https://github.com/kwonoj/docker-libsass-wasm/releases/download/${version}/${fileName}`,
    localBinaryPath: path.join(libPath, fileName),
    type: path.extname(fileName) === '.js' ? 'hex' : ('binary' as crypto.HexBase64Latin1Encoding)
  }));

  const isBinaryValid = await validateBinaries(binaryFiles);

  if (!isBinaryValid) {
    rm('-f', path.join(libPath, 'libsass.js'));
    rm('-f', path.join(libPath, 'libsass.wasm'));

    console.log(`Downloading libsass wasm binary version '${version}'`);

    for (const singleFile of binaryFiles) {
      await downloadSingleBinary(libPath, singleFile);
    }
  }
})();
