// Inicializace Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBREpNaltCczA4mw8MXPFvodWsmNzeI5sw",
  authDomain: "pwa-camp-calendar.firebaseapp.com",
  projectId: "pwa-camp-calendar",
  storageBucket: "pwa-camp-calendar.appspot.com",
  messagingSenderId: "371363956824",
  appId: "1:371363956824:web:937bb8bebc462536e8622d",
  measurementId: "G-BMEXF6MDF0"
};
const app = firebase.initializeApp(firebaseConfig);

// Získání instance Firestore
const db = app.firestore(app);
let currentDay = null;

function saveId(id) {
        
  db.collection("actions")
  .where("id", "==", id )
  .limit(1)
  .get()
  .then(querySnapshot => {
      console.log( querySnapshot.docs[0].data() );
      renderDay( querySnapshot.docs[0].data() );
      currentDay = querySnapshot.docs[0].data();
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
      renderEmptyDay();
  });
}

function getDayData(id) {
        
  db.collection("actions")
  .where("id", "==", id )
  .limit(1)
  .get()
  .then(querySnapshot => {
      console.log( querySnapshot.docs[0].data() );
      React.useEffect(() => {
        actionsElement.innerHTML = OdpolednInnost();
    }, []);
      return querySnapshot.docs[0].data();
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });
}


function timestampToHHMM(timestamp, addMM) {
  // Převedení Timestamp na objekt Date
  const date = new Date((timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6) + addMM * 60 * 1000);

  // Získání hodin a minut z objektu Date
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Sestavení řetězce ve formátu HH:MM
  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
}

function goToDetail(activity_id, day_id){
  console.log(currentDay)
     // window.location = 'activity_detail.html?activity=' + activity_id + '&day='+ day_id;
     renderActivity(currentDay);
  return;
}

// Vypíše rozvrh na celý den, parametr day obsahuje všechny informace, na kterých rozvrh závisí
// Na konci vykresluje tlačítko k archivaci
function renderDay(day) {

  const actionsElement = document.getElementById('day-actions');

  actionsElement.innerHTML = `
      <div class="actions container grey-text text-darken-1">
            <div class="card-panel action white row">
              <div class="action-time-normal">
                <div class="action-time-start">${timestampToHHMM(day.startOfDay, 0)}</div>
              </div> 
              <div class="action-details">
                <div class="action-title">Budíček</div>
              </div>
              <div onclick="goToDetail(1 , ${day.id})" class="action-edit">
                <i class="material-icons">chevron_right</i>
              </div>
            </div>

            <div id="warm-up">
              
            </div>

            <div  class="card-panel action white row">
              <div class="action-time-normal">
                <div class="action-time-start">${timestampToHHMM(day.startOfDay, 30)}</div>
              </div>
              <div class="action-details">
                <div class="action-title">Snídaně</div>
              </div>
            </div>

            <div class="card-panel action white row">
              <div class="action-time-main">
                <div class="action-time-start">10:00</div>
                <div class="action-time-end">12:00</div>
              </div> 
              <div class="action-details">
                <div class="action-title">${day.dopoAction}</div>
              </div>
              <div onclick="goToDetail(2)" class="action-edit">
                <i class="material-icons">chevron_right</i>
              </div>
            </div>
  
            <div class="card-panel action white row">
              <div class="action-time-normal">
                <div class="action-time-start">12:30</div>
              </div> 
              <div class="action-details">
                <div class="action-title">Oběd</div>
              </div>
            </div>
  
            <div class="card-panel action white row">
              <div class="action-details">
                <div class="action-title">Polední klid</div>
              </div>
            </div>
  
            <div class="card-panel action white row">
                <div class="action-time-main">
                  <div class="action-time-start">14:30</div>
                </div> 
                <div class="action-details">
                  <div class="action-title">${day.odpoAction}</div>
                </div>
                <div onclick="goToDetail(3)" class="action-edit">
                  <i class="material-icons">chevron_right</i>
                </div>
              </div>
  
              <div class="card-panel action white row">
                <div class="action-time-normal">
                  <div class="action-time-start">16:00</div>
                </div> 
                <div class="action-details">
                  <div class="action-title">Svačina</div>
                </div>
              </div>
  
              <div class="card-panel action white row">
                <div class="action-time-main">
                  <div class="action-time-start">17:00</div>
                </div> 
                <div class="action-details">
                  <div class="action-title">${day.podAction}</div>
                </div>
                <div onclick="goToDetail(4)" class="action-edit">
                  <i class="material-icons">chevron_right</i>
                </div>
              </div>
  
              <div id="nastup">
              
              </div>
  
              <div class="card-panel action white row">
                <div class="action-time-normal">
                  <div class="action-time-start">19:00</div>
                </div> 
                <div class="action-details">
                  <div class="action-title">Večeře</div>
                </div>
              </div>
  
              <div class="card-panel action white row">
                <div class="action-time-main">
                  <div class="action-time-start">20:00</div>
                  <div class="action-time-end">${timestampToHHMM(day.endOfDay, -15)}</div>
                </div> 
                <div class="action-details">
                  <div class="action-title">${day.veAction}</div>
                </div>
              </div>
  
              <div class="card-panel action white row">
                <div class="action-details">
                  <div class="action-title">Příprava na večerku</div>
                </div>
              </div>
  
              <div class="card-panel action white row">
                <div class="action-time-normal">
                  <div class="action-time-start">${timestampToHHMM(day.endOfDay, 0)}</div>
                </div> 
                <div class="action-details">
                  <div class="action-title">Večerka</div>
                </div>
                <div onclick="goToDetail(5)" class="action-edit">
                  <i class="material-icons">chevron_right</i>
                </div>
              </div>

              <div class="right">
                <a class="btn-large add-btn sidenav-trigger" data-target="archivate">Archivovat</a>
              </div>
      </div>
      `;

      if (day.doWarmUp) {
        const warmUpElement = document.getElementById('warm-up');
    
        warmUpElement.innerHTML = `
          <div class="card-panel action white row">
            <div class="action-time-normal">
              <div class="action-time-start">${timestampToHHMM(day.startOfDay, 15)}</div>
            </div> 
            <div class="action-details">
                  <div class="action-title">Rozcvička</div>
            </div>
            <div onclick="goToDetail(0)" class="action-edit">
              <i class="material-icons">chevron_right</i>
            </div>
          </div>
        `
      }

      if (day.doNastup) {
        const nastupElement = document.getElementById('nastup');
    
        nastupElement.innerHTML = `
          <div class="card-panel action white row">
            <div class="action-details">
              <div class="action-title">Nástup</div>
            </div>
            <div onclick="goToDetail(6)" class="action-edit">
              <i class="material-icons">chevron_right</i>
            </div>
          </div>
        `
      }
}

