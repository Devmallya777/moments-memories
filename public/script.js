// ===============================
// MOBILE MENU
// ===============================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}

// ===============================
// SMOOTH PAGE LOAD ANIMATION
// ===============================

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});

document.body.style.opacity = "0";
document.body.style.transition = "0.5s ease";

// ===============================
// TOAST NOTIFICATION SYSTEM
// ===============================

function showToast(message, color = "#ff4f93") {

    const toast = document.createElement("div");

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.right = "30px";
    toast.style.padding = "15px 25px";
    toast.style.background = color;
    toast.style.color = "white";
    toast.style.borderRadius = "15px";
    toast.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
    toast.style.zIndex = "9999";
    toast.style.fontWeight = "600";
    toast.style.fontSize = "15px";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    toast.style.transition = "0.4s";

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.style.opacity = "1";
        toast.style.transform = "translateY(0px)";

    }, 100);

    setTimeout(() => {

        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";

    }, 2500);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}

// ===============================
// CONTACT FORM
// ===============================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value;

        const button = contactForm.querySelector("button");

        button.innerText = "Sending...";
        button.disabled = true;

        setTimeout(() => {

            showToast(`Thank you ${name} ❤️ Message Sent`);

            contactForm.reset();

            button.innerText = "Send Message";
            button.disabled = false;

        }, 1500);

    });

}

// ===============================
// ADMIN LOGIN
// ===============================

function loginAdmin() {

    const pass = document.getElementById("adminPass").value;

    const loginBtn = document.querySelector(".admin-login-box .btn");

    loginBtn.innerText = "Checking...";

    setTimeout(() => {

        if (pass === "admin123") {

            showToast("Welcome Admin 🔥", "green");

            setTimeout(() => {

                window.location.href = "admin-dashboard.html";

            }, 1000);

        }

        else {

            showToast("Wrong Password ❌", "crimson");

            loginBtn.innerText = "Login";

        }

    }, 1200);

}

// ===============================
// CARD HOVER EFFECT
// ===============================

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px) scale(1)";

    });

});

// ===============================
// SCROLL ANIMATION
// ===============================

const revealElements = document.querySelectorAll(
    ".card, .about-box, .contact-box, .stats-card"
);

window.addEventListener("scroll", revealOnScroll);

function revealOnScroll() {

    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach((element) => {

        const boxTop = element.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {

            element.style.opacity = "1";
            element.style.transform = "translateY(0px)";

        }

    });

}

revealElements.forEach((element) => {

    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "0.7s";

});

// ===============================
// TYPING EFFECT FOR HERO
// ===============================

const heroTitle = document.querySelector(".hero-content h1");

if (heroTitle) {

    const text = heroTitle.innerText;

    heroTitle.innerText = "";

    let i = 0;

    function typingEffect() {

        if (i < text.length) {

            heroTitle.innerText += text.charAt(i);

            i++;

            setTimeout(typingEffect, 40);

        }

    }

    typingEffect();

}

// ===============================
// BUTTON RIPPLE EFFECT
// ===============================

const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {

    button.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const diameter = Math.max(
            this.clientWidth,
            this.clientHeight
        );

        const radius = diameter / 2;

        circle.style.width = circle.style.height =
            `${diameter}px`;

        circle.style.left =
            `${e.clientX - this.offsetLeft - radius}px`;

        circle.style.top =
            `${e.clientY - this.offsetTop - radius}px`;

        circle.classList.add("ripple");

        const ripple = this.getElementsByClassName("ripple")[0];

        if (ripple) {
            ripple.remove();
        }

        this.appendChild(circle);

    });

});