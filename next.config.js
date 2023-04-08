/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  env: {
    firebaseApiKey: process.env.NEXT_APP_FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.NEXT_APP_FIREBASE_AUTH_DOMAIN,
    firebaseDatabaseUrl: process.env.NEXT_APP_FIREBASE_DATABASE_URL,
    firebaseProjectId: process.env.NEXT_APP_FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.NEXT_APP_FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.NEXT_APP_FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.NEXT_APP_FIREBASE_APP_ID,
    firebaseMeasurementId: process.env.NEXT_APP_FIREBASE_MEASUREMENT_ID,
  },
};

module.exports = nextConfig;
