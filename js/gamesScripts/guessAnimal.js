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

function formatAnimalName(camelCaseName) {
    return camelCaseName
        .replace(/([A-Z])/g, ' $1') 
        .replace(/^./, str => str.toUpperCase()); 
}

const animals = {
    europeanMink: ["I am small and playful with soft brown fur.", "I have white spots around my nose and mouth.", "I love living near rivers and streams!"],
    sturgeonFish: ["I am an ancient fish with a long body and bumpy scales.", "I can live for more than 100 years!", "People use my eggs to make a special food called caviar."],
    madagascanBigHeadedTurtle: ["I am a big freshwater turtle with a huge head!", "My head is too big to tuck into my shell.", "I am one of the most endangered turtles in the world."],
    kihansiSprayToad: ["I am a tiny, golden-yellow toad.", "I live in the misty spray of a big waterfall.", " Instead of laying eggs, I give birth to live babies!"],
    leadbeatersPossum: [" I have soft grey fur and a fluffy tail.", "I am quick and love to climb trees.", "I wake up at night to find insects and tree sap to eat!"],
    orangeBelliedParrot: [" I have bright green feathers and a yellow chest.", "Look closely—you’ll see an orange spot on my belly!", " I’m one of the rarest parrots in the whole world!"],
    andeanBear: ["I have light-colored markings around my eyes that look like glasses!", "I’m the only bear that lives in South America.", " I mostly eat plants"],
    giantOtter: ["I have smooth fur and webbed feet for swimming.", "I live and play in the water with my family.", "I’m big and love hunting in the water."],
    blackFootedFerret: ["I have yellow fur and a black mask.", " I live in prairie dog tunnels and come out at night.", " I’m small and have black-tipped feet and tail."],
    karnerBlueButterfly: [" I have bright blue wings with black-and-white edges.", "Boys are blue, and girls have orange spots.", " I need wild lupine plants to survive."],
    irrawaddyDolphin: ["I have a round forehead and no sharp beak.", "I live in both rivers and the sea.", "I sometimes play with fishermen."],
    snowLeopard: [" I have thick grey fur with black spots.", "I live in cold, rocky mountains.", "I’m called the “ghost of the mountains” because I hide so well."],
    antarcticFurSeal: ["I have thick fur to stay warm in freezing waters.", "Males are bigger and protective.", "I love swimming and eat krill, fish, and squid."],
    southGeorgiaPipit: ["I’m a small brown bird.", " I live in a cold, snowy place.", "My beautiful song can be heard across the land."]
};

let score = 0;
let time = 30;
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
        img.src = `/assets/animalImgs/${animal}.jpeg`; 
        img.alt = animal;
        
        const button = document.createElement("button");
        button.textContent = formatAnimalName(animal);
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
        time = 30;
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

    
