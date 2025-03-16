
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
    "africa": {
        "model": "/assets/3dModels/Africa/kihansiSprayToad.glb",
        "name": "Kihansi Spray Toad",
        "continent": "Africa",
        "info": "A tiny, golden-yellow toad that lives in the misty water spray of Kihansi Falls in Tanzania.",
        "reason": "A dam built at Kihansi Falls reduced the misty spray that these toads live in, making it hard for them to survive."
    },
    "antarctica": {
        "model": "/assets/3dModels/Antarctica/antarcticFurSeal.glb",
        "name": "Antarctic Fur Seal",
        "continent": "Antarctica",
        "info": "The Antarctic Fur Seal has thick fur to stay warm in cold waters. They swim well and mostly eat krill, fish, and squid.",
        "reason": "Warmer waters and melting ice makes it harder to find food like krill."
    },
    "asia": {
        "model": "/assets/3dModels/Asia/irrawaddyDolphin.glb",
        "name": "Irrawaddy Dolphin",
        "continent": "Asia",
        "info": "The Irrawaddy Dolphin is a shy dolphin with a round forehead and no sharp beak. It lives in rivers and the sea.",
        "reason": "Dams and other water projects make it hard for these dolphins to live in the rivers."
    },
    "australia": {
        "model": "/assets/3dModels/Australia/orangeBelliedParrot.glb",
        "name": "Orange-bellied Parrot",
        "continent": "Australia",
        "info": "A super colourful little bird. It’s one of the rarest parrots in the world!",
        "reason": "The places where it lives, like coastal marshes, have been damaged by farming, building, and other human activities."
    },
    "europe": {
        "model": "/assets/3dModels/Europe/europeanMink.glb",
        "name": "European Mink",
        "continent": "Europe",
        "info": "This is a small, playful animal with soft brown fur and cute white spots around its nose and mouth.",
        "reason": "Dirty water from farms and factories has made it hard for the European Mink to live in clean, safe rivers and streams."
    },
    "northAmerica": {
        "model": "/assets/3dModels/NorthAmerica/karnerBlueButterfly.glb",
        "name": "Karner Blue Butterfly",
        "continent": "North America",
        "info": "The Karner Blue Butterfly is small with bright blue wings and black-and-white edges. They live in wild lupine plants.",
        "reason": "People building homes, farming and natural fires have destroyed many lupine plants, which is where these butterflies live."
    },
    "southAmerica": {
        "model": "/assets/3dModels/SouthAmerica/andeanBear.glb",
        "name": "Andean Bear",
        "continent": "South America",
        "info": "The Andean Bear, or Spectacled Bear, has cream markings around its eyes like glasses! It mostly eats plants.",
        "reason": "People are cutting down forests and turning the land into farms, leaving the Andean Bear with less places to live."
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



  
  
  
  
  
  
  
  

  

  
  