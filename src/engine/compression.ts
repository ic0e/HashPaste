export async function compressText(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const bytes: Uint8Array = encoder.encode(text);
 
  const cs = new CompressionStream('deflate-raw');

  const writer = cs.writable.getWriter();
  await writer.write(bytes as unknown as ArrayBuffer); // as unknown first to prevent errors
  await writer.close();

  const compressedBuffer: ArrayBuffer = await new Response(cs.readable).arrayBuffer();
  const compressedBytes = new Uint8Array(compressedBuffer);

  return bytesToBase64Url(compressedBytes);
}

export async function decompressText(hash: string): Promise<string> {
  let base64 = hash.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }

    const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

  const ds = new DecompressionStream('deflate-raw');
  const writer = ds.writable.getWriter();
  await writer.write(bytes.buffer as ArrayBuffer);
  await writer.close();

  const decompressedBuffer = await new Response(ds.readable).arrayBuffer();

  const decoder = new TextDecoder();
  return decoder.decode(decompressedBuffer);
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
