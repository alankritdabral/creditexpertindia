const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    let credential;
    
    if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
      const decoded = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8');
      credential = admin.credential.cert(JSON.parse(decoded));
    } else {
      credential = admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
      });
    }

    admin.initializeApp({
      credential,
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
    process.exit(1);
  }
}

const adminDb = admin.firestore();

// Generate a random 6-character alphanumeric code
const generateCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

async function run() {
  console.log("Starting access codes rotation...");
  try {
    const branches = ['rudrapur', 'delhi', 'dehradun'];
    const batch = adminDb.batch();
    const newCodes = {};

    branches.forEach((branch) => {
      const code = generateCode();
      newCodes[branch] = code;
      const docRef = adminDb.collection('access_code_creditexpert').doc(branch);
      batch.set(docRef, {
        code,
        updatedAt: new Date()
      }, { merge: true });
    });

    await batch.commit();
    console.log("Successfully rotated codes:", newCodes);
    process.exit(0);
  } catch (error) {
    console.error('Error rotating codes:', error);
    process.exit(1);
  }
}

run();
