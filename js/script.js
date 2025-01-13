const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

// Toggle navigation menu
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    // Prevent default for internal links only
    if (href.startsWith("#")) {
      e.preventDefault();

      // Scroll to the top
      if (href === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      // Scroll to a specific section
      if (href !== "#") {
        const sectionEl = document.querySelector(href);
        sectionEl.scrollIntoView({ behavior: "smooth" });
      }

      // Close mobile navigation
      if (link.classList.contains("main-nav-link")) {
        headerEl.classList.toggle("nav-open");
      }
    }
  });
});

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    //console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
   
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

document.addEventListener("DOMContentLoaded", function () {
  const getDonations = parseFloat(localStorage.getItem("totalDonations")) || 0;
    const goal = 10000; 
    const totalDonations = getDonations; 
    const progressPercentage = Math.min((totalDonations / goal) * 100, 100); 

    const progressWater = document.querySelector(".progress-water");
    const progressLabel = document.querySelector(".progress-label");

   
    progressWater.style.width = `${progressPercentage}%`;
    progressLabel.textContent = `$${totalDonations.toFixed(2)} Raised`;
});


document.addEventListener("DOMContentLoaded", function () {
const loginLink = document.getElementById("login-link");
const logoutButton = document.getElementById("logout-button");
const adminLinks = document.querySelectorAll(".admin-link");
const userGreeting = document.getElementById("greeting-text");


const isLoggedIn = localStorage.getItem("login") === "true";
const isAdmin = localStorage.getItem("isAdmin") === "true"; 
const loggedInUser = localStorage.getItem("loggedInUser");


function toggleAuthState(isLoggedIn) {
if (isLoggedIn) {
loginLink.style.display = "none";
logoutButton.style.display = "block"; 


if (isAdmin) {
  adminLinks.forEach((link) => (link.style.display = "block"));
} else {
  adminLinks.forEach((link) => (link.style.display = "none"));
}
} else {
loginLink.style.display = "block"; 
logoutButton.style.display = "none"; 
adminLinks.forEach((link) => (link.style.display = "none")); 
userGreeting.textContent = "";
}
}


toggleAuthState(isLoggedIn);

if (loggedInUser) {
const user = JSON.parse(loggedInUser);
userGreeting.textContent = `Hello, ${user.name}!`; 
userGreeting.style.display = "block"; 
}


logoutButton.addEventListener("click", function () {
localStorage.setItem("login", "false"); 
localStorage.setItem("isAdmin", "false"); 
localStorage.removeItem("loggedInUser"); 
toggleAuthState(false); 
});
});



