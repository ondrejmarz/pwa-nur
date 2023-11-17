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

  actionsElement.innerHTML = `
      <div class="actions container grey-text text-darken-1">
            <div class="card-panel action white row">
              <div class="action-time-normal">
                <div class="action-time-start">${timestampToHHMM(day.startOfDay, 0)}</div>
              </div> 
              <div class="action-details">
                <div class="action-title">Budíček</div>
              </div>
            </div>
            <div id="warm-up" class="card-panel action white row">
              
            </div>
            <div class="card-panel action white row">
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
              </div>

              <div class="right">
                <a class="btn-large add-btn sidenav-trigger" data-target="archivate">Archivovat</a>
              </div>
      </div>
      `;

      if (day.doWarmUp) {
        const warmUpElement = document.getElementById('warm-up');
    
        warmUpElement.innerHTML = `
          <div class="action-time-normal">
            <div class="action-time-start">${timestampToHHMM(day.startOfDay, 15)}</div>
          </div> 
          <div class="action-details">
                <div class="action-title">Rozcvička</div>
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