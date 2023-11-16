import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
        apiKey: "AIzaSyBREpNaltCczA4mw8MXPFvodWsmNzeI5sw",
        authDomain: "pwa-camp-calendar.firebaseapp.com",
        projectId: "pwa-camp-calendar",
        storageBucket: "pwa-camp-calendar.appspot.com",
        messagingSenderId: "371363956824",
        appId: "1:371363956824:web:937bb8bebc462536e8622d",
        measurementId: "G-BMEXF6MDF0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Get a list of cities from your database
export async function getActions(db) {
  const actionsColl = collection(db, 'cities');
  const actionsSnapshot = await getDocs(actionsColl);
  const actionsList = actionsSnapshot.docs.map(doc => doc.data());
  return actionsList;
}