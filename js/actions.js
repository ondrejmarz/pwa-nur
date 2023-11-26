// tohle to je proto, aby fungovala sipka zpatky.
// k zapamatovani, kde byla appka naposled
const historyQueue = []
//Toto taha data z formulářů a do formátu pro DB
function getDayFromForm() {
    return {
        id:currentDay.id,
        doWarmUp: document.getElementById("toggle-rozcvicka").value, // nefunguje jak má asi je ještě potřeba nějaká transformace?
        podAction: document.getElementById("podvecer_description").value,
        budik: currentDay.budik,
        odpoActionDesc:  document.getElementById("odpo_description").value,
        doNastup: document.getElementById("toggle-nastup").value,
        veActionDesc:  document.getElementById("vecerni_description").value,
        timetableCreated: true,
        vecerka: currentDay.vecerka,
        dopoAction:  document.getElementById("dopo_name").value,
        odpoAction:  document.getElementById("odpo_name").value,
        veAction:  document.getElementById("vecerni_name").value,
        podActionName:  document.getElementById("podvecer_name").value,
        date: currentDay.date,
        day: currentDay.day,
        dopoActionDesc:  document.getElementById("dopo_description").value,
    }
}

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

let spanHoldingIcon = document.getElementById("icon-holder")
const hamburger = document.createElement("i")
hamburger.className = "material-icons sidenav-trigger"
hamburger.setAttribute("data-target", "side-menu")
hamburger.innerText = "menu"
const arrowBack = document.createElement("i")
arrowBack.className = "material-icons"
arrowBack.innerText = "arrow_back"

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

//upravuje mělo by i vytvářet nové záznamy
function saveDataToDb(){
  let newDay = getDayFromForm();
  console.log(newDay)
  updateOrCreateDayInDb(newDay)
  renderDay(newDay); // vyrendruje nový den z memory, takže to bude updated i kdyby failnula db... nevím jestli to tak chceme?
}

function goToDetail(activityId){
  console.log(currentDay)
  switch (activityId) {
    case 1:
      renderActivity("8:00","8:15","Budíček","","",activityId) // todo update
      break;
    case 2:
      renderActivity("8:15","8:30","Rozcvička","","",activityId) // todo update
      break;
    case 3:
      renderActivity("10:00","12:00","Dopolední aktivita",currentDay.dopoAction,currentDay.dopoActionDesc,activityId)
      break;
    case 4:
      renderActivity("14:30","16:00","Odpolední aktivita",currentDay.odpoAction,currentDay.odpoActionDesc,activityId)
      break;
    case 5:
      renderActivity("17:00","19:00","Podvečerní aktivita",currentDay.podAction,currentDay.podActionName,activityId)
      break;
    case 6:
      renderActivity("20:00","21:45","Večerní aktivita",currentDay.veAction,currentDay.veActionDesc,activityId)
      break;
    case 7:
      renderActivity("22:00","8:00","Večerka","","",activityId)//todo update 
      break;
    case 8:
        // toto jest vecerni nastup,
      break;
    default:
      break;
    
}
return;
}

