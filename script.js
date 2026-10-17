import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDnqrKqORbOS3izwQMoutSiwgneDpLevM",
  authDomain: "automatic-watering-syste-48e4c.firebaseapp.com",
  databaseURL: "https://automatic-watering-syste-48e4c-default-rtdb.firebaseio.com",
  projectId: "automatic-watering-syste-48e4c",
  storageBucket: "automatic-watering-syste-48e4c.appspot.com",
  messagingSenderId: "38757556725",
  appId: "1:38757556725:web:2fb85ea827da68381b80bc"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Listen to soil moisture
const moistureRef = ref(db, 'system/greenhouse/soilMoisture');
onValue(moistureRef, (snapshot) => {
  const val = snapshot.val();
  const moistureEl = document.getElementById("moistureVal");
  if (moistureEl) {
    moistureEl.textContent = (val !== null ? val : "--") + "%";
  }
});

// Listen to pump state
const pumpRef = ref(db, 'system/greenhouse/commands/pump');
onValue(pumpRef, (snapshot) => {
  const state = snapshot.val() ?? "OFF";
  const pumpEl = document.getElementById("pumpState");
  if (pumpEl) {
    pumpEl.textContent = state;
  }
});

// Controls
const btnOn = document.getElementById("btnOn");
if (btnOn) {
  btnOn.addEventListener("click", () => set(pumpRef, "ON"));
}

const btnOff = document.getElementById("btnOff");
if (btnOff) {
  btnOff.addEventListener("click", () => set(pumpRef, "OFF"));
}
