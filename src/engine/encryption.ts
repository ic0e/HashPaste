import sodium from 'libsodium-wrappers';

export async function encrypt(text: string, password: string): Promise<string> {
  await sodium.ready;

  const salt = sodium.randombytes_buf(sodium.crypto_pwhash_SALTBYTES);

  const key = sodium.crypto_pwhash(
    sodium.crypto_secretbox_KEYBYTES,
    password,
    salt,
    sodium.crypto_pwhash_OPSLIMIT_MODERATE,
    sodium.crypto_pwhash_MEMLIMIT_MODERATE,
    sodium.crypto_pwhash_ALG_DEFAULT
  );

  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
  const ciphertext = sodium.crypto_secretbox_easy(text, nonce, key);
  
  const safeSalt = bytesToBase64Url(salt);
  const safeNonce = bytesToBase64Url(nonce);
  const safeCiphertext = bytesToBase64Url(ciphertext);
  
  return safeSalt + '.' + safeNonce + '.' + safeCiphertext;
}

export async function decrypt(payload: string, password: string): Promise<string> {
  await sodium.ready;

  const [saltB64, nonceB64, ciphertextB64] = payload.split('.');

  const salt = sodium.from_base64(base64UrlToStandard(saltB64));
  const nonce = sodium.from_base64(base64UrlToStandard(nonceB64));
  const ciphertext = sodium.from_base64(base64UrlToStandard(ciphertextB64));

  const key = sodium.crypto_pwhash(
      sodium.crypto_secretbox_KEYBYTES,
      password,
      salt,
      sodium.crypto_pwhash_OPSLIMIT_MODERATE,
      sodium.crypto_pwhash_MEMLIMIT_MODERATE,
      sodium.crypto_pwhash_ALG_DEFAULT
    );

  sodium.crypto_secretbox_open_easy(ciphertext, nonce, key);
  
  return "";
}


function bytesToBase64Url(bytes: Uint8Array): string {
  let binaryString = '';
  bytes.forEach((byte) => {
    binaryString += String.fromCharCode(byte);
  });

  return btoa(binaryString)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlToStandard(str: string): string {
  return str.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (str.length % 4)) % 4);
}
