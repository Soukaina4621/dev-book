import firebase from 'firebase'
import 'firebase/auth'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

const firebaseConfig = firebase.initializeApp(config)
const db = firebaseConfig.firestore()
const storage = firebase.storage()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

// initialise auth
const auth = firebaseConfig.auth()

export { db, storage, timestamp, auth }