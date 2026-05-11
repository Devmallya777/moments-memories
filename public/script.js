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
// PRODUCT AUTO SELECT

const productSelect =
document.getElementById("productSelect");

const productName =
document.getElementById("productName");

const productPrice =
document.getElementById("productPrice");

const priceInput =
document.getElementById("priceInput");



// URL PRODUCT AUTO SELECT

const params =
new URLSearchParams(window.location.search);

const selectedProduct =
params.get("product");

if(selectedProduct){

    productSelect.value = selectedProduct;

    updateProduct();

}



// UPDATE PRODUCT

function updateProduct(){

    const value =
    productSelect.value;

    const splitData =
    value.split("|");

    const name =
    splitData[0];

    const price =
    splitData[1];

    productName.innerText = name;

    productPrice.innerText = `₹${price}`;

    priceInput.value = `₹${price}`;

}

productSelect.addEventListener(
"change",
updateProduct
);

updateProduct();






// FORM SUBMIT

const orderForm =
document.getElementById("orderForm");

orderForm.addEventListener(
"submit",
async function(e){

e.preventDefault();

const data = {

product:
productName.innerText,

price:
priceInput.value,

name:
document.getElementById("name").value,

phone:
document.getElementById("phone").value,

email:
document.getElementById("email").value,

address:
document.getElementById("address").value,

message:
document.getElementById("message").value

};

try{

const response =
await fetch("/api/order",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

const result =
await response.json();

if(result.success){

document.getElementById(
"successMessage"
).innerText =
"Order Sent Successfully 💖";

orderForm.reset();

}else{

document.getElementById(
"successMessage"
).innerText =
"Failed To Send Order";

}

}catch(error){

document.getElementById(
"successMessage"
).innerText =
"Server Error";

}

});
const params =
new URLSearchParams(window.location.search);

const product =
params.get("product");

const price =
params.get("price");

const productSelect =
document.getElementById("productSelect");

const productName =
document.getElementById("productName");

const productPrice =
document.getElementById("productPrice");

const priceInput =
document.getElementById("priceInput");

if(product && price){

productName.innerText = product;

productPrice.innerText = `₹${price}`;

priceInput.value = `₹${price}`;

for(let i=0;i<productSelect.options.length;i++){

if(productSelect.options[i].text.includes(product)){

productSelect.selectedIndex = i;

}

}

}

productSelect.addEventListener(
"change",
function(){

const selected =
this.value.split("|");

productName.innerText =
selected[0];

productPrice.innerText =
`₹${selected[1]}`;

priceInput.value =
`₹${selected[1]}`;

}
);
// ================= ADD TO CART =================

function addToCart(
productName,
price,
image
){

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

cart.push({

name:productName,

price:price,

image:image

});

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

alert(productName + " Added To Cart 🛒");

}