const agent =
localStorage.getItem("agentName");

if(!agent){

window.location.href =
"login.html";

}

async function loadOrders(){

try{

const res =
await fetch("/api/orders");

const orders =
await res.json();

const myOrders =
orders.filter(
o => o.assignedTo === agent
);

const container =
document.getElementById(
"ordersContainer"
);

if(myOrders.length === 0){

container.innerHTML =
"<h3>No Assigned Orders</h3>";

return;

}

container.innerHTML =
myOrders.map(order=>`

<div class="order-card">

<h3>👤 ${order.customerName}</h3>

<p>📞 ${order.phone || "-"}</p>

<p>📍 ${order.address || "-"}</p>

<p>🎁 ${order.products}</p>

<p>💰 ₹${order.total}</p>

<p>📦 Status: <strong>${order.status}</strong></p>

<div class="btn-group">

<button
class="call"
onclick="callCustomer('${order.phone}')">
📞 Call
</button>

<button
class="map"
onclick="openMap('${order.address}')">
🗺 Maps
</button>

<button
class="ofd"
onclick="updateStatus('${order._id}','Out For Delivery')">
🚚 OFD
</button>

<button
class="arrived"
onclick="updateStatus('${order._id}','Arrived')">
📍 Arrived
</button>

<button
class="cash"
onclick="updateStatus('${order._id}','Cash Collected')">
💰 Cash
</button>

<button
class="delivered"
onclick="updateStatus('${order._id}','Delivered')">
✅ Delivered
</button>

</div>

</div>

`).join("");

}
catch(err){

console.log(err);

}

}

function callCustomer(phone){

window.location.href =
`tel:${phone}`;

}

function openMap(address){

window.open(
`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
);

}

async function updateStatus(id,status){

try{

await fetch(`/api/order/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
status
})

});

loadOrders();

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

loadOrders();