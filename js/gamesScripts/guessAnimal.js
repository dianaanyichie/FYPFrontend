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

const animals = {
    lion: ["I am the king of the jungle.", "I have a mane.", "I roar loudly."],
    elephant: ["I have a long trunk.", "I am the largest land animal.", "I have big ears."],
    giraffe: ["I have a long neck.", "I eat leaves from tall trees.", "I am spotted."],
    tiger: ["I have stripes.", "I am a big cat.", "I am a solitary hunter."],
    panda: ["I love eating bamboo.", "I am black and white.", "I am native to China."]
};

let score = 0;
let time = 10;
let timerInterval;

function getRandomAnimals() {
    
    const animalKeys = Object.keys(animals);
    
    const shuffledKeys = animalKeys.sort(() => Math.random() - 0.5);
    
    return shuffledKeys.slice(0, 3);
}

function startGame() {
    const randomAnimals = getRandomAnimals();
    const correctAnimal = randomAnimals[Math.floor(Math.random() * randomAnimals.length)];
    
    document.getElementById("clue1").textContent = animals[correctAnimal][0];
    document.getElementById("clue2").textContent = animals[correctAnimal][1];
    document.getElementById("clue3").textContent = animals[correctAnimal][2];
    
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = ""; 
    
    randomAnimals.forEach(animal => {
        const choiceDiv = document.createElement("div");
        choiceDiv.className = "choice";
        choiceDiv.dataset.animal = animal;
        
        const img = document.createElement("img");
        img.src = `/assets/${animal}.png`; 
        img.alt = animal;
        
        const button = document.createElement("button");
        button.textContent = animal.charAt(0).toUpperCase() + animal.slice(1);
        button.onclick = () => checkAnswer(animal, correctAnimal);
        
        choiceDiv.appendChild(img);
        choiceDiv.appendChild(button);
        choicesContainer.appendChild(choiceDiv);
    });
}

function checkAnswer(selectedAnimal, correctAnimal) {
    if (selectedAnimal === correctAnimal) {
        alert("Correct!");
        score += 10;
        document.getElementById("score").textContent = `Score: ${score}`;
    } else {
        alert("Wrong! Try again.");
    }
    startGame(); 
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
    }, 1000); 
}

async function endGame() {

    const choices = document.getElementById('choices');
    choices.style.pointerEvents = 'none';

    const popupContainer = document.getElementById('popup-container');
    const overlay = document.querySelector('.overlay');
    popupContainer.classList.remove('hidden');
    popupContainer.style.display = 'block';
    overlay.style.display = 'block';

    popupContainer.innerHTML = ''; 

    const message = document.createElement('p');
    message.textContent = `Game over! Your score: ${score}`;

    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again?';
    playAgainButton.onclick = () => {
        score = 0;
        time = 60;
        document.getElementById("score").textContent = `Score: ${score}`;
        choices.style.pointerEvents = 'auto';
        startGame();
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
        const highScore = userData.guessAnimalHighScore || 0;

        if (!userData.hasOwnProperty('guessAnimalHighScore')) {
            await setDoc(userRef, { guessAnimalHighScore: currentScore }, { merge: true });
            console.log('High score field initialized and score saved:', currentScore);
        } else if (currentScore > highScore) {
            
            await setDoc(userRef, { guessAnimalHighScore: currentScore }, { merge: true });
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
        const currentCount = userData.guessAnimalCount || 0;

        const newCount = currentCount + 1;
        await setDoc(userRef, { guessAnimalCount: newCount }, { merge: true });
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
    startGame();
    startTimer();
});

    
