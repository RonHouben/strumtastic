import admin from 'firebase-admin';
import * as fireorm from 'fireorm';

export function initFirestore() {
  console.log('initializing firestore');

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        projectId: process.env.FIREBASE_PROJECT_ID
      }),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
    });

    const firestore = admin.firestore();

    fireorm.initialize(firestore);

    console.log('initializing firestore - DONE');
  } else {
    console.log('initializing firestore - SKIPPED already initialized');
  }
}
