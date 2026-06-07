const AGENTS = [
"Eshna",
"Sumit",
"Souvik",
"Lisa"
];

async function loadAgents(){

try{

const res =
await fetch("/api/orders");

const orders =
await res.json();

let totalAssigned = 0;
let totalDelivered = 0;
let totalRevenue = 0;

const tbody =
document.getElementById(
"agentsTable"
);

tbody.innerHTML = "";

AGENTS.forEach(agent=>{

const assigned =
orders.filter(
o=>o.assignedTo===agent
).length;

const delivered =
orders.filter(
o=>
o.assignedTo===agent &&
o.status==="Delivered"
).length;

const revenue =
orders
.filter(
o=>
o.assignedTo===agent &&
o.status==="Delivered"
)
.reduce(
(sum,o)=>
sum + (o.total || 0),
0
);

totalAssigned += assigned;
totalDelivered += delivered;
totalRevenue += revenue;

tbody.innerHTML += `

<tr>

<td>${agent}</td>

<td>${assigned}</td>

<td>${delivered}</td>

<td>₹${revenue}</td>

<td>

<button
class="view-btn"
onclick="viewOrders('${agent}')">

View Orders

</button>

</td>

</tr>

`;

});

document.getElementById(
"assignedOrders"
).textContent =
totalAssigned;

document.getElementById(
"deliveredOrders"
).textContent =
totalDelivered;

document.getElementById(
"totalCollection"
).textContent =
"₹" + totalRevenue;

}
catch(err){

console.log(err);

}

}

async function viewOrders(agent){

const res =
await fetch("/api/orders");

const orders =
await res.json();

const agentOrders =
orders.filter(
o=>o.assignedTo===agent
);

let msg =
`Orders Assigned To ${agent}\n\n`;

agentOrders.forEach(o=>{

msg +=

`${o.customerName}
₹${o.total}
${o.status}

`;

});

alert(msg);

}

loadAgents();
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click",()=>{
  sidebar.classList.toggle("show");
});