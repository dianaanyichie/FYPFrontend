// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZ5lwJwOTqA6ne9O4p1Ey47ZnYrXm-WyQ",
  authDomain: "littleguardiansdata.firebaseapp.com",
  projectId: "littleguardiansdata",
  storageBucket: "littleguardiansdata.firebasestorage.app",
  messagingSenderId: "409967816932",
  appId: "1:409967816932:web:abb5610b2a90cd6957fcf1",
  measurementId: "G-9G3SKPN7X1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const db = getFirestore();

const animals = [
    {
        name: "European Mink",
        imgSrc: "/assets/animalImgs/europeanMink.jpeg",
        description: "I am in danger because dirty water is ruining my home",
        correctOption: "Pollution",
        wrongOption: "Overhunting"
    },
    {
        name: "Sturgeon Fish",
        imgSrc: "/assets/animalImgs/sturgeonFish.jpeg",
        description: "I am in danger because too many of us are being caught",
        correctOption: "Overhunting",
        wrongOption: "Climate Change"
    },
    {
        name: "Madagascan Big-headed Turtle",
        imgSrc: "/assets/animalImgs/madagascanBigHeadedTurtle.jpeg",
        description: "I am in danger because too many of us are taken from the wild.",
        correctOption: "Overhunting",
        wrongOption: "Habitat Loss"
    },
    {
        name: "Kihansi Spray Toad",
        imgSrc: "/assets/animalImgs/kihansiSprayToad.jpeg",
        description: "I am in danger because my misty home has dried up.",
        correctOption: "Habitat Loss",
        wrongOption: "Pollution"
    },
    {
        name: "Leadbeater's Possum",
        imgSrc: "/assets/animalImgs/leadbeatersPossum.jpeg",
        description: "I am in danger because forest fires are destroying my fire",
        correctOption: "Climate Change",
        wrongOption: "Overhunting"
    },
    {
        name: "Orange-bellied Parrot",
        imgSrc: "/assets/animalImgs/orangeBelliedParrot.jpeg",
        description: "I am in danger because my home is being destroyed by people building and farming.",
        correctOption: "Habitat Loss",
        wrongOption: "Pollution"
    },
    {
        name: "Andean Bear",
        imgSrc: "/assets/animalImgs/andeanBear.jpeg",
        description: "I am in danger because forests are being cut down to make space for farms.",
        correctOption: "Habitat Loss",
        wrongOption: "Overhunting"
    },
    {
        name: "Giant Otter",
        imgSrc: "/assets/animalImgs/giantOtter.jpeg",
        description: "I am in danger because pollution from gold mining and farming is making my water dirty.",
        correctOption: "Pollution",
        wrongOption: "Climate Change"
    },
    {
        name: "Black-footed Ferret",
        imgSrc: "/assets/animalImgs/blackFootedFerret.jpeg",
        description: "I am in danger because farms have taken over the prairies where I live.",
        correctOption: "Habitat Loss",
        wrongOption: "Climate Change"
    },
    {
        name: "Karner Blue Butterfly",
        imgSrc: "/assets/animalImgs/karnerBlueButterfly.jpeg",
        description: "I am in danger because the plants I need are being destroyed by farming and building.",
        correctOption: "Habitat Loss",
        wrongOption: "Overhunting"
    },
    {
        name: "Irrawaddy Dolphin",
        imgSrc: "/assets/animalImgs/irrawaddyDolphin.jpeg",
        description: "I am in danger because dams and water projects are blocking my home.",
        correctOption: "Habitat Loss",
        wrongOption: "Pollution"
    },
    {
        name: "Snow Leopard",
        imgSrc: "/assets/animalImgs/snowLeopard.jpeg",
        description: "I am in danger because people hunt me for my fur",
        correctOption: "Overhunting",
        wrongOption: "Pollution"
    },
    {
        name: "Antarctic Fur Seal",
        imgSrc: "/assets/animalImgs/antarcticFurSeal.jpeg",
        description: "I am in danger because warmer waters make it harder for me to find food.",
        correctOption: "Climate Change",
        wrongOption: "Overhunting"
    },
    {
        name: "South Georgia Pipit",
        imgSrc: "/assets/animalImgs/southGeorgiaPipit.jpeg",
        description: "I am in danger because human activities disturb the places where I live.",
        correctOption: "Habitat Loss",
        wrongOption: "Climate Change"
    }
];

