```javascript
// ORDER FORM

const orderForm = document.getElementById("orderForm");

if(orderForm){

orderForm.addEventListener("submit", async (e)=>{

e.preventDefault();

const product = document.getElementById("product").value;

const name = document.getElementById("name").value;

const email = document.getElementById("email").value;

const phone = document.getElementById("phone").value;

const address = document.getElementById("address").value;

const message = document.getElementById("message").value;

let price = "₹499";

if(product === "Premium Box"){
price = "₹799";
}

const status = document.getElementById("status");

status.innerHTML = "Sending Order...";

try{

const response = await fetch("/api/order",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

product,
price,
name,
email,
phone,
address,
message

})

});

const data = await response.json();

if(data.success){

status.innerHTML = "💖 Order Sent Successfully";

orderForm.reset();

}else{

status.innerHTML = "❌ Failed To Send Order";

}

}catch(error){

status.innerHTML = "❌ Server Error";

}

});

}
```
// ========================= script.js =========================

console.log("Moments & Memories Loaded 💖");