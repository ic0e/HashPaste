import { describe, it, expect } from 'vitest';
import { compressText, decompressText } from '../engine/compression';

describe('Compression', async () => {
  it('compresses and decompresses text', async () => {
      const original = 'Hi, this is some test data that should compress well because it has repetition repetition repetition';
      const compressed = await compressText(original);
      const decompressed = await decompressText(compressed);
      
      expect(decompressed).toBe(original);
    });

  it('handles empty string', async () => {
      const original = '';
      const compressed = await compressText(original);
      const decompressed = await decompressText(compressed);
      
      expect(decompressed).toBe(original);
    });

  it('handles large text', async () => {
      const original = 'x'.repeat(10000);
      const compressed = await compressText(original);
      const decompressed = await decompressText(compressed);
      
      expect(decompressed).toBe(original);
    });
})
