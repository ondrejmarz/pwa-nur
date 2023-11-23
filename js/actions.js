function generateEmptyDayData() {
    return {
        doWarmUp: true,
        podAction: "",
        budik: {
            seconds: 1700722800,
            nanoseconds: 798000000
        },
        odpoActionDesc: "",
        doNastup: true,
        veActionDesc: "",
        timetableCreated: false,
        vecerka: {
            seconds: 1700773200,
            nanoseconds: 342000000
        },
        dopoAction: "",
        odpoAction: "",
        veAction: "",
        podActionName: "",
        date: "13.7.",
        day: "Pondělí",
        dopoActionDesc: "",
    }
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

// Vypíše rozvrh na celý den, parametr day obsahuje všechny informace, na kterých rozvrh závisí
// Na konci vykresluje tlačítko k archivaci
function renderDay(day) {

  const actionsElement = document.getElementById('day-actions');
    day.dopoAction = day.dopoAction === "" ? "Dopolední akce (k vyplnění)": day.dopoAction
    day.podAction = day.podAction === "" ? "Podvečerní akce (k vyplnění)": day.podAction
    day.odpoAction = day.odpoAction === "" ? "Odpolední akce (k vyplnění)": day.odpoAction
    day.veAction = day.veAction === "" ? "Večerní akce (k vyplnění)": day.veAction
    const createTimetableBtn = `
          <div class="right">
            <a class="btn-floating btn-large add-btn sidenav-trigger" data-target="create-form">Vytvořit rozvrh</a>
          </div>
    `
    const archiveButton = `
              <div class="right">
                <a class="btn-large add-btn sidenav-trigger" data-target="archivate">Archivovat</a>
              </div>
    `
    const btnUsed = day.timetableCreated ? archiveButton : createTimetableBtn

  actionsElement.innerHTML = `
      <div class="actions container grey-text text-darken-1">
            <div class="card-panel action white row">
              <div class="action-time-normal">
                <div class="action-time-start">${timestampToHHMM(day.budik, 0)}</div>
              </div> 
              <div class="action-details">
                <div class="action-title">Budíček</div>
              </div>
              <div class="action-edit">
                <i class="material-icons">chevron_right</i>
              </div>
            </div>

            <div id="warm-up">
              
            </div>

            <div class="card-panel action white row">
              <div class="action-time-normal">
                <div class="action-time-start">${timestampToHHMM(day.budik, 30)}</div>
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
              <div class="action-edit">
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
                <div class="action-edit">
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
                <div class="action-edit">
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
                  <div class="action-time-end">${timestampToHHMM(day.vecerka, -15)}</div>
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
                  <div class="action-time-start">${timestampToHHMM(day.vecerka, 0)}</div>
                </div> 
                <div class="action-details">
                  <div class="action-title">Večerka</div>
                </div>
                <div class="action-edit">
                  <i class="material-icons">chevron_right</i>
                </div>
              </div>

              ${btnUsed}
      </div>
      `;

      if (day.doWarmUp) {
        const warmUpElement = document.getElementById('warm-up');
    
        warmUpElement.innerHTML = `
          <div class="card-panel action white row">
            <div class="action-time-normal">
              <div class="action-time-start">${timestampToHHMM(day.budik, 15)}</div>
            </div> 
            <div class="action-details">
                  <div class="action-title">Rozcvička</div>
            </div>
            <div class="action-edit">
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
            <div class="action-edit">
              <i class="material-icons">chevron_right</i>
            </div>
          </div>
        `
      }
}