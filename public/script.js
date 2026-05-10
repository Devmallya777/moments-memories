const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// MOBILE MENU FIX
if(menuToggle){
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// CONTACT FORM FIX
const contactForm = document.getElementById("contactForm");

if(contactForm){
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message })
            });

            const data = await res.json();

            if(data.success){
                alert("Message sent successfully ❤️");
                contactForm.reset();
            } else {
                alert("Failed to send message");
            }

        } catch (err) {
            alert("Server not working");
        }
    });
}

// ADMIN LOGIN FIX (IMPORTANT)
async function loginAdmin(){
    const pass = document.getElementById("adminPass").value;

    const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pass })
    });

    const data = await res.json();

    if(data.success){
        alert("Welcome Admin 🔥");

        // 🚀 THIS WAS MISSING (MAIN BUG FIX)
        window.location.href = "admin-dashboard.html";
    } else {
        alert("Wrong password");
    }
}