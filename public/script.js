const menuToggle =
document.querySelector(".menu-toggle");

const navLinks =
document.querySelector(".nav-links");

if(menuToggle){

menuToggle.addEventListener("click",()=>{

navLinks.classList.toggle("active");

});

}

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
toast.style.zIndex = "9999";

document.body.appendChild(toast);

setTimeout(()=>{

toast.remove();

},3000);

}

/* CONTACT */

const contactForm =
document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const button =
contactForm.querySelector("button");

button.innerText = "Sending...";
button.disabled = true;

try{

const response =
await fetch("/api/contact",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:
document.getElementById("name").value,

email:
document.getElementById("email").value,

message:
document.getElementById("message").value

})

});

const data =
await response.json();

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

showToast(
"Server Not Responding ❌",
"crimson"
);

}

button.innerText = "Send Message";
button.disabled = false;

});

}

/* ADMIN */

async function loginAdmin(){

const password =
document.getElementById("adminPassword").value;

const res =
await fetch("/api/admin",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
password
})

});

const data =
await res.json();

if(data.success){

window.location.href =
"admin-dashboard.html";

}

else{

showToast(
"Wrong Password ❌",
"crimson"
);

}

}