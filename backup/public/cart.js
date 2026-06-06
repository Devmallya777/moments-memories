// =========================================
// MOMENTS & MEMORIES CART.JS
// =========================================

console.log("Cart Loaded 💖");

// =========================================
// GET CART
// =========================================

function getCart(){

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}

// =========================================
// SAVE CART
// =========================================

function saveCart(cart){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

// =========================================
// SHOW NOTIFICATION
// =========================================

function showNotification(text){

    const notification =
    document.createElement("div");

    notification.classList.add(
        "custom-notification"
    );

    notification.innerHTML = text;

    document.body.appendChild(notification);

    setTimeout(()=>{

        notification.classList.add(
            "show-notification"
        );

    },100);

    setTimeout(()=>{

        notification.classList.remove(
            "show-notification"
        );

        setTimeout(()=>{

            notification.remove();

        },300);

    },2500);

}

// =========================================
// DISPLAY CART ITEMS
// =========================================

const cartContainer =
document.getElementById("cartItems");

const totalBox =
document.querySelector(".cart-total");

function loadCart(){

    if(!cartContainer) return;

    let cart = getCart();

    cartContainer.innerHTML = "";

    let total = 0;

    // EMPTY CART

    if(cart.length === 0){

        cartContainer.innerHTML = `

        <div class="empty-cart">

            <h2>
                Your Cart Is Empty 💔
            </h2>

            <p>
                Add beautiful gifts first ✨
            </p>

        </div>

        `;

        if(totalBox){

            totalBox.innerHTML =
            "Total: ₹0";

        }

        return;

    }

    // CART ITEMS

    cart.forEach((item,index)=>{

        const itemTotal =
        item.price * item.quantity;

        total += itemTotal;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <img
            src="${item.image}"
            alt="${item.name}"
            >

            <div class="cart-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Price: ₹${item.price}
                </p>

                <p>
                    Quantity: ${item.quantity}
                </p>

                <p>
                    Total: ₹${itemTotal}
                </p>

                <button
                class="remove-btn"
                onclick="removeCart(${index})"
                >

                    Remove

                </button>

            </div>

        </div>

        `;

    });

    // UPDATE TOTAL

    if(totalBox){

        totalBox.innerHTML =
        `Total: ₹${total}`;

    }

}

// =========================================
// REMOVE ITEM
// =========================================

function removeCart(index){

    let cart = getCart();

    cart.splice(index,1);

    saveCart(cart);

    showNotification(
        "❌ Product Removed"
    );

    loadCart();

}

// =========================================
// LOAD CART ON PAGE LOAD
// =========================================

loadCart();