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
const taborCollection = db.collection('tabor')

const taborId = 'PZoqUnD5OMJcO1aQoPfP'
const currentTaborDocument = taborCollection.doc(taborId)
export const daysCollection = currentTaborDocument.collection('days')

// Get a list of cities from your database
export async function getActions(db) {
  const actionsColl = collection(db, 'cities');
  const actionsSnapshot = await getDocs(actionsColl);
  const actionsList = actionsSnapshot.docs.map(doc => doc.data());
  return actionsList;
}
export function getDayById(dayId) {
    return daysCollection.doc(dayId).get()
        .then(res => {
            const dayData = res.data()
            dayData["id"] = res.id
            return dayData
        })
        .catch(e => {
            console.error("Error while loading day by id", dayId)
            console.error(e)
        })
}

export function loadAllDaysOfTabor() {
    return daysCollection.get()
        .then(doc => {
            const days = []
            doc.forEach((d) => {
                const dayData = d.data()
                dayData["id"] = d.id
                days.push(dayData)
            })
            return days
        })
        .catch((error) => {
            console.error("Error during loading all days of tabor")
            console.error(error)
        });
}
