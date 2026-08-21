import brotliPromise from 'brotli-wasm';

export async function compressText(text: string): Promise<string> {
  const brotli = await brotliPromise;

  const textEncoder = new TextEncoder();

  const uncompressedData = textEncoder.encode(text);
  const compressedData = brotli.compress(uncompressedData);

  return bytesToBase64Url(compressedData);
}

export async function decompressText(hash: string): Promise<string> {
  const brotli = await brotliPromise;

  let base64 = normalizeBase64Url(hash);

  const binaryString = atob(base64);
  const bytes = Uint8Array.from(binaryString, c => c.charCodeAt(0));
  
  const textDecoder = new TextDecoder();
  const decompressedData = brotli.decompress(bytes);

  const result = textDecoder.decode(decompressedData);

  return result;
}


// get safe URLs
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

function normalizeBase64Url(hash: string): string {
  let base64 = hash.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4 !== 0) base64 += '=';

  return base64;
}
