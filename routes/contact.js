const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const btn = document.querySelector(".contact-btn");

        btn.innerText = "Sending...";
        btn.disabled = true;

        const name = document.getElementById("name").value;

        const email = document.getElementById("email").value;

        const message = document.getElementById("message").value;

        try {

            const response = await fetch("/api/contact", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    message
                })
            });

            const data = await response.json();

            if (data.success) {

                alert("Message Sent Successfully ❤️");

                contactForm.reset();

            } else {

                alert("Failed To Send Message");
            }

        } catch (error) {

            alert("Server Error");

            console.log(error);
        }

        btn.innerText = "Send Message";
        btn.disabled = false;
    });
}