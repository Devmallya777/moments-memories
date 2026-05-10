const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuToggle){
    menuToggle.addEventListener("click",()=>{

        navLinks.classList.toggle("active");

    });
}

/* CONTACT FORM */

const contactForm = document.getElementById("contactForm");

if(contactForm){

    contactForm.addEventListener("submit",async(e)=>{

        e.preventDefault();

        const name = document.getElementById("name").value;

        alert(`Thank you ${name} ❤️`);

        contactForm.reset();

    });

}