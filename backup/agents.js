const API = "";

async function loadOrders(){

const res =
await fetch("/api/orders");

const orders =
await res.json();

const tbody =
document.getElementById("ordersTable");

tbody.innerHTML = "";

orders.forEach(order=>{

tbody.innerHTML += `

<tr>

<td>${order.customerName}</td>

<td>₹${order.total}</td>

<td>${order.status}</td>

<td>

<button
class="ofd"
onclick="outForDelivery('${order._id}')">
🚚 OFD </button>

</td>

</tr>

`;

});

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

const phone =
prompt(
"Customer Phone Number"
);

const text =
encodeURIComponent(

`🚚 Moments & Memories

Your order is out for delivery.

🔐 OTP: ${otp}

Please share OTP only after receiving your package.

Thank You ❤️`

);

window.open(
`https://wa.me/91${phone}?text=${text}`
);

loadOrders();

}

loadOrders();
