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
