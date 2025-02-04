
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
  const modelViewer = document.getElementById('model-viewer');
  const url = "http://172.21.2.53:8080/fyp";

  async function fetchSignalAndUpdateModel() {
    try {
        const response = await fetch(url, {mode: 'cors'});
        const signal = await response.text();

        if (signal === "signal1") {
            modelViewer.src = "/assets/3dModels/apple.glb";
        } else if (signal === "signal2") {
            modelViewer.src = "/assets/3dModels/banana.glb";
        } else {
            console.log("No valid signal received");
        }
    } catch (error) {
        console.error("Error fetching signal:", error);
    }
}

setInterval(fetchSignalAndUpdateModel, 2000);

  
  
  
  
  
  
  
  

  

  
  