// ===============================
// MOMENTS & MEMORIES MAIN SCRIPT
// ===============================

console.log("Moments & Memories Loaded Successfully ❤️");

// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ===============================
// SMOOTH SCROLL
// ===============================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// ===============================
// PRODUCT BUTTON ANIMATION
// ===============================

const buttons = document.querySelectorAll("button");

buttons.forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "scale(1.05)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
  });

  btn.addEventListener("click", () => {
    btn.innerHTML = "Added ❤️";

    setTimeout(() => {
      btn.innerHTML = "Order Now";
    }, 2000);
  });
});

// ===============================
// PRODUCT SEARCH
// ===============================

const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".card");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();

    productCards.forEach((card) => {
      const title = card.querySelector("h3").innerText.toLowerCase();

      if (title.includes(value)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// ===============================
// DARK MODE
// ===============================

const darkBtn = document.getElementById("darkModeBtn");

if (darkBtn) {
  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}

// Load Saved Theme

window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
});

// ===============================
// CONTACT FORM
// ===============================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    alert("Message Sent Successfully ❤️");

    contactForm.reset();
  });
}

// ===============================
// SCROLL ANIMATION
// ===============================

window.addEventListener("scroll", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < window.innerHeight - 100) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});

// Initial Hidden State

productCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = "0.6s";
});

// ===============================
// LIVE CLOCK
// ===============================

const clock = document.getElementById("clock");

function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString();

  if (clock) {
    clock.innerHTML = time;
  }
}

setInterval(updateClock, 1000);

// ===============================
// ADMIN DASHBOARD COUNTER
// ===============================

const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  counter.innerText = "0";

  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");

    const current = +counter.innerText;

    const increment = target / 100;

    if (current < target) {
      counter.innerText = `${Math.ceil(current + increment)}`;

      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});

// ===============================
// LOADER
// ===============================

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (loader) {
    loader.style.display = "none";
  }
});

// ===============================
// BACK TO TOP BUTTON
// ===============================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    if (topBtn) {
      topBtn.style.display = "block";
    }
  } else {
    if (topBtn) {
      topBtn.style.display = "none";
    }
  }
});

if (topBtn) {
  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ===============================
// PRODUCT API FETCH
// ===============================

async function loadProducts() {
  try {
    const response = await fetch("/api/products");

    const products = await response.json();

    console.log("Products Loaded:", products);
  } catch (error) {
    console.log("Error Loading Products");
  }
}

loadProducts();

// ===============================
// WELCOME MESSAGE
// ===============================

setTimeout(() => {
  console.log("Welcome to Moments & Memories ❤️");
}, 2000);