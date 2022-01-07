import firebase from 'firebase/app'
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAhYx2YUk6AIUjAsa-VIqKJauJHLOdhCyE",
  authDomain: "fireblogs-vue-8e04b.firebaseapp.com",
  projectId: "fireblogs-vue-8e04b",
  storageBucket: "fireblogs-vue-8e04b.appspot.com",
  messagingSenderId: "842034394088",
  appId: "1:842034394088:web:b6de51c2ce65ee41382a5d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const timestamp = firebase.firestore.FieldValue.serverTimestamp()

export {timestamp}
export default firebaseApp.firestore();