// Vypíše rozvrh na celý den, parametr day obsahuje všechny informace, na kterých rozvrh závisí
// Na konci vykresluje tlačítko k archivaci
function renderDay(day) {
    setAppbarTitle(day.day + " " + day.date)
    currentDay = day;
  const actionsElement = document.getElementById('day-actions');
    day.dopoAction = day.dopoAction === "" ? "Dopolední akce (k vyplnění)": day.dopoAction
    day.podAction = day.podAction === "" ? "Podvečerní akce (k vyplnění)": day.podAction
    day.odpoAction = day.odpoAction === "" ? "Odpolední akce (k vyplnění)": day.odpoAction
    day.veAction = day.veAction === "" ? "Večerní akce (k vyplnění)": day.veAction

    const createTimetableBtn = `
          <div class="right">
            <a id="create-form-btn" class="btn-floating btn-large add-btn">Vytvořit rozvrh</a>
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
              <div onclick="goToDetail(1)" class="action-edit">
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
              <div onclick="goToDetail(3)" class="action-edit">
                <i class="material-icons" >chevron_right</i>
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
                <div onclick="goToDetail(4)" class="action-edit">
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
                <div onclick="goToDetail(5)" class="action-edit">
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
                <div onclick="goToDetail(6)" class="action-edit">
                <i class="material-icons">chevron_right</i>
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
                <div onclick="goToDetail(7)" class="action-edit">
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
            <div onclick="goToDetail(2)" class="action-edit">
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

      if(btnUsed == createTimetableBtn) {
        const createTimetableBtn = document.getElementById('create-form-btn');
        createTimetableBtn.addEventListener('click',  () => renderCreateForm(currentDay.id))
        console.log("on click added")
      }
    }

    function setAppbarTitle(name) {
        const appbarTitleElement = document.getElementById("appbar-title")
        appbarTitleElement.innerText = name
    }
    function setAppbarIconArrowBack() {
        document.getElementById("icon-holder").innerHTML = arrowBack.outerHTML
        document.getElementById("icon-holder").addEventListener("click", goToLastHtml)
    }

    function setAppbarIconHamburger() {
        document.getElementById("icon-holder").innerHTML = hamburger.outerHTML
        document.getElementById("icon-holder").removeEventListener("click", goToLastHtml)
    }

    function goToLastHtml() {
        const actionsElement = document.getElementById('day-actions');
        const lastEntry = historyQueue.pop()
        const html = lastEntry["html"]
        const icon = lastEntry["icon"]
        actionsElement.innerHTML = html

        if (icon === "hamburger") {
            setAppbarIconHamburger()
        } else if (icon === "arrow") {
            setAppbarIconArrowBack()
        }

        // tohle to je hack, kdyz se vracim z upravy rozvrhu, aby tlacitko upravit znova fungovalo
        try {
            const createTimetableBtn = document.getElementById('update-from-btn');
            createTimetableBtn.addEventListener('click', lastUpravitButtonCallback)
        } catch (e) {

        }

        console.log(lastEntry["appbarTitle"])
        setAppbarTitle(lastEntry["appbarTitle"])
    }

function renderActivity(from, to, type ,name, description,activityId) {

    const actionsElement = document.getElementById('day-actions');
    historyQueue.push({"html": actionsElement.outerHTML, "icon": "hamburger", "appbarTitle": document.getElementById("appbar-title").innerText})
    setAppbarIconArrowBack()

    setAppbarTitle("Detail aktivity " + type)
     actionsElement.innerHTML =  `
  <body>
  <div class="odpoledn-innost">
    <div class="div">
      <div class="overlap">
        <div class="rectangle">
          <div class="as-bud-ku-mus-b-t">Čas od: ${from} </div>
          <div class="text-wrapper-2">Čas do: ${to} </div>
          <div class="text-wrapper">${type}</div>
          <div class="overlap-group">
            <div class="content-wrapper">
              <div class="content">
                <div class="div-wrapper"><div class="label-text-2">Název činnosti</div></div>
                <div class="placeholder-text"><div class="placeholder-text-2">${name}</div></div>
              </div>
            </div>
            <div class="state-layer-2">
              <div class="content">
                <div class="label-text-3"><div class="label-text-2">Popis činnosti</div></div>
                <div class="placeholder-text-wrapper">
                  <p class="p">
                  ${description}
                  </p>
                </div>
              </div>
            </div>
          </div>

      </div>
    </div>
  </div>
  <div id="update-from-btn" class="btn-floating-update-actvity btn-large add-btn sidenav-trigger")">
  <div class="label-text-wrapper"><div class="label-text">Upravit</div></div>
  </div>
  </div>
        `

    const createTimetableBtn = document.getElementById('update-from-btn');
    console.log("current day: ", currentDay)
    lastUpravitButtonCallback = () => renderUpdateForm(currentDay.previous_day_id,activityId, currentDay.day + " " + currentDay.date, activityId)
    createTimetableBtn.addEventListener('click', lastUpravitButtonCallback)
}

let lastUpravitButtonCallback

var previous_header = null;
var previous_content = null;
var previous_day_id = null;
function backClick() {
  const actionsElement = document.getElementById('day-actions');
  actionsElement.innerHTML = previous_content;
  var div_to_replace = document.getElementById('replace');
  div_to_replace.innerHTML = previous_header;
  const createTimetableBtn = document.getElementById('create-form-btn');
  createTimetableBtn.addEventListener('click', () => renderCreateForm(previous_day_id))
  console.log("on click added")
}

async function renderCreateForm(id) {
  var div_to_replace = document.getElementById('replace');
  previous_header = div_to_replace.innerHTML;
  div_to_replace.innerHTML = ` <span id="appbar-title">Tvorba rozvrhu</span>
  <span onclick=backClick() id="menuIcon" class="left grey-text text-darken-1">
    <i class="material-icons">arrow_back</i>
  </span>`
  previous_day_id = id;
  
  const lastDay = await loadLastDayOfDayById(id) 

  const actionsElement = document.getElementById('day-actions');
  console.log("on click3")

  previous_content = actionsElement.innerHTML;
  actionsElement.innerHTML = `
  <div>
  <form data-multi-step class="multi-step-form">
  <div class="card active" data-step data-card-name="ranni_budik" data-activity-id="1">
    <label class="form-title" >Ranní budík</label><br/> 
    <label class="form-text">Čas včerejší večerky: ${timestampToHHMM(lastDay.vecerka, 0)}</label><br/>
    <div class="input-container">
        <div class="input-column">
        <input type="number" id="hours" pattern="[0-2][0-9]|23" placeholder="08" maxlength="2" />
        <label for="hours">Hodiny</label>
        </div>
        <span>:</span>
        <div class="input-column">
        <input type="number" id="minutes" pattern="[0-5][0-9]|59" placeholder="30" maxlength="2" />
        <label for="minutes">Minuty</label>
        </div>
    </div>
    <div class="button-container">
      <div class="right">
        <a class="btn-large add-btn">Předchozí</a>
      </div>
      <div class="right">
        <a class="btn-large add-btn" data-next>Další</a>
      </div>
    </div>
  </div>
  <div class="card" data-step data-card-name="rozcvicka" data-activity-id="2">
    <label class="form-title">Ranní rozcvička</label><br/>
    <label class="form-text">Ranní rozcvička 15 minut po budíku.</label><br/>
    <label class="form-text-bold">Čas:</label>
    <label class="form-text"> 08:15</label><br/>
    <label class="form-text-bold">Rozcvička se bude konat: </label>
    <div class="toggle-checkbox-wrapper">
      <input class="toggle-checkbox" type="checkbox" id="toggle-rozcvicka">
      <label class="slider" for="toggle-rozcvicka">
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
  <div class="card" data-step data-card-name="dopoledni_cinnost" data-activity-id="3">
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
  <div class="card" data-step data-card-name="odpoledni_cinnost" data-activity-id="4">
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
  <div class="card" data-step data-card-name="podvecerni_cinnost" data-activity-id="5">
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
  <div class="card" data-step data-card-name="vecerni_nastup" data-activity-id="8">
    <label class="form-title">Večerní nástup</label><br/>
    <label class="form-text-bold">Čas:</label>
    <label class="form-text"> 18:30</label><br/>
    <label class="form-text-bold">Nástup se bude konat: </label>
    <div class="toggle-checkbox-wrapper">
      <input class="toggle-checkbox" type="checkbox" id="toggle-nastup">
      <label class="slider" for="toggle-nastup">
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
  <div class="card" data-step data-card-name="vecerni_cinnost" data-activity-id="6">
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
  <div class="card" data-step data-card-name="vecerka" data-activity-id="7">
    <label class="form-title" >Večerka</label><br/>
    <label class="form-text">Čas včerejší večerky: ${timestampToHHMM(lastDay.vecerka, 0)}</label><br/>
    <div class="input-container">
    <div class="input-column">
    <input type="number" id="hours" pattern="[0-2][0-9]|23" placeholder="08" maxlength="2" />
    <label for="hours">Hodiny</label>
    </div>
    <span>:</span>
    <div class="input-column">
    <input type="number" id="minutes" pattern="[0-5][0-9]|59" placeholder="30" maxlength="2" />
    <label for="minutes">Minuty</label>
    </div>
