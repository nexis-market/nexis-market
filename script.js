import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Твојата конфигурација од Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Функција за вчитување на огласите
async function fetchOglasi() {
    const container = document.getElementById('oglasi-lista');
    
    try {
        const querySnapshot = await getDocs(collection(db, "oglasi"));
        container.innerHTML = ""; // Исчисти пред вчитување

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // HTML шаблонот одговара на дизајнот
            container.innerHTML += `
                <div class="oglas-card">
                    <div class="slika"></div>
                    <p>${data.naslov}</p>
                    <div class="cena">ЦЕНА: ${data.cena}</div>
                    <button class="omileni-btn" onclick="dodajVoOmileni('${doc.id}')">ДОДАЈ ВО ОМИЛЕНИ</button>
                </div>
            `;
        });
    } catch (e) {
        console.error("Грешка при вчитување: ", e);
    }
}

// Функција за омилени
window.dodajVoOmileni = (id) => {
    let omileni = JSON.parse(localStorage.getItem('omileni')) || [];
    if (!omileni.includes(id)) {
        omileni.push(id);
        localStorage.setItem('omileni', JSON.stringify(omileni));
        alert("Огласот е зачуван!");
    }
};

// Иницијализација
fetchOglasi();
