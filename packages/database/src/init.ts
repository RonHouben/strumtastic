import * as dotenv from 'dotenv';
import admin from 'firebase-admin';
import * as fireorm from 'fireorm';

dotenv.config();

export function initFirestore() {
  console.log('initializing firestore');

  if (admin.apps.length === 0) {
    const app = admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      }),
      databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
    });

    const firestore = admin.firestore();

    fireorm.initialize(firestore);

    console.log('initializing firestore - DONE');
  } else {
    console.log('initializing firestore - SKIPPED already initialized');
  }
}
