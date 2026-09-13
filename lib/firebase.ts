import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Protect against multiple initializations in development mode (Next.js hot reloads)
if (!getApps().length) {
  try {
    const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
    
    if (!serviceAccountBase64) {
      console.warn('⚠️ FIREBASE_SERVICE_ACCOUNT_BASE64 is not set in the environment variables.');
    } else {
      const serviceAccount = JSON.parse(
        Buffer.from(serviceAccountBase64, 'base64').toString('utf8')
      );

      initializeApp({
        credential: cert(serviceAccount)
      });
      
      console.log('Firebase Admin initialized successfully');
    }
  } catch (error) {
    console.error('Firebase Admin initialization error', error);
  }
}

const db = getApps().length ? getFirestore() : null;

export { db };