// Vypíše prázdný rozvrh na celý den
// Na konci vykresluje tlačítko k vytvoření rozvrhu
function renderEmptyDay() {

  const actionsElement = document.getElementById('day-actions');

  actionsElement.innerHTML = `
      <div class="actions container grey-text text-darken-1">
        <div class="card-panel action white row">
          <div class="action-time-normal">
            <div class="action-time-start">8:00</div>
          </div> 
          <div class="action-details">
            <div class="action-title">Budíček</div>
          </div>
        </div>
        <div class="card-panel action white row">
          <div class="action-time-normal">
            <div class="action-time-start">8:15</div>
          </div> 
          <div class="action-details">
            <div class="action-title">Rozcvička</div>
          </div>
        </div>
        <div class="card-panel action white row">
          <div class="action-time-normal">
            <div class="action-time-start">8:30</div>
          </div>
          <div class="action-details">
            <div class="action-title">Snídaně</div>
          </div>
        </div>
        <div class="card-panel action white row">
          <div class="action-time-main">
            <div class="action-time-start">10:00</div>
            <div class="action-time-end">12:00</div>
          </div> 
          <div class="action-details">
            <div class="action-title">Dopolední činnost</div>
          </div>
        </div>

        <div class="card-panel action white row">
            <div class="action-time-normal">
              <div class="action-time-start">12:30</div>
            </div> 
            <div class="action-details">
              <div class="action-title">Oběd</div>
            </div>
          </div>

          <div class="card-panel action white row">
            <div class="action-details">
              <div class="action-title">Polední klid</div>
            </div>
          </div>

        <div class="card-panel action white row">
            <div class="action-time-main">
              <div class="action-time-start">14:30</div>
            </div> 
            <div class="action-details">
              <div class="action-title">Odpolední činnost</div>
            </div>
          </div>

          <div class="card-panel action white row">
            <div class="action-time-normal">
              <div class="action-time-start">16:00</div>
            </div> 
            <div class="action-details">
              <div class="action-title">Svačina</div>
            </div>
          </div>

          <div class="card-panel action white row">
            <div class="action-time-main">
              <div class="action-time-start">17:00</div>
            </div> 
            <div class="action-details">
              <div class="action-title">Podvečerní činnost</div>
            </div>
          </div>

          <div class="card-panel action white row">
            <div class="action-details">
              <div class="action-title">Nástup</div>
            </div>
          </div>

          <div class="card-panel action white row">
            <div class="action-time-normal">
              <div class="action-time-start">19:00</div>
            </div> 
            <div class="action-details">
              <div class="action-title">Večeře</div>
            </div>
          </div>

          <div class="card-panel action white row">
            <div class="action-time-main">
              <div class="action-time-start">20:00</div>
            </div> 
            <div class="action-details">
              <div class="action-title">Večerní činnost</div>
            </div>
          </div>

          <div class="card-panel action white row">
            <div class="action-details">
              <div class="action-title">Příprava na večerku</div>
            </div>
          </div>

          <div class="card-panel action white row">
            <div class="action-time-normal">
              <div class="action-time-start">22:00</div>
            </div> 
            <div class="action-details">
              <div class="action-title">Večerka</div>
            </div>
          </div>

          <div class="right">
            <a class="btn-floating btn-large add-btn sidenav-trigger" data-target="create-form">Vytvořit rozvrh</a>
          </div>
        `
}

function renderActivity(day) {

  const actionsElement = document.getElementById('day-actions');

  actionsElement.innerHTML = `
  <body>
  <div class="odpoledn-innost">
    <div class="div">
      <div class="overlap">
        <div class="rectangle">

          <div class="as-bud-ku-mus-b-t">Čas od: ${timestampToHHMM(day.startOfDay, 15)}</div>
          <div class="text-wrapper">${day.odpoAction}</div>
          <div class="overlap-group">
            <div class="content-wrapper">
              <div class="content">
                <div class="div-wrapper"><div class="label-text-2">Název činnosti</div></div>
                <div class="placeholder-text"><div class="placeholder-text-2">Kamenný Labyrint</div></div>
              </div>
            </div>
            <div class="state-layer-2">
              <div class="content">
                <div class="label-text-3"><div class="label-text-2">Popis činnosti</div></div>
                <div class="placeholder-text-wrapper">
                  <p class="p">
                    Oddíly mají za úkol postavit v prvním <br />lese z kamenů labyrint vhodné <br />velikosti k tomu,
                    aby jej děti probíhaly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-wrapper-2">Čas do: ${timestampToHHMM(day.startOfDay, 15)}</div>
          <div class="button-dal">
        <div class="label-text-wrapper"><div class="label-text">Upravit</div></div>
      </div>
      </div>
    </div>
  </div>
        `
}