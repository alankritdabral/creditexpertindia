const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

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

    // Send email with the new codes
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_TO) {
      console.log("Sending email with new access codes...");
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const currentDate = new Date().toLocaleDateString('en-IN', { 
        timeZone: 'Asia/Kolkata', 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        ...(process.env.EMAIL_CC && { cc: process.env.EMAIL_CC }),
        subject: `Daily Access Codes - ${currentDate}`,
        html: `
          <h3>Access Codes for ${currentDate}</h3>
          <ul>
            ${Object.entries(newCodes).map(([branch, code]) => `<li><b>${branch.toUpperCase()}:</b> ${code}</li>`).join('')}
          </ul>
        `
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }
    } else {
      console.log("Email credentials not found in environment (EMAIL_USER, EMAIL_PASS, EMAIL_TO). Skipping email.");
    }

    process.exit(0);
  } catch (error) {
    console.error('Error rotating codes:', error);
    process.exit(1);
  }
}

run();
