const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuToggle){
    menuToggle.addEventListener("click",()=>{
        navLinks.classList.toggle("active");
    });
}

// contact form
const form = document.getElementById("contactForm");

if(form){
    form.addEventListener("submit",e=>{
        e.preventDefault();
        alert("Thank you so much for shopping ❤️");
        form.reset();
    });
}

// admin login
function loginAdmin(){
    const pass = document.getElementById("adminPass").value;

    if(pass === "admin123"){
        alert("Welcome Admin 🔥");
    }else{
        alert("Wrong password");
    }
}