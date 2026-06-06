const agent =
localStorage.getItem("agentName");

if(!agent){
window.location.href="login.html";
}

async function loadOrders(){

const res =
await fetch("/api/orders");

const orders =
await res.json();

const myOrders =
orders.filter(
o => o.assignedTo === agent
);

const table =
document.getElementById(
"ordersTable"
);

if(myOrders.length===0){

table.innerHTML=`

<tr>
<td colspan="5">
No Assigned Orders
</td>
</tr>
`;

return;
}

table.innerHTML =
myOrders.map(order=>`

<tr>

<td>${order.customerName}</td>

<td>${order.products}</td>

<td>₹${order.total}</td>

<td>${order.status}</td>

<td>

<button onclick="outForDelivery('${order._id}')">
🚚 OFD
</button>

<button onclick="arrived('${order._id}')">
📍 Arrived
</button>

<button onclick="verifyOtp('${order._id}')">
🔐 OTP
</button>

<button onclick="markDelivered('${order._id}')">
✅ Delivered
</button>

</td>

</tr>

`).join("");

}

async function outForDelivery(id){

const otp =
Math.floor(
100000 + Math.random()*900000
);

await fetch(`/api/order/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

status:"Out For Delivery",
deliveryOtp:otp

})

});

alert(
"OTP Generated : " + otp
);

loadOrders();

}

async function arrived(id){

const phone =
prompt(
"Customer Phone Number"
);

const otp =
prompt(
"Enter Generated OTP"
);

const text =
encodeURIComponent(

`🚚 Moments & Memories

Your order has arrived.

🔐 OTP : ${otp}

Please share this OTP only after receiving your parcel.

Thank You ❤️`

);

window.open(
`https://wa.me/91${phone}?text=${text}`
);

}

async function verifyOtp(id){

const enteredOtp =
prompt(
"Enter Customer OTP"
);

const orders =
await fetch("/api/orders");

const data =
await orders.json();

const order =
data.find(
o => o._id === id
);

if(
enteredOtp === order.deliveryOtp
){

alert(
"OTP Verified Successfully"
);

await fetch(`/api/order/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

status:"OTP Verified"

})

});

}

else{

alert(
"Wrong OTP"
);

}

loadOrders();

}

async function markDelivered(id){

const payment =
prompt(
"Payment Type?\nCash / UPI"
);

await fetch(`/api/order/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

status:"Delivered",

paymentMethod:payment,

paymentStatus:"Paid"

})

});

alert(
"Order Delivered Successfully"
);

loadOrders();

}

function logoutAgent(){

localStorage.removeItem(
"agentName"
);

window.location.href =
"login.html";

}

loadOrders();
