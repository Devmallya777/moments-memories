const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// -----------------------------
// TOAST SYSTEM (ADDED)
// -----------------------------
function showToast(message) {
    const toast = document.createElement("div");
    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#ff4f93";
    toast.style.color = "white";
    toast.style.padding = "12px 20px";
    toast.style.borderRadius = "20px";
    toast.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
    toast.style.zIndex = "9999";
    toast.style.fontSize = "14px";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transition = "0.3s";
    }, 2500);

    setTimeout(() => toast.remove(), 3000);
}

// -----------------------------
// MOBILE MENU FIX (SAFE)
// -----------------------------
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // auto close menu on click
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}

// -----------------------------
// CONTACT FORM FIX (UPGRADED)
// -----------------------------
const contactForm = document.getElementById("contactForm");

if (contactForm) {
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

            if (data.success) {
                showToast(`Thank you ${name} ❤️ Message sent!`);
                contactForm.reset();
            } else {
                showToast(data.message || "Failed to send message");
            }

        } catch (err) {
            showToast("Server not working ❌");
        }
    });
}

// -----------------------------
// ADMIN LOGIN FIX (IMPROVED)
// -----------------------------
async function loginAdmin() {
    const pass = document.getElementById("adminPass").value;

    try {
        const res = await fetch("/api/admin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: pass })
        });

        const data = await res.json();

        if (data.success) {
            showToast("Welcome Admin 🔥");

            setTimeout(() => {
                window.location.href = "admin-dashboard.html";
            }, 800);

        } else {
            showToast("Wrong password ❌");
        }

    } catch (err) {
        showToast("Server error ❌");
    }
}