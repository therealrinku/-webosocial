import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const config = {
  apiKey: process.env.firebaseApiKey,
  authDomain: process.env.firebaseAuthDomain,
  projectId: process.env.firebaseProjectId,
  storageBucket: process.env.firebaseStorageBucket,
  messagingSenderId: process.env.firebaseMessagingSenderId,
  appId: process.env.firebaseAppId,
  measurementId: process.env.firebaseMeasurementId,
};

const app = initializeApp(config);

const auth = getAuth(app);

export { auth };
