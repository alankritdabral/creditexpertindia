import crypto from 'crypto';

// We must set the environment variables before importing the security module
// to avoid the runtime throw "ENCRYPTION_SECRET must be a 32-byte hex string"
process.env.ENCRYPTION_SECRET = crypto.randomBytes(32).toString('hex');
process.env.HMAC_SECRET = 'test-hmac-secret-123';

import { encrypt, decrypt, generateHmac } from '@/lib/security';

describe('Security Utilities', () => {
  describe('Encryption (AES-256-GCM)', () => {
    it('should encrypt and decrypt strings correctly', () => {
      const plaintext = 'Sensitive PAN Number 123';
      const encrypted = encrypt(plaintext);
      
      expect(encrypted).not.toBe(plaintext);
      expect(encrypted.split(':').length).toBe(3); // iv:authTag:data
      
      const decrypted = decrypt(encrypted);
      expect(decrypted).toBe(plaintext);
    });

    it('should fail decryption if data is tampered with', () => {
      const plaintext = 'Hello World';
      const encrypted = encrypt(plaintext);
      
      // Tamper with the encrypted data part (last segment)
      const parts = encrypted.split(':');
      parts[2] = 'ffffffffffffffff' + parts[2].substring(16);
      const tampered = parts.join(':');
      
      expect(() => decrypt(tampered)).toThrow();
    });
  });

  describe('HMAC Hashing', () => {
    it('should deterministically hash a string', () => {
      const input = '9876543210';
      const hash1 = generateHmac(input);
      const hash2 = generateHmac(input);
      
      expect(hash1).toBe(hash2); // Deterministic
      expect(hash1).not.toBe(input); // One-way
      expect(hash1.length).toBe(64); // SHA-256 hex length
    });
  });
});
