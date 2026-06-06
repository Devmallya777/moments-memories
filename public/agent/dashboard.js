const agent =
localStorage.getItem(
"agentName"
);

if(!agent){

window.location.href =
"login.html";

}

document.getElementById(
"agentName"
).innerHTML =
agent;

// Greeting

const hour =
new Date().getHours();

const greeting =
document.getElementById(
"greeting"
);

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

async function loadDashboard(){

try{

const res =
await fetch(
"/api/orders"
);

const orders =
await res.json();

const myOrders =
orders.filter(
o => o.assignedTo === agent
);

document.getElementById(
"assignedCount"
).innerHTML =
myOrders.length;

document.getElementById(
"deliveredCount"
).innerHTML =
myOrders.filter(
o => o.status === "Delivered"
).length;

let total = 0;

myOrders.forEach(order=>{

if(
order.status === "Delivered"
){

total +=
Number(order.total || 0);

}

});

document.getElementById(
"cashCollected"
).innerHTML =
"₹" + total;

}

catch(err){

console.log(err);

}

}

function logoutAgent(){

localStorage.removeItem(
"agentName"
);

window.location.href =
"login.html";

}

loadDashboard();
