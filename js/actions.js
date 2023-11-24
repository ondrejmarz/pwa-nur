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
    document.getElementById("appbar-title").innerText = day.day + " " + day.date

  const actionsElement = document.getElementById('day-actions');
    day.dopoAction = day.dopoAction === "" ? "Dopolední akce (k vyplnění)": day.dopoAction
    day.podAction = day.podAction === "" ? "Podvečerní akce (k vyplnění)": day.podAction
    day.odpoAction = day.odpoAction === "" ? "Odpolední akce (k vyplnění)": day.odpoAction
    day.veAction = day.veAction === "" ? "Večerní akce (k vyplnění)": day.veAction

    const createTimetableBtn = `
          <div class="right">
            <a id="create-form-btn" class="btn-floating btn-large add-btn sidenav-trigger" data-target="create-form-btn">Vytvořit rozvrh</a>
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

      if (createTimetableBtn) {
        const createTimetableBtn = document.getElementById('create-form-btn');
        createTimetableBtn.addEventListener('click', renderCreateForm)
        console.log("on click added")
      }
}

function backClick() {
 window.history.back();
}

function renderCreateForm() {

  var div_to_replace = document.getElementById('replace');
  div_to_replace.innerHTML = ` <span id="appbar-title">Tvorba rozvrhu</span>
  <span onclick=backClick() id="menuIcon" class="left grey-text text-darken-1">
    <i class="material-icons">arrow_back</i>
  </span>`
  

  console.log("on click2")

  const actionsElement = document.getElementById('day-actions');
  console.log("on click3")

  var script = document.createElement('script');
  script.setAttribute('src', '/js/script.js');

  actionsElement.innerHTML = `
  <div>
  <form data-multi-step class="multi-step-form">
  <div class="card active" data-step>
    <label class="form-title" >Ranní budík</label><br/> 
    <label class="form-text">Čas včerejší večerky: TODO</label><br/>  <!-- TODO z db -->
    <div class="input-field">
      <input type="text" id="cas_budiku" name="name">
      <label for="cas_budiku">Čas budíku</label>
    </div>
    <label>Hodiny</label>
    <label>Minuty</label><br/>
    <div class="button-container">
      <div class="right">
        <a class="btn-large add-btn">Předchozí</a>
      </div>
      <div class="right">
        <a class="btn-large add-btn" data-next>Další</a>
      </div>
    </div>
  </div>
  <div class="card" data-step>
    <label class="form-title">Ranní rozcvička</label><br/>
    <label class="form-text">Ranní rozcvička 15 minut po budíku.</label><br/>
    <label class="form-text-bold">Čas:</label>
    <label class="form-text"> 08:15</label><br/>
    <label class="form-text-bold">Rozcvička se bude konat: </label>
    <div class="toggle-checkbox-wrapper">
      <input class="toggle-checkbox" type="checkbox" id="toggle">
      <label class="slider" for="toggle">
      </label>
    </div><br/>
    <div class="button-container">
      <div class="right">
        <a class="btn-large add-btn" data-prev>Předchozí</a>
      </div>
      <div class="right">
        <a class="btn-large add-btn" data-next>Další</a>
      </div>
    </div>
  </div>
  <div class="card" data-step>
    <label class="form-title">Dopolední činnost</label><br/>
    <label class="form-text-bold">Čas od:</label>
    <label class="form-text"> 10:00</label><br/>
    <label class="form-text-bold">Čas do:</label>
    <label class="form-text"> 12:00</label><br/>
    <div class="input-field">
      <input type="text" id="dopo_name" name="name"><br>
      <label for="dopo_name" class="form-text"> Název činnosti</label>
    </div>
    <div class="input-field">
      <input type="text" id="dopo_description" name="description"><br>
      <label for="dopo_description" class="form-text">Popis činnosti</label>
    </div>
    <div class="button-container">
      <div class="right">
        <a class="btn-large add-btn" data-prev>Předchozí</a>
      </div>
      <div class="right">
        <a class="btn-large add-btn" data-next>Další</a>
      </div>
    </div>
  </div>
  <div class="card" data-step>
    <label class="form-title">Odpolední činnost</label><br/>
    <label class="form-text-bold">Čas od:</label>
    <label class="form-text"> 14:30</label><br/>
    <label class="form-text-bold">Čas do:</label>
    <label class="form-text"> 16:00</label><br/>
    <div class="input-field">
      <input type="text" id="odpo_name" name="name">
      <label for="odpo_name">Název činnosti</label>
    </div>
    <div class="input-field">
      <input type="text" id="odpo_description" name="description">
      <label for="odpo_description">Popis činnosti</label>
    </div>
    <div class="button-container">
      <div class="right">
        <a class="btn-large add-btn" data-prev>Předchozí</a>
      </div>
      <div class="right">
        <a class="btn-large add-btn" data-next>Další</a>
      </div>
    </div>
  </div>
  <div class="card" data-step>
    <label class="form-title">Podvečerní činnost</label><br/>
    <label class="form-text-bold">Čas od:</label>
    <label class="form-text"> 16:30</label><br/>
    <label class="form-text-bold">Čas do:</label>
    <label class="form-text"> 18:00</label><br/>
    <div class="input-field">
      <input type="text" id="podvecer_name" name="name">
      <label for="podvecer_name">Název činnosti</label>
    </div>
    <div class="input-field">
      <input type="text" id="podvecer_description" name="description">
      <label for="podvecer_description">Popis činnosti</label>
    </div>
    <div class="button-container">
      <div class="right">
        <a class="btn-large add-btn" data-prev>Předchozí</a>
      </div>
      <div class="right">
        <a class="btn-large add-btn" data-next>Další</a>
      </div>
    </div>
  </div>
  <div class="card" data-step>
    <label class="form-title">Večerní nástup</label><br/>
    <label class="form-text-bold">Čas:</label>
    <label class="form-text"> 18:30</label><br/>
    <label class="form-text-bold">Nástup se bude konat: </label>
    <div class="toggle-checkbox-wrapper">
      <input class="toggle-checkbox" type="checkbox" id="toggle">
      <label class="slider" for="toggle">
      </label>
    </div><br/>
    <div class="button-container">
      <div class="right">
        <a class="btn-large add-btn" data-prev>Předchozí</a>
      </div>
      <div class="right">
        <a class="btn-large add-btn" data-next>Další</a>
      </div>
    </div>
  </div>
  <div class="card" data-step>
    <label class="form-title">Večerní činnost</label><br/>
    <label class="form-text-bold">Čas od:</label>
    <label class="form-text"> 20:00</label><br/>
    <label class="form-text-bold">Čas do:</label>
    <label class="form-text"> půl hodiny před večerkou</label><br/>
    <div class="input-field">
      <input type="text" id="vecerni_name" name="name">
      <label for="vecerni_name">Název činnosti</label>
    </div>
    <div class="input-field">
      <input type="text" id="vecerni_description" name="description">
      <label for="vecerni_description">Popis činnosti</label>
    </div>
    <div class="button-container">
      <div class="right">
        <a class="btn-large add-btn" data-prev>Předchozí</a>
      </div>
      <div class="right">
        <a class="btn-large add-btn" data-next>Další</a>
      </div>
    </div>
  </div>
  <div class="card" data-step>
    <label class="form-title" >Večerka</label><br/>
    <label class="form-text">Čas včerejší večerky: TODO</label><br/>  <!-- TODO z db -->
    <div class="input-field">
      <input type="text" id="cas_vecerky" name="name">
      <label for="cas_vecerky">Čas večerky</label>
    </div>
    <label>Hodiny</label>
    <label>Minuty</label><br/>
    <div class="button-container">
      <div class="right">
        <a class="btn-large add-btn" data-prev>Předchozí</a>
      </div>
      <div class="right">
        <a class="btn-large add-btn" data-submit>Uložit</a>
      </div>
    </div>
  </div>
  </form>
 </div>
  `;

  actionsElement.appendChild(script)
}
