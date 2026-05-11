// =========================================
// MOMENTS & MEMORIES SCRIPT
// =========================================

console.log("Moments & Memories Loaded 💖");

// =========================================
// SHOW NOTIFICATION
// =========================================

function showNotification(message){

const notification = document.createElement("div");

notification.classList.add("custom-notification");

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

// =========================================
// ADD TO CART
// =========================================

function addToCart(productName, productPrice, productImage){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({
    name: productName,
    price: productPrice,
    image: productImage
});

localStorage.setItem("cart", JSON.stringify(cart));

showNotification("💖 Product Added To Cart");


}

// =========================================
// DISPLAY CART
// =========================================

const cartContainer = document.getElementById("cartItems");

if(cartContainer){


let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

if(cart.length === 0){

    cartContainer.innerHTML = `
        <h2>Your Cart Is Empty 💔</h2>
    `;

}

else{

    cart.forEach((item,index)=>{

        total += Number(item.price);

        cartContainer.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" alt="">

            <div class="cart-info">

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

                <button onclick="removeCart(${index})">
                Remove
                </button>

            </div>

        </div>

        `;

    });

}

const totalBox = document.querySelector(".cart-total");

if(totalBox){

    totalBox.innerHTML = `Total: ₹${total}`;

}


}

// =========================================
// REMOVE CART ITEM
// =========================================

function removeCart(index){


let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.splice(index,1);

localStorage.setItem("cart", JSON.stringify(cart));

location.reload();


}

// =========================================
// AUTO FILL ORDER PAGE
// =========================================

const productField = document.getElementById("productField");

const priceField = document.getElementById("priceField");

if(productField && priceField){


let cart = JSON.parse(localStorage.getItem("cart")) || [];

if(cart.length > 0){

    let names = cart.map(item => item.name).join(", ");

    let total = 0;

    cart.forEach(item=>{
        total += Number(item.price);
    });

    productField.value = names;

    priceField.value = "₹" + total;

}


}

// =========================================
// ORDER FORM SUBMIT
// =========================================

const orderForm = document.getElementById("orderForm");

if(orderForm){


orderForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const formData = {

        product: document.getElementById("productField").value,

        price: document.getElementById("priceField").value,

        name: document.getElementById("name").value,

        phone: document.getElementById("phone").value,

        email: document.getElementById("email").value,

        address: document.getElementById("address").value,

        message: document.getElementById("message").value

    };

    try{

        const response = await fetch("/api/order",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(formData)

        });

        const data = await response.json();

        if(data.success){

            showNotification("💖 Order Confirmed Successfully");

            localStorage.removeItem("cart");

            orderForm.reset();

        }

        else{

            showNotification("❌ Order Failed");

        }

    }

    catch(error){

        console.log(error);

        showNotification("❌ Server Error");

    }

});

}
