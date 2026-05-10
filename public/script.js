const menuToggle =
    document.querySelector(".menu-toggle");

const navLinks =
    document.querySelector(".nav-links");

/* MOBILE MENU */

if(menuToggle){

    menuToggle.addEventListener("click",()=>{

        navLinks.classList.toggle("active");

    });

}

/* TOAST */

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
    toast.style.borderRadius = "12px";
    toast.style.fontWeight = "600";
    toast.style.zIndex = "9999";
    toast.style.boxShadow =
        "0 10px 25px rgba(0,0,0,0.2)";

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.remove();

    },3000);

}

/* CONTACT FORM */

const contactForm =
    document.getElementById("contactForm");

if(contactForm){

    contactForm.addEventListener(
        "submit",
        async(e)=>{

        e.preventDefault();

        const button =
            contactForm.querySelector("button");

        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const message =
            document.getElementById("message").value;

        button.innerText = "Sending...";
        button.disabled = true;

        try{

            const controller =
                new AbortController();

            const timeout =
                setTimeout(()=>{

                    controller.abort();

                },10000);

            const res = await fetch(
                "/api/contact",
                {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    name,
                    email,
                    message

                }),

                signal:controller.signal

            });

            clearTimeout(timeout);

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
                    "Failed To Send ❌",
                    "crimson"
                );

            }

        }

        catch(err){

            console.log(err);

            showToast(
                "Server Not Responding ❌",
                "crimson"
            );

        }

        button.innerText = "Send Message";
        button.disabled = false;

    });

}