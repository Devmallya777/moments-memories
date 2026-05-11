
// =========================================
// MOMENTS & MEMORIES SCRIPT
// FULL FIXED SCRIPT.JS
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

    const existingProduct = cart.find(
        item => item.name === productName
    );

    if(existingProduct){

        existingProduct.quantity += 1;

    }

    else{

        cart.push({
            name: productName,
            price: Number(productPrice),
            image: productImage,
            quantity:1
        });

    }

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
            <h2 style="text-align:center;">
                Your Cart Is Empty 💔
            </h2>
        `;

    }

    else{

        cart.forEach((item,index)=>{

            const itemTotal = item.price * item.quantity;

            total += itemTotal;

            cartContainer.innerHTML += `

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

        const totalBox = document.querySelector(".cart-total");

        if(totalBox){

            totalBox.innerHTML = `Total: ₹${total}`;

        }

    }

}

// =========================================
// REMOVE CART ITEM
// =========================================

function removeCart(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);

    localStorage.setItem("cart", JSON.stringify(cart));

    showNotification("❌ Product Removed");

    setTimeout(() => {

        location.reload();

    },700);

}

// =========================================
// AUTO FILL ORDER PAGE
// =========================================

const productField = document.getElementById("productField");

const priceField = document.getElementById("priceField");

if(productField && priceField){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length > 0){

        let productText = "";

        let total = 0;

        cart.forEach(item=>{

            productText += `${item.name} × ${item.quantity}\n`;

            total += item.price * item.quantity;

        });

        productField.value = productText;

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

                setTimeout(()=>{

                    window.location.href = "index.html";

                },2000);

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

// =========================================
// NAVBAR SCROLL EFFECT
// =========================================

const navbar = document.querySelector(".navbar");

if(navbar){

    window.addEventListener("scroll", () => {

        if(window.scrollY > 30){

            navbar.style.background = "rgba(255,255,255,0.96)";
            navbar.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";

        }

        else{

            navbar.style.background = "rgba(255,255,255,0.90)";
            navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";

        }

    });

}

// =========================================
// BUTTON EFFECT
// =========================================

const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "scale(1.05)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "scale(1)";

    });

});

// =========================================
// CARD HOVER
// =========================================

const cards = document.querySelectorAll(
    ".feature-card, .product-card, .gift-box, .card"
);

cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});

// =========================================
// SCROLL TO TOP BUTTON
// =========================================

const topBtn = document.createElement("button");

topBtn.innerHTML = "💖";

topBtn.classList.add("top-btn");

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){

        topBtn.style.opacity = "1";
        topBtn.style.pointerEvents = "auto";

    }

    else{

        topBtn.style.opacity = "0";
        topBtn.style.pointerEvents = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

// =========================================
// LOADING COMPLETE
// =========================================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

console.log("Website Fully Loaded ✨");
