const agentName =
localStorage.getItem(
"agentName"
);

if(!agentName){

window.location.href =
"login.html";

}


function loginAgent(){

const name =
document.getElementById(
"agentName"
).value;

if(!name){

alert(
"Enter Agent Name"
);

return;

}

localStorage.setItem(
"agentName",
name
);

window.location.href =
"agents.html";

}

function logoutAgent(){

localStorage.removeItem(
"agentName"
);

window.location.href =
"login.html";

}

const greeting =
document.getElementById(
"greeting"
);

if(greeting){

const hour =
new Date().getHours();

if(hour < 12){

greeting.innerHTML =
"Good Morning ☀️";

}

else if(hour < 18){

greeting.innerHTML =
"Good Afternoon 🌤️";

}

else{

greeting.innerHTML =
"Good Evening 🌙";

}

}