import crypto from 'crypto';

// The secret must be exactly 32 bytes for AES-256
// In production, ensure this is a strong, random 32-byte hex string
const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET || ''; 

// The HMAC secret can be any strong string
const HMAC_SECRET = process.env.HMAC_SECRET || '';

/**
 * Creates a one-way deterministic hash of a string (e.g., PAN, Mobile)
 * used for lookup and rate-limiting without storing the plaintext.
 */
export function generateHmac(text: string): string {
  if (!HMAC_SECRET) {
    throw new Error('HMAC_SECRET is not configured');
  }
  return crypto
    .createHmac('sha256', HMAC_SECRET)
    .update(text)
    .digest('hex');
}

/**
 * Encrypts a string using AES-256-GCM. 
 * Returns the format: iv:authTag:encryptedData
 */
export function encrypt(text: string): string {
  if (!ENCRYPTION_SECRET || Buffer.from(ENCRYPTION_SECRET, 'hex').length !== 32) {
    throw new Error('ENCRYPTION_SECRET must be a 32-byte hex string');
  }
  
  const key = Buffer.from(ENCRYPTION_SECRET, 'hex');
  const iv = crypto.randomBytes(12); // 96-bit IV recommended for GCM
  
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag().toString('hex');
  
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

/**
 * Decrypts a string that was encrypted with encrypt()
 */
export function decrypt(encryptedText: string): string {
  if (!ENCRYPTION_SECRET || Buffer.from(ENCRYPTION_SECRET, 'hex').length !== 32) {
    throw new Error('ENCRYPTION_SECRET must be a 32-byte hex string');
  }

  const key = Buffer.from(ENCRYPTION_SECRET, 'hex');
  const [ivHex, authTagHex, dataHex] = encryptedText.split(':');
  
  if (!ivHex || !authTagHex || !dataHex) {
    throw new Error('Invalid encrypted text format');
  }

  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(dataHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}
