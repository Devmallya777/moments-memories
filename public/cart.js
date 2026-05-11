// ======================
// LOAD CART
// ======================

const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

const cartTotal = document.querySelector(".cart-total");

function updateCart() {

    let total = 0;

    cartItems.forEach(item => {

        total += Number(item.price);

    });

    cartTotal.innerHTML = `Total: ₹${total}`;

}

updateCart();

// ======================
// SHOW NOTIFICATION
// ======================

function showNotification(text) {

    const notification = document.createElement("div");

    notification.classList.add("notification");

    notification.innerHTML = text;

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.classList.add("show");

    }, 100);

    setTimeout(() => {

        notification.remove();

    }, 3000);

}
