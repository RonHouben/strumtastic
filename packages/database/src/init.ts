import * as dotenv from 'dotenv';
import admin from 'firebase-admin';
import * as fireorm from 'fireorm';

dotenv.config();

export function initFirestore() {
  console.log('initializing firestore');

  console.log({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientMailNext: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
    privateKeyNext: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
    projectIdNext: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  })

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
