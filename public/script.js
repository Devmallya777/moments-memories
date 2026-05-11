// =========================================
// MOMENTS & MEMORIES - SCRIPT.JS
// =========================================

console.log("Moments & Memories Loaded 💖");

// =========================================
// NAVBAR SCROLL EFFECT
// =========================================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 30){

        navbar.style.background = "rgba(255,255,255,0.96)";
        navbar.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";

    }

    else{

        navbar.style.background = "rgba(255,255,255,0.90)";
        navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";

    }

});

// =========================================
// BUTTON RIPPLE EFFECT
// =========================================

const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {

    button.addEventListener("click", function(e){

        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        let ripple = document.createElement("span");

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

    });

});

// =========================================
// CARD HOVER ANIMATION
// =========================================

const cards = document.querySelectorAll(
    ".feature-card, .product-card, .gift-box, .card"
);

cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px) scale(1)";

    });

});

// =========================================
// FADE IN ON SCROLL
// =========================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.15
});

const hiddenElements = document.querySelectorAll(
    ".hero, .feature-card, .product-card, .cta-box, .card"
);

hiddenElements.forEach((el) => observer.observe(el));

// =========================================
// PRODUCT BUTTON GLOW EFFECT
// =========================================

const productButtons = document.querySelectorAll(
    ".product-info button"
);

productButtons.forEach((btn) => {

    btn.addEventListener("mouseenter", () => {

        btn.style.boxShadow =
        "0 10px 30px rgba(255,79,163,0.35)";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.boxShadow = "none";

    });

});

// =========================================
// IMAGE FLOAT EFFECT
// =========================================

const heroImage = document.querySelector(".hero-image img");

if(heroImage){

    window.addEventListener("mousemove", (e) => {

        let x = (window.innerWidth / 2 - e.pageX) / 40;
        let y = (window.innerHeight / 2 - e.pageY) / 40;

        heroImage.style.transform =
        `translate(${x}px, ${y}px)`;

    });

}

// =========================================
// SCROLL TO TOP BUTTON
// =========================================

const topBtn = document.createElement("button");

topBtn.innerHTML = "💖";

topBtn.classList.add("top-btn");

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){

        topBtn.style.opacity = "1";
        topBtn.style.pointerEvents = "auto";

    }

    else{

        topBtn.style.opacity = "0";
        topBtn.style.pointerEvents = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

// =========================================
// TYPEWRITER EFFECT
// =========================================

const heroTitle = document.querySelector(".hero-text h1");

if(heroTitle){

    const text = heroTitle.innerHTML;

    heroTitle.innerHTML = "";

    let i = 0;

    function typing(){

        if(i < text.length){

            heroTitle.innerHTML += text.charAt(i);

            i++;

            setTimeout(typing, 40);

        }

    }

    typing();

}

// =========================================
// MOBILE MENU ANIMATION
// =========================================

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {

    link.addEventListener("mouseenter", () => {

        link.style.transform = "translateY(-3px)";

    });

    link.addEventListener("mouseleave", () => {

        link.style.transform = "translateY(0px)";

    });

});

// =========================================
// LOADING ANIMATION
// =========================================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

// =========================================
// CONSOLE MESSAGE
// =========================================

console.log("Website animations loaded ✨");