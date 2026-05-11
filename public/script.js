```js
console.log("Moments & Memories Loaded 💖");

// ======================
// NOTIFICATION
// ======================

function showNotification(text){

    const notification = document.createElement("div");

    notification.className = "notification";

    notification.innerHTML = text;

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.classList.add("show");

    },100);

    setTimeout(() => {

        notification.remove();

    },3000);

}

// ======================
// ADD TO CART
// ======================

const cartButtons = document.querySelectorAll(".add-cart-btn");

cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const product = {

            name: button.dataset.name,

            price: button.dataset.price

        };

        let cart = JSON.parse(
            localStorage.getItem("cart")
        ) || [];

        cart.push(product);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        showNotification("Added To Cart 🛒");

    });

});

// ======================
// ORDER FORM
// ======================

const orderForm = document.querySelector("form");

if(orderForm){

    orderForm.addEventListener("submit", async(e) => {

        e.preventDefault();

        const inputs = orderForm.querySelectorAll("input, textarea");

        const data = {

            product: "Gift Box",
            price: "Custom",

            name: inputs[0].value,

            phone: inputs[1].value,

            email: inputs[2].value,

            address: inputs[3].value,

            message: inputs[4].value

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

                showNotification("Order Confirmed 💖");

                orderForm.reset();

                localStorage.removeItem("cart");

            }

            else{

                showNotification("Order Failed ❌");

            }

        }

        catch(error){

            showNotification("Server Error ❌");

        }

    });

}
```
