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

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("User is logged in:", user);
        try {
            
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log("User data retrieved:", userData);
                const usernameElement = document.getElementById("username-display");
                const loginCountElement = document.getElementById("logins-count");

                const animalCount = document.getElementById("guess-animal-count");
                const dangerCount = document.getElementById("guess-danger-count");

                const animalScore = document.getElementById("guess-animal-score");
                const dangerScore = document.getElementById("guess-danger-score");
 
                if (usernameElement) {
                    usernameElement.textContent = userData.username;
                }

                if (loginCountElement) {
                  loginCountElement.textContent = userData.loginCount;
                }

                if (animalCount) {
                    animalCount.textContent = userData.guessAnimalCount;
                }

                if (dangerCount) {
                  dangerCount.textContent = userData.guessDangerCount;
                }

                if (animalScore) {
                    animalScore.textContent = userData.guessAnimalHighScore;
                }

                if (dangerScore) {
                  dangerScore.textContent = userData.guessDangerHighScore;
                }

            } else {
                console.error("No user data found!");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    } else {
        console.log("No user is logged in.");
    }
});