let score = 0;
let time = 10;
let timerInterval;
let currentAnimalIndex;

function loadNewAnimal() {
    currentAnimalIndex = Math.floor(Math.random() * animals.length);
    const animal = animals[currentAnimalIndex];

    document.getElementById("animal-name").textContent = animal.name;
    document.getElementById("animal-image").src = animal.imgSrc;
    document.getElementById("threat-description").textContent = animal.description;

    // Randomize option order
    if (Math.random() < 0.5) {
        document.getElementById("option1").textContent = animal.correctOption;
        document.getElementById("option2").textContent = animal.wrongOption;
    } else {
        document.getElementById("option1").textContent = animal.wrongOption;
        document.getElementById("option2").textContent = animal.correctOption;
    }
}

function checkAnswer(selectedOption) {
    const animal = animals[currentAnimalIndex];
    if (selectedOption === animal.correctOption) {
        alert("Correct!");
        score += 10; 
        document.getElementById("score").textContent = `Score: ${score}`;
    } else {
        alert("Wrong!");
    }
    loadNewAnimal(); // Load the next animal
}

function startTimer() {
    const timerElement = document.getElementById('timer');
    timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            timerElement.textContent = `Time: ${time}`;
        } else {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000); // Update every second
}

async function endGame() {
    // Stop further game interaction
    document.getElementById('option1').disabled = true;
    document.getElementById('option2').disabled = true;

    const popupContainer = document.getElementById('popup-container');
    const overlay = document.querySelector('.overlay');
    popupContainer.classList.remove('hidden');
    popupContainer.style.display = 'block';
    overlay.style.display = 'block';

    popupContainer.innerHTML = ''; // Clear existing content

    const message = document.createElement('p');
    message.textContent = `Game over! Your score: ${score}`;

    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again?';
    playAgainButton.onclick = () => {
        score = 0;
        time = 60;
        document.getElementById("score").textContent = `Score: ${score}`;
        document.getElementById('option1').disabled = false;
        document.getElementById('option2').disabled = false;
        loadNewAnimal();
        startTimer();
        popupContainer.classList.add('hidden');
        popupContainer.style.display = 'none';
        overlay.style.display = 'none';
    };

    const otherGamesButton = document.createElement('button');
    otherGamesButton.textContent = 'Play Other Games';
    otherGamesButton.onclick = () => {
        window.location.href = '../gamesPage.html';
    };

    popupContainer.appendChild(message);
    popupContainer.appendChild(playAgainButton);
    popupContainer.appendChild(otherGamesButton);

    await updateHighScore(score);
    await updateGamePlayCount();
}

async function updateHighScore(currentScore) {
    
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        console.error("No user is currently signed in.");
        return;
    }

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        const userData = userDoc.data();
        const highScore = userData.guessDangerHighScore || 0;

        if (!userData.hasOwnProperty('guessDangerHighScore')) {
            await setDoc(userRef, { guessDangerHighScore: currentScore }, { merge: true });
            console.log('High score field initialized and score saved:', currentScore);
        } else if (currentScore > highScore) {
            
            await setDoc(userRef, { guessDangerHighScore: currentScore }, { merge: true });
            console.log('New high score saved:', currentScore);
        }
    } else {
        console.error("No user data found!");
    }
}

async function updateGamePlayCount() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        console.error("No user is currently signed in.");
        return;
    }

    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        const userData = userDoc.data();
        const currentCount = userData.guessDangerCount || 0;

        const newCount = currentCount + 1;
        await setDoc(userRef, { guessDangerCount: newCount }, { merge: true });
        console.log('Game play count updated:', newCount);
    } else {
        console.error("No user data found!");
    }
}

window.addEventListener('load', () => {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("option1").addEventListener("click", () => checkAnswer(document.getElementById("option1").textContent));
    document.getElementById("option2").addEventListener("click", () => checkAnswer(document.getElementById("option2").textContent));

    loadNewAnimal(); 
    startTimer();
});

  