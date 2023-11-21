import admin from "firebase-admin";

export default admin.initializeApp({
  credential: admin.credential.cert("credentials-firebase.json"),
});
