import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
const db = getDatabase(app, "https://avtopazar-1d78e-default-rtdb.europe-west1.firebasedatabase.app");

// Функција за додавање оглас
window.dodadiOglas = function() {
    const naslov = document.getElementById("naslov").value;
    const cena = document.getElementById("cena").value;
    const fileInput = document.getElementById("slikaFile");

    if (!naslov || !cena || !fileInput.files[0]) return alert("Пополни сè!");

    const reader = new FileReader();
    reader.onload = function(e) {
        push(ref(db, 'oglasi'), {
            naslov: naslov,
            cena: cena,
            slika: e.target.result
        }).then(() => alert("Огласот е испратен!"));
    };
    reader.readAsDataURL(fileInput.files[0]);
};

// „Магичната“ функција што ги вчитува огласите автоматски
onValue(ref(db, 'oglasi'), (snapshot) => {
    const container = document.getElementById('oglasi-lista');
    container.innerHTML = ""; // Исчисти ја листата
    const data = snapshot.val();
    if (data) {
        Object.values(data).forEach(o => {
            container.innerHTML += `
                <div class="card">
                    <img src="${o.slika}">
                    <div class="text-box">
                        <h3>${o.naslov}</h3>
                        <p>Цена: ${o.cena} €</p>
                    </div>
                </div>`;
        });
    }
});
