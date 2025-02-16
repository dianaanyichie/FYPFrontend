
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

  //Receive signals from Springboot
  const animalData = {
    "signal1": {
        "model": "/assets/3dModels/apple.glb",
        "name": "Red Fox",
        "continent": "North America",
        "info": "The red fox is a small, omnivorous mammal known for its adaptability.",
        "reason": "Habitat loss due to deforestation and urbanization."
    },
    "signal2": {
        "model": "/assets/3dModels/banana.glb",
        "name": "African Elephant",
        "continent": "Africa",
        "info": "The African elephant is the largest land mammal, known for its intelligence and social behavior.",
        "reason": "Poaching for ivory and habitat destruction."
    }
};

const modelViewer = document.getElementById("model-viewer");
const url = "http://192.168.1.7:8080/fyp";

async function fetchSignalAndUpdateDisplay() {
  try {
      const response = await fetch(url, { mode: "cors" });
      const signal = await response.text();

      if (animalData[signal]) {
          updateAnimalDisplay(signal);
      } else {
          console.log("No valid signal received");
      }
  } catch (error) {
      console.error("Error fetching signal:", error);
  }
}

function updateAnimalDisplay(signal) {
  const animalName = document.querySelector(".animal-info h2");
  const animalContinent = document.querySelector(".animal-info h3");
  const animalInfo = document.querySelector(".animal-info p");
  const endangeredReason = document.querySelector(".endangered-reason p");

  if (animalData[signal]) {
      modelViewer.setAttribute("src", animalData[signal].model);

      animalName.textContent = animalData[signal].name;
      animalContinent.textContent = `Found in: ${animalData[signal].continent}`;
      animalInfo.textContent = animalData[signal].info;
      endangeredReason.textContent = animalData[signal].reason;
  } else {
      console.error("Unknown signal received:", signal);
  }
}

setInterval(fetchSignalAndUpdateDisplay, 2000);



  
  
  
  
  
  
  
  

  

  
  