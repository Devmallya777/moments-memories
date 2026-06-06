const agent =
localStorage.getItem(
"agentName"
);

if(!agent){

window.location.href =
"login.html";

}

async function loadPayments(){

const res =
await fetch(
"/api/orders"
);

const orders =
await res.json();

const myOrders =
orders.filter(
o =>
o.assignedTo===agent &&
o.status==="Delivered"
);

let total = 0;

myOrders.forEach(o=>{

total += Number(
o.total || 0
);

});

document.getElementById(
"totalCash"
).innerHTML =
"₹" + total;

}

function logoutAgent(){

localStorage.removeItem(
"agentName"
);

window.location.href =
"login.html";

}

loadPayments();