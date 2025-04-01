
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
    "africa": [
        {
            "model": "/assets/3dModels/Africa/kihansiSprayToad.glb",
            "name": "Kihansi Spray Toad",
            "continent": "Africa",
            "info": "A tiny, golden-yellow toad that lives in the misty water spray of Kihansi Falls in Tanzania.",
            "reason": "A dam built at Kihansi Falls reduced the misty spray that these toads live in, making it hard for them to survive."
        },
        {
            "model": "/assets/3dModels/Africa/madagascanBigHeadedTurtle.glb",
            "name": "Madagascan Big-headed Turtle",
            "continent": "Africa",
            "info": "A large freshwater turtle with a huge head that can't fit all the way into its shell",
            "reason": "These turtles are hunted a lot for food and to be sold as pets. Many are taken from the wild when they shouldn’t be."
        }
    ],
    "antarctica": [
        {
            "model": "/assets/3dModels/Antarctica/antarcticFurSeal.glb",
            "name": "Antarctic Fur Seal",
            "continent": "Antarctica",
            "info": "The Antarctic Fur Seal has thick fur to stay warm in cold waters. They swim well and mostly eat krill, fish, and squid.",
            "reason": "Warmer waters and melting ice make it harder to find food like krill."
        },
        {
            "model": "/assets/3dModels/Antarctica/southGeorgiaPipit.glb",
            "name": "South Georgia Pipit",
            "continent": "Antarctica",
            "info": "The South Georgia Pipit is a small, brown songbird. Its lovely song echoes across the snowy land.",
            "reason": "Human activities, like research stations and tourism, can disturb the places where they breed and find food."
        }
    ],
    "asia": [
        {
            "model": "/assets/3dModels/Asia/irrawaddyDolphin.glb",
            "name": "Irrawaddy Dolphin",
            "continent": "Asia",
            "info": "The Irrawaddy Dolphin is a shy dolphin with a round forehead and no sharp beak. It lives in rivers and the sea.",
            "reason": "Dams and other water projects make it hard for these dolphins to live in the rivers."
        },
        {
            "model": "/assets/3dModels/Asia/snowLeopard.glb",
            "name": "Snow Leopard",
            "continent": "Asia",
            "info": "The Snow Leopard is a large, quiet cat with thick, grey fur covered in black spots. It lives in cold and rocky mountains.",
            "reason": "These leopards are hunted for their beautiful fur and other parts, which are used in traditional medicine."
        }
    ],
    "australia": [
        {
            "model": "/assets/3dModels/Australia/orangeBelliedParrot.glb",
            "name": "Orange-bellied Parrot",
            "continent": "Australia",
            "info": "A super colourful little bird. It’s one of the rarest parrots in the world!",
            "reason": "The places where it lives, like coastal marshes, have been damaged by farming, building, and other human activities."
        },
        {
            "model": "/assets/3dModels/Australia/leadbeatersPossum.glb",
            "name": "Leadbeater's Possum",
            "continent": "Australia",
            "info": "This little possum has soft grey fur and a fluffy tail. It’s very quick and loves climbing trees at night.",
            "reason": "Big bushfires are happening more often and burning down the forests where these possums live, making it harder for them to survive."
        }
    ],
    "europe": [
        {
            "model": "/assets/3dModels/Europe/europeanMink.glb",
            "name": "European Mink",
            "continent": "Europe",
            "info": "This is a small, playful animal with soft brown fur and cute white spots around its nose and mouth.",
            "reason": "Dirty water from farms and factories has made it hard for the European Mink to live in clean, safe rivers and streams."
        },
        {
            "model": "/assets/3dModels/Europe/sturgeonFish.glb",
            "name": "Sturgeon Fish",
            "continent": "Europe",
            "info": "The Sturgeon is a really old fish with a long body and tough, bumpy scales. Some Sturgeon can live for more than 100 years!",
            "reason": "Too many Sturgeon have been caught for their eggs and meat, which has made it hard for them to survive."
        }
    ],
    "northAmerica": [
        {
            "model": "/assets/3dModels/NorthAmerica/karnerBlueButterfly.glb",
            "name": "Karner Blue Butterfly",
            "continent": "North America",
            "info": "The Karner Blue Butterfly is small with bright blue wings and black-and-white edges. They live in wild lupine plants.",
            "reason": "People building homes, farming and natural fires have destroyed many lupine plants, which is where these butterflies live."
        },
        {
            "model": "/assets/3dModels/NorthAmerica/blackFootedFerret.glb",
            "name": "Black-footed Ferret",
            "continent": "North America",
            "info": "The Black-footed Ferret is a small, skinny animal with yellow fur, a black mask, and black-tipped feet and tail.",
            "reason": "Farms have taken over the prairies where these ferrets live, making it harder for them to find a safe home."
        }
    ],
    "southAmerica": [
        {
            "model": "/assets/3dModels/SouthAmerica/andeanBear.glb",
            "name": "Andean Bear",
            "continent": "South America",
            "info": "The Andean Bear, or Spectacled Bear, has cream markings around its eyes like glasses! It mostly eats plants.",
            "reason": "People are cutting down forests and turning the land into farms, leaving the Andean Bear with less places to live."
        },
        {
            "model": "/assets/3dModels/SouthAmerica/giantOtter.glb",
            "name": "Giant Otter",
            "continent": "South America",
            "info": "The Giant Otter is a big, smooth-furred animal that loves swimming and playing. It has webbed feet and lives in families.",
            "reason": "Dirty water from gold mining and farming is harming the places where these otters live and find food."
        }
    ]
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
    const animals = animalData[signal]; 
    
    const selectedAnimal = animals[Math.floor(Math.random() * animals.length)];

    modelViewer.setAttribute("src", selectedAnimal.model);
    animalName.textContent = selectedAnimal.name;
    animalContinent.textContent = `Found in: ${selectedAnimal.continent}`;
    animalInfo.textContent = selectedAnimal.info;
    endangeredReason.textContent = selectedAnimal.reason;
  } else {
      console.error("Unknown signal received:", signal);
  }

}

setInterval(fetchSignalAndUpdateDisplay, 2000);



  
  
  
  
  
  
  
  

  

  
  