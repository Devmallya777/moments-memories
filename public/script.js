// ========================================
// MOMENTS & MEMORIES SCRIPT
// ========================================

console.log("Website Loaded 💖");

// ========================================
// TOAST NOTIFICATION
// ========================================

function showToast(message, color="#b12675") {

    const toast = document.createElement("div");

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.right = "30px";
    toast.style.background = color;
    toast.style.color = "white";
    toast.style.padding = "15px 25px";
    toast.style.borderRadius = "50px";
    toast.style.fontWeight = "600";
    toast.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
    toast.style.zIndex = "99999";
    toast.style.opacity = "0";
    toast.style.transition = "0.4s";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "1";
    }, 100);

    setTimeout(() => {
        toast.style.opacity = "0";

        setTimeout(() => {
            toast.remove();
        }, 400);

    }, 2500);
}

// ========================================
// ADD TO CART
// ========================================

const cartButtons = document.querySelectorAll(".add-cart-btn");

cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const product = {
            name: button.dataset.name,
            price: button.dataset.price,
            image: button.dataset.image
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        showToast("Added To Cart 💖");

    });

});

// ========================================
// LOAD CART PAGE
// ========================================

const cartContainer = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");

if(cartContainer){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    if(cart.length === 0){

        cartContainer.innerHTML = `
        <p style="text-align:center;font-size:20px;">
        Your Cart Is Empty 💔
        </p>
        `;

    }

    else{

        cart.forEach((item,index) => {

            total += Number(item.price);

            cartContainer.innerHTML += `

            <div class="cart-card">

                <img src="${item.image}" alt="${item.name}">

                <div>

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

    if(cartTotal){

        cartTotal.innerText = `Total: ₹${total}`;

    }

}

// ========================================
// REMOVE CART ITEM
// ========================================

function removeCart(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);

    localStorage.setItem("cart", JSON.stringify(cart));

    showToast("Item Removed ❌","#d63384");

    location.reload();

}

// ========================================
// ORDER FORM SUBMIT
// ========================================

const orderForm = document.querySelector("#orderForm");

if(orderForm){

    orderForm.addEventListener("submit", async(e) => {

        e.preventDefault();

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const products = cart.map(item => item.name).join(", ");

        const totalPrice = cart.reduce((sum,item) => {
            return sum + Number(item.price);
        },0);

        const data = {

            product: products,
            price: `₹${totalPrice}`,

            name: document.querySelector("#name").value,

            email: document.querySelector("#email").value,

            phone: document.querySelector("#phone").value,

            address: document.querySelector("#address").value,

            message: document.querySelector("#message").value

        };

        try{

            const response = await fetch("/api/order",{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(data)

            });

            const result = await response.json();

            if(result.success){

                showToast("Order Confirmed 💖","#28a745");

                localStorage.removeItem("cart");

                setTimeout(() => {

                    window.location.href = "index.html";

                },2000);

            }

            else{

                showToast("Order Failed ❌","#dc3545");

            }

        }

        catch(error){

            console.log(error);

            showToast("Server Error ❌","#dc3545");

        }

    });

}

