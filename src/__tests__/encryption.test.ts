import { describe, it, expect } from 'vitest';
import { encrypt, decrypt } from '../engine/encryption';

describe('Encryption', async () => {
  it("encrypts and decrypts text", async () => {
    const original = "Hi, this is another set of test data for encryption. Repetition repetition repetition, since it compresses first.";
    const password = "1234"
    
    const encrypted = await encrypt(original, password);
    const decrypted = await decrypt(encrypted, password);

    const wrong_decrypted = await decrypt(encrypted, "WrongPassword");

    expect(decrypted).toBe(original);
    expect(wrong_decrypted).not.toBe(original);
  });

  it("handles empty string", async () => {
    const original = "";
    const password = "1234";

    const encrypted = await encrypt(original, password);
    const decrypted = await decrypt(encrypted, password);

    expect(decrypted).toBe(original);
  });
})
