// Navbar Scroll Effect

window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");

    if(window.scrollY > 50){
        nav.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
    } else {
        nav.style.boxShadow = "none";
    }
});

// Fade Animation

const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {
    cards.forEach(card => {
        const top = card.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
});

// Contact Form

const form = document.querySelector("form");

if(form){
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Message Sent Successfully 💖");
        form.reset();
    });
}