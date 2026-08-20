import sodium from 'libsodium-wrappers-sumo';
import { compressText, decompressText } from './compression';

export async function encrypt(text: string, password: string): Promise<string> {
  await sodium.ready;
  
  const compressed = await compressText(text);
  const compressedBytes = sodium.from_base64(compressed, sodium.base64_variants.URLSAFE_NO_PADDING);
  const salt = sodium.randombytes_buf(sodium.crypto_pwhash_SALTBYTES);
  const passwordBytes = sodium.from_string(password);
  
  const key = sodium.crypto_pwhash(
    sodium.crypto_secretbox_KEYBYTES,
    passwordBytes,
    salt,
    sodium.crypto_pwhash_OPSLIMIT_MODERATE,
    sodium.crypto_pwhash_MEMLIMIT_MODERATE,
    sodium.crypto_pwhash_ALG_DEFAULT
  );
  
  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
  const ciphertext = sodium.crypto_secretbox_easy(compressedBytes, nonce, key);
  
  const safeSalt = bytesToBase64Url(salt);
  const safeNonce = bytesToBase64Url(nonce);
  const safeCiphertext = bytesToBase64Url(ciphertext);
  
  return safeSalt + '.' + safeNonce + '.' + safeCiphertext;
}

export async function decrypt(payload: string, password: string): Promise<string> {
  await sodium.ready;
  if (!payload || !password) {
    throw new Error("Payload and password are required for decryption.");
  }
  
  const parts = payload.split('.');
  if (parts.length !== 3) {
    throw new Error("Invalid payload format. Expected 3 dot-separated parts.");
  }
  
  const [saltB64, nonceB64, ciphertextB64] = parts;
  
  const salt = sodium.from_base64(saltB64, sodium.base64_variants.URLSAFE_NO_PADDING);
  const nonce = sodium.from_base64(nonceB64, sodium.base64_variants.URLSAFE_NO_PADDING);
  const ciphertext = sodium.from_base64(ciphertextB64, sodium.base64_variants.URLSAFE_NO_PADDING);
  
  const key = sodium.crypto_pwhash(
    sodium.crypto_secretbox_KEYBYTES,
    sodium.from_string(password),
    salt,
    sodium.crypto_pwhash_OPSLIMIT_MODERATE,
    sodium.crypto_pwhash_MEMLIMIT_MODERATE,
    sodium.crypto_pwhash_ALG_DEFAULT
  );
  
  try {
    const decryptedBytes = sodium.crypto_secretbox_open_easy(ciphertext, nonce, key);
    const compressedBase64 = sodium.to_base64(decryptedBytes, sodium.base64_variants.URLSAFE_NO_PADDING);
    return await decompressText(compressedBase64);
  } catch (cryptoErr) {
    console.error("Decryption failed: Incorrect password or corrupted data.");
    return "H_P_FAILED_DECRYPTION";
  }
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
