
console.log("Moments & Memories Loaded 💖");

/* ====================================
   LOADING SCREEN
==================================== */

window.addEventListener("load", () => {

const loader =
document.getElementById("loader");

setTimeout(() => {

loader.classList.add("loader-hide");

},2200);

});

/* ====================================
   NOTIFICATION
==================================== */

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

/* ====================================
   ADD TO CART
==================================== */

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
