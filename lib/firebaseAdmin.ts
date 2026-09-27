import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    // Only attempt initialization if we have the required environment variables
    if (process.env.FIREBASE_PROJECT_ID || process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
      let credential;
      
      if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
        const decoded = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8');
        credential = admin.credential.cert(JSON.parse(decoded));
      } else {
        credential = admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        });
      }

      admin.initializeApp({
        credential,
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
      });
    } else {
      console.warn("Firebase Admin skipped initialization: Missing required environment variables (expected during build).");
    }
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

// Export dummy objects during build time if Firebase fails to initialize
const adminDb = admin.apps.length ? admin.firestore() : ({} as admin.firestore.Firestore);
const adminAuth = admin.apps.length ? admin.auth() : ({} as admin.auth.Auth);

export { adminDb, adminAuth };
