import { db } from './firebase';
import { FieldValue } from 'firebase-admin/firestore';

export type GuardResult = {
  allowed: boolean;
  reason?: string;
};

/**
 * Basic Token Bucket / Fixed Window rate limit implementation via Firestore
 */
export async function checkRateLimit(
  identifier: string,
  limit: number,
  windowInSeconds: number
): Promise<GuardResult> {
  if (!db) return { allowed: true }; // Fail open

  try {
    // We replace colons with underscores to make safe document IDs
    const safeId = identifier.replace(/:/g, '_');
    const docRef = db.collection('rate_limits').doc(safeId);
    
    // We use a transaction to guarantee atomic increment and check
    const isAllowed = await db.runTransaction(async (t) => {
      const doc = await t.get(docRef);
      const now = Date.now();
      
      if (doc.exists) {
        const data = doc.data()!;
        if (data.expiresAt < now) {
          // Expired, reset
          t.set(docRef, { count: 1, expiresAt: now + windowInSeconds * 1000 });
          return limit >= 1;
        } else {
          // Still active, check limit
          const newCount = data.count + 1;
          if (newCount > limit) {
            return false;
          }
          t.update(docRef, { count: FieldValue.increment(1) });
          return true;
        }
      } else {
        // First time
        t.set(docRef, { count: 1, expiresAt: now + windowInSeconds * 1000 });
        return limit >= 1;
      }
    });

    return { allowed: isAllowed, reason: isAllowed ? undefined : 'Rate limit exceeded' };
  } catch (error) {
    console.error('Rate limit error:', error);
    return { allowed: true };
  }
}

/**
 * Reads the current usage of a key without incrementing it.
 */
export async function getRateLimitUsage(identifier: string): Promise<number> {
  if (!db) return 0;
  try {
    const safeId = identifier.replace(/:/g, '_');
    const docRef = db.collection('rate_limits').doc(safeId);
    const doc = await docRef.get();
    
    if (doc.exists) {
      const data = doc.data()!;
      if (data.expiresAt > Date.now()) {
        return data.count;
      }
    }
    return 0;
  } catch (e) {
    console.error('getRateLimitUsage error:', e);
    return 0;
  }
}

/**
 * Explicitly increments a limit and sets expiry if it's the first hit.
 */
export async function incrementRateLimit(identifier: string, windowInSeconds: number): Promise<void> {
  if (!db) return;
  try {
    const safeId = identifier.replace(/:/g, '_');
    const docRef = db.collection('rate_limits').doc(safeId);
    
    await db.runTransaction(async (t) => {
      const doc = await t.get(docRef);
      const now = Date.now();
      
      if (doc.exists && doc.data()!.expiresAt > now) {
        t.update(docRef, { count: FieldValue.increment(1) });
      } else {
        t.set(docRef, { count: 1, expiresAt: now + windowInSeconds * 1000 });
      }
    });
  } catch (e) {
    console.error('incrementRateLimit error:', e);
  }
}

/**
 * Attempts to acquire an idempotency lock for a specific request.
 */
export async function acquireIdempotencyLock(
  idempotencyKey: string,
  ttlInSeconds: number = 60
): Promise<boolean> {
  if (!db || !idempotencyKey) return true; // Fail open

  try {
    const safeId = idempotencyKey.replace(/:/g, '_');
    const docRef = db.collection('idempotency_locks').doc(safeId);
    
    const acquired = await db.runTransaction(async (t) => {
      const doc = await t.get(docRef);
      const now = Date.now();
      
      if (doc.exists) {
        if (doc.data()!.expiresAt > now) {
          // Lock is still active, deny
          return false;
        }
      }
      
      // Acquire new lock
      t.set(docRef, { locked: true, expiresAt: now + ttlInSeconds * 1000 });
      return true;
    });
    
    return acquired;
  } catch (error) {
    console.error('Idempotency lock error:', error);
    return true; // Fail open
  }
}

/**
 * Releases the idempotency lock. 
 */
export async function releaseIdempotencyLock(idempotencyKey: string): Promise<void> {
  if (!db || !idempotencyKey) return;
  try {
    const safeId = idempotencyKey.replace(/:/g, '_');
    await db.collection('idempotency_locks').doc(safeId).delete();
  } catch (error) {
    console.error('Idempotency release error:', error);
  }
}
