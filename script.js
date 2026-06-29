import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5HhfVOsOMUCCNF7wNI4MlVrJD0BFtxMU",
  authDomain: "avtopazar-1d78e.firebaseapp.com",
  projectId: "avtopazar-1d78e",
  storageBucket: "avtopazar-1d78e.firebasestorage.app",
  messagingSenderId: "105094237903",
  appId: "1:105094237903:web:02287d90b7e3c0ebc431ba",
  measurementId: "G-32DGQ8TKTC"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Оваа функција ќе ја користиме со копчето на твојот сајт
window.zemiPodatoci = function() {
  const marka = document.getElementById("marka").value; // Претпоставувам имаш input со id="marka"
  
  set(ref(db, 'avtomobili/' + marka), {
    marka: marka,
    status: "testiran"
  }).then(() => {
    alert("Успешно додадено во базата!");
  });
};
