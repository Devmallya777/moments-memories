const menuToggle =
    document.querySelector(".menu-toggle");

const navLinks =
    document.querySelector(".nav-links");

if(menuToggle){

    menuToggle.addEventListener("click",()=>{

        navLinks.classList.toggle("active");

    });

}

/* CONTACT FORM */

const contactForm =
    document.getElementById("contactForm");

function showToast(message,color="#ff4f93"){

    const toast =
        document.createElement("div");

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = color;
    toast.style.color = "white";
    toast.style.padding = "15px 25px";
    toast.style.borderRadius = "15px";
    toast.style.zIndex = "9999";

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.remove();

    },3000);

}

if(contactForm){

    contactForm.addEventListener("submit",async(e)=>{

        e.preventDefault();

        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const message =
            document.getElementById("message").value;

        const button =
            contactForm.querySelector("button");

        button.innerText = "Sending...";

        try{

            const res = await fetch("/api/contact",{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    name,
                    email,
                    message

                })

            });

            const data = await res.json();

            if(data.success){

                showToast(
                    "Message Sent ❤️",
                    "green"
                );

                contactForm.reset();

            }

            else{

                showToast(
                    "Failed ❌",
                    "crimson"
                );

            }

        }

        catch(err){

            showToast(
                "Server Error ❌",
                "crimson"
            );

        }

        button.innerText = "Send Message";

    });

}