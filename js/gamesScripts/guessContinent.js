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

let score = 0;
let time = 30;
let timerInterval;
let currentAnimal;

//Active Homepage Tab
document.addEventListener("DOMContentLoaded", function () {
    
    const navLinks = document.querySelectorAll('.nav-links a');
    
    
    const currentPage = window.location.pathname;
    
    
    navLinks.forEach(link => {
      
      const linkPage = link.getAttribute('href');
      
      
      if (currentPage.includes(linkPage)) {
        link.classList.add('active');  
      } else {
        link.classList.remove('active');  
      }
    });
  });

  //Animations
  function handleScroll() {
    const elements = document.querySelectorAll('header, section');
    const windowHeight = window.innerHeight;

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight - 50) { 
        el.classList.add('show');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);

  handleScroll();

  //Popups for Causes
  document.addEventListener("DOMContentLoaded", () => {
    
    const causes = document.querySelectorAll(".cause");
  
    causes.forEach((cause) => {
      cause.addEventListener("click", () => {
        const popup = cause.querySelector(".popup");
  
        
        popup.classList.toggle("hidden");
      });
    });
  
    document.addEventListener("click", (event) => {
      causes.forEach((cause) => {
        const popup = cause.querySelector(".popup");
        if (!cause.contains(event.target)) {
          popup.classList.add("hidden");
        }
      });
    });
  });

  //Check login status on games page
  document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('games.html')) {
      if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'gamesPage.html';
      }
    }
  });

const animals = [
    {
        name: "European Mink",
        image: "/assets/animalImgs/europeanMink.jpeg",
        continent: "Europe"
    },
    {
        name: "Sturgeon Fish",
        image: "/assets/animalImgs/sturgeonFish.jpeg",
        continent: "Europe"
    },
    {
        name: "Madagascan Big-headed Turtle",
        image: "/assets/animalImgs/madagascanBigHeadedTurtle.jpeg",
        continent: "Africa"
    },
    {
        name: "Kihansi Spray Toad",
        image: "/assets/animalImgs/kihansiSprayToad.jpeg",
        continent: "Africa"
    },
    {
        name: "Leadbeater's Possum",
        image: "/assets/animalImgs/leadbeatersPossum.jpeg",
        continent: "Australia"
    },
    {
        name: "Orange-bellied Parrot",
        image: "/assets/animalImgs/orangeBelliedParrot.jpeg",
        continent: "Australia"
    },
    {
        name: "Andean Bear",
        image: "/assets/animalImgs/andeanBear.jpeg",
        continent: "South America"
    },
    {
        name: "Giant Otter",
        image: "/assets/animalImgs/giantOtter.jpeg",
        continent: "South America"
    },
    {
        name: "Black-footed Ferret",
        image: "/assets/animalImgs/blackFootedFerret.jpeg",
        continent: "North America"
    },
    {
        name: "Karner Blue Butterfly",
        image: "/assets/animalImgs/karnerBlueButterfly.jpeg",
        continent: "North America"
    },
    {
        name: "Irrawaddy Dolphin",
        image: "/assets/animalImgs/irrawaddyDolphin.jpeg",
        continent: "Asia"
    },
    {
        name: "Snow Leopard",
        image: "/assets/animalImgs/snowLeopard.jpeg",
        continent: "Asia"
    },
    {
        name: "Antarctic Fur Seal",
        image: "/assets/animalImgs/antarcticFurSeal.jpeg",
        continent: "Antarctica"
    },
    {
        name: "South Georgia Pipit",
        image: "/assets/animalImgs/southGeorgiaPipit.jpeg",
        continent: "Antarctica"
    }
];

function startGame() {
    score = 0;
    time = 30;
    document.getElementById("score").textContent = `Score: ${score}`;
    document.getElementById("timer").textContent = `Time: ${time}s`;
    startTimer();
    loadNewAnimal();
}

function startTimer() {
    timerInterval = setInterval(() => {
        time--;
        document.getElementById("timer").textContent = `Time: ${time}s`;
        if (time <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function loadNewAnimal() {
    currentAnimal = animals[Math.floor(Math.random() * animals.length)];
    document.getElementById("animal-image").src = currentAnimal.image;
}

const url = "http://192.168.1.7:8080/fyp"; 

async function fetchSignalAndUpdateDisplay() {
  try {
      const response = await fetch(url, { mode: "cors" });
      const signal = await response.text();

      if (signal) {
          console.log("Received continent signal:", signal);
          document.dispatchEvent(new CustomEvent("continentSignalReceived", { detail: signal }));
      } else {
          console.log("No valid signal received");
      }
  } catch (error) {
      console.error("Error fetching signal:", error);
  }
}

// Fetch signal every 2 seconds
setInterval(fetchSignalAndUpdateDisplay, 2000);

// Listen for continent signals and handle player choice
document.addEventListener("continentSignalReceived", (event) => {
    const receivedSignal = event.detail;
    handlePlayerChoice(receivedSignal);
});

function handlePlayerChoice(selectedContinent) {
    document.getElementById("chosen-continent").textContent = `You chose: ${selectedContinent}`;

    if (selectedContinent === currentAnimal.continent) {
        alert("Correct!");
        score += 10;
    } else {
        alert("Wrong answer!");
    }

    loadNewAnimal();
}

async function endGame() {

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
        const highScore = userData.guessContinentHighScore || 0;

        if (!userData.hasOwnProperty('guessContinentHighScore')) {
            await setDoc(userRef, { guessContinentHighScore: currentScore }, { merge: true });
            console.log('High score field initialized and score saved:', currentScore);
        } else if (currentScore > highScore) {
            
            await setDoc(userRef, { guessContinentHighScore: currentScore }, { merge: true });
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
        const currentCount = userData.guessContinentCount || 0;

        const newCount = currentCount + 1;
        await setDoc(userRef, { guessContinentCount: newCount }, { merge: true });
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
});