</div>
    <div class="button-container">
      <div class="right">
        <a class="btn-large add-btn" data-prev>Předchozí</a>
      </div>
      <div onClick="saveDataToDb()" class="right">
        <a class="btn-large add-btn" data-submit>Uložit</a>
      </div>
    </div>
  </div>
  </form>
 </div>
  `;

  console.log("script loaded")
const multiStepForm = document.querySelector("[data-multi-step]")
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]
let currentStep = formSteps.findIndex(step => {
  return step.classList.contains("active")
})

if (currentStep < 0) {
  currentStep = 0
  showCurrentStep()
}

multiStepForm.addEventListener("click", e => {
  console.log("script loaded 1")
  let incrementor
  if (e.target.matches("[data-next]")) {
    incrementor = 1
  } else if (e.target.matches("[data-prev]")) {
    incrementor = -1
  }

  if (incrementor == null) return

  const inputs = [...formSteps[currentStep].querySelectorAll("input")]
  const allValid = inputs.every(input => input.reportValidity())
  if (allValid) {
    currentStep += incrementor
    showCurrentStep()
    console.log("show current step")
  }
})
/*
formSteps.forEach(step => {
  step.addEventListener("animationend", e => {
    formSteps[currentStep].classList.remove("hide")
    e.target.classList.toggle("hide", !e.target.classList.contains("active"))
  })
}) */

function showCurrentStep() {
  console.log("showing current step")
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep)
  })
}
}

async function renderUpdateForm(id, activityId, appbarTitle) {
  //const lastDay = await loadLastDayOfDayById(id)

  const actionsElement = document.getElementById('day-actions');
  console.log("on click3")
    historyQueue.push({"html": actionsElement.outerHTML, "icon": "arrow", "appbarTitle": document.getElementById("appbar-title").innerText})
    setAppbarIconArrowBack()

    setAppbarTitle("Úprava rozvrhu " + appbarTitle)

  actionsElement.innerHTML = `
  <div>
  <form data-multi-step class="multi-step-form">
  <div class="card active" data-step data-activity-id="1">
    <label class="form-title" >Ranní budík</label><br/> 
    <label class="form-text">Čas včerejší večerky: ${timestampToHHMM(currentDay.vecerka, 0)}</label><br/>
    <div class="input-container">
        <div class="input-column">
        <input type="number" id="hours" pattern="[0-2][0-9]|23" placeholder="08" maxlength="2" />
        <label for="hours">Hodiny</label>
        </div>
        <span>:</span>
        <div class="input-column">
        <input type="number" id="minutes" pattern="[0-5][0-9]|59" placeholder="30" maxlength="2" />
        <label for="minutes">Minuty</label>
        </div>
    </div>
    <div class="button-container">
      <div class="right">
        <a class="btn-large add-btn">Předchozí</a>
      </div>
      <div class="right">
        <a class="btn-large add-btn" data-next>Další</a>
      </div>
    </div>
  </div>
  <div class="card" data-step data-activity-id="2">
    <label class="form-title">Ranní rozcvička</label><br/>
    <label class="form-text">Ranní rozcvička 15 minut po budíku.</label><br/>
    <label class="form-text-bold">Čas:</label>
    <label class="form-text"> 08:15</label><br/>
    <label class="form-text-bold">Rozcvička se bude konat: </label>
    <div class="toggle-checkbox-wrapper">
      <input value="${currentDay.doWarmUp}" class="toggle-checkbox" type="checkbox" id="toggle-rozcvicka">
      <label class="slider" for="toggle-rozcvicka">
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
  <div class="card" data-step data-activity-id="3">
    <label class="form-title">Dopolední činnost</label><br/>
    <label class="form-text-bold">Čas od:</label>
    <label class="form-text"> 10:00</label><br/>
    <label class="form-text-bold">Čas do:</label>
    <label class="form-text"> 12:00</label><br/>
    <div class="input-field-active">
      <label for="dopo_name" class="form-text"> Název činnosti</label>
      <input value="${currentDay.dopoAction}" type="text" id="dopo_name" name="name"><br>
    </div>
    <div class="input-field-active">
      <label for="dopo_description" class="form-text">Popis činnosti</label>
      <input  value="${currentDay.dopoActionDesc}" type="text" id="dopo_description" name="description"><br>
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
  <div class="card" data-step data-activity-id="4">
    <label class="form-title">Odpolední činnost</label><br/>
    <label class="form-text-bold">Čas od:</label>
    <label class="form-text"> 14:30</label><br/>
    <label class="form-text-bold">Čas do:</label>
    <label class="form-text"> 16:00</label><br/>
    <div class="input-field-active">
      <label for="odpo_name">Název činnosti</label>
      <input value="${currentDay.odpoAction}" type="text" id="odpo_name" name="name">
    </div>
    <div class="input-field-active">
      <label for="odpo_description">Popis činnosti</label>
      <input value="${currentDay.odpoActionDesc}" type="text" id="odpo_description" name="description">
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
  <div class="card" data-step data-activity-id="5">
    <label class="form-title">Podvečerní činnost</label><br/>
    <label class="form-text-bold">Čas od:</label>
    <label class="form-text"> 16:30</label><br/>
    <label class="form-text-bold">Čas do:</label>
    <label class="form-text"> 18:00</label><br/>
    <div class="input-field-active">
      <label for="podvecer_name">Název činnosti</label>
      <input value="${currentDay.podActionName}" type="text" id="podvecer_name" name="name">
    </div>
    <div class="input-field-active">
      <label for="podvecer_description">Popis činnosti</label>
      <input value="${currentDay.podAction}" type="text" id="podvecer_description" name="description">
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
  <div class="card" data-step data-activity-id="8">
    <label class="form-title">Večerní nástup</label><br/>
    <label class="form-text-bold">Čas:</label>
    <label class="form-text"> 18:30</label><br/>
    <label class="form-text-bold">Nástup se bude konat: </label>
    <div class="toggle-checkbox-wrapper">
      <input class="toggle-checkbox" type="checkbox" id="toggle-nastup">
      <label class="slider" for="toggle-nastup">
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
  <div class="card" data-step data-activity-id="6">
    <label class="form-title">Večerní činnost</label><br/>
    <label class="form-text-bold">Čas od:</label>
    <label class="form-text"> 20:00</label><br/>
    <label class="form-text-bold">Čas do:</label>
    <label class="form-text"> půl hodiny před večerkou</label><br/>
    <div class="input-field-active">
      <label for="vecerni_name">Název činnosti</label>
      <input value="${currentDay.veAction}" type="text" id="vecerni_name" name="name">
    </div>
    <div cclass="input-field-active">
      <label for="vecerni_description">Popis činnosti</label>
      <input value="${currentDay.veActionDesc}"type="text" id="vecerni_description" name="description">
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
  <div class="card" data-step data-activity-id="7">
    <label class="form-title" >Večerka</label><br/>
    <label class="form-text">Čas včerejší večerky: ${timestampToHHMM(currentDay.vecerka, 0)}</label><br/>
    <div class="input-container">
    <div class="input-column">
    <input type="number" id="hours" pattern="[0-2][0-9]|23" placeholder="08" maxlength="2" />
    <label for="hours">Hodiny</label>
    </div>
    <span>:</span>
    <div class="input-column">
    <input type="number" id="minutes" pattern="[0-5][0-9]|59" placeholder="30" maxlength="2" />
    <label for="minutes">Minuty</label>
    </div>
</div>
    <div class="button-container">
      <div class="right">
        <a class="btn-large add-btn" data-prev>Předchozí</a>
      </div>
      <div onClick="saveDataToDb()" class="right">
        <a class="btn-large add-btn" data-submit>Uložit</a>
      </div>
    </div>
  </div>
  </form>
 </div>
  `;

    makeCardActiveByActivityId(activityId)

  const multiStepForm = document.querySelector("[data-multi-step]")

  multiStepForm.addEventListener("click", e => {
    console.log("script loaded 1")
    let incrementor
    if (e.target.matches("[data-next]")) {
      incrementor = 1
    } else if (e.target.matches("[data-prev]")) {
      incrementor = -1
    }
  
    if (incrementor == null) return
  
      activityId += incrementor
      makeCardActiveByActivityId(activityId)
  })

}

function makeCardActiveByActivityId(activityId) {
    const activeCard = document.querySelector("div.card.active")
    activeCard.classList.remove("active")
    document.querySelector(`div[data-activity-id="${activityId}"]`).classList.add("active")
}
