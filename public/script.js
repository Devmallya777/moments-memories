console.log("Moments & Memories Loaded 💖");

// =========================================
// LOADER
// =========================================

window.addEventListener("load",()=>{

    const loader =
    document.getElementById("loader");

    setTimeout(()=>{

        loader.style.opacity = "0";

        setTimeout(()=>{

            loader.style.display = "none";

        },1000);

    },1500);

});

// ====================================
// NOTIFICATION
// ====================================

function showNotification(message){

const notification = document.createElement("div");

notification.className = "custom-notification";

notification.innerHTML = message;

document.body.appendChild(notification);

setTimeout(() => {
notification.classList.add("show-notification");
},100);

setTimeout(() => {

notification.classList.remove("show-notification");

setTimeout(() => {
notification.remove();
},300);

},2500);

}

// ====================================
// ADD TO CART
// ====================================

function addToCart(name, price, image){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const existing = cart.find(item => item.name === name);

if(existing){

existing.quantity += 1;

}else{

cart.push({
name:name,
price:Number(price),
image:image,
quantity:1
});

}

localStorage.setItem("cart", JSON.stringify(cart));

showNotification("💖 Product Added To Cart");

}

// ====================================
// DISPLAY CART
// ====================================

const cartItems = document.getElementById("cartItems");

if(cartItems){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

if(cart.length === 0){

cartItems.innerHTML = `
<div class="empty-cart">
Your Cart Is Empty 💔
</div>
`;

}else{

cart.forEach((item,index)=>{

const itemTotal =
item.price * item.quantity;

total += itemTotal;

cartItems.innerHTML += `

<div class="cart-item">

<img src="${item.image}" alt="">

<div class="cart-info">

<h3>${item.name}</h3>

<p>Price: ₹${item.price}</p>

<p>Quantity: ${item.quantity}</p>

<p>Total: ₹${itemTotal}</p>

<button onclick="removeCart(${index})">
Remove
</button>

</div>

</div>

`;

});

const totalBox =
document.querySelector(".cart-total");

if(totalBox){

totalBox.innerHTML =
`Total: ₹${total}`;

}

}

}

// ====================================
// REMOVE CART
// ====================================

function removeCart(index){

let cart = JSON.parse(
localStorage.getItem("cart")
) || [];

cart.splice(index,1);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

location.reload();

}

// ====================================
// AUTO FILL ORDER PAGE
// ====================================

const productField =
document.getElementById("productField");

const priceField =
document.getElementById("priceField");

if(productField && priceField){

let cart = JSON.parse(
localStorage.getItem("cart")
) || [];

if(cart.length > 0){

let products = "";

let total = 0;

cart.forEach(item=>{

products +=
`${item.name} × ${item.quantity}\n`;

total += item.price * item.quantity;

});

productField.value = products;

priceField.value = `₹${total}`;

}

}

// ====================================
// ORDER FORM
// ====================================

const orderForm =
document.getElementById("orderForm");

if(orderForm){

orderForm.addEventListener(
"submit",
async function(e){

e.preventDefault();

const formData = {

product:
document.getElementById("productField").value,

price:
document.getElementById("priceField").value,

name:
document.getElementById("name").value,

phone:
document.getElementById("phone").value,

email:
document.getElementById("email").value,

address:
document.getElementById("address").value,

message:
document.getElementById("message").value,

paymentStatus:"Not Paid"

};

try{

const response = await fetch(
"/api/order",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(formData)

}
);

const data = await response.json();

if(data.success){

showNotification(
"💖 Order Confirmed Successfully"
);

localStorage.removeItem("cart");

setTimeout(() => {
window.location.href = "index.html";
},2000);

}else{

showNotification("❌ Order Failed");

}

}catch(error){

console.log(error);

showNotification("❌ Server Error");

}

});

}
app.use("/uploads", express.static("uploads"));