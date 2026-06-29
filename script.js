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
const db = getDatabase(app);

// Функција за додавање оглас (ја поврзуваме со копчето Додади)
window.dodadiOglas = function() {
    const naslov = document.getElementById("naslov").value;
    const cena = document.getElementById("cena").value;
    const fileInput = document.getElementById("slikaFile");

    if (!naslov || !cena || fileInput.files.length === 0) {
        alert("Пополни ги сите полиња и избери слика!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        // Користиме push за базата сама да креира уникатни ID-а за секој оглас
        push(ref(db, 'oglasi'), {
            naslov: naslov,
            cena: cena,
            slika: e.target.result
        }).then(() => {
            alert("Успешно објавен оглас!");
            document.getElementById("naslov").value = "";
            document.getElementById("cena").value = "";
        });
    };
    reader.readAsDataURL(fileInput.files[0]);
};

// Функција за прикажување на огласите во реално време
onValue(ref(db, 'oglasi'), (snapshot) => {
    const container = document.getElementById('oglasi-lista');
    container.innerHTML = "";
    const data = snapshot.val();
    
    if (data) {
        Object.keys(data).forEach(key => {
            const o = data[key];
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
