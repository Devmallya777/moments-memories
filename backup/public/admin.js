// ======================
// LOAD DASHBOARD STATS
// ======================

fetch("/api/stats")

.then(res => res.json())

.then(data => {

    document.getElementById("totalOrders").innerHTML =
    data.totalOrders;

    document.getElementById("pendingOrders").innerHTML =
    data.pendingOrders;

    document.getElementById("deliveredOrders").innerHTML =
    data.deliveredOrders;

    document.getElementById("totalCustomers").innerHTML =
    data.totalCustomers;

});

// ======================
// LOAD ORDERS
// ======================

const ordersContainer =
document.getElementById("ordersContainer");

fetch("/api/orders")

.then(res => res.json())

.then(data => {

    data.reverse();

    data.forEach(order => {

        ordersContainer.innerHTML += `

        <div class="message-card">

            <h3>${order.name}</h3>

            <p><strong>Product:</strong> ${order.product}</p>

            <p><strong>Price:</strong> ${order.price}</p>

            <p><strong>Email:</strong> ${order.email}</p>

            <p><strong>Phone:</strong> ${order.phone}</p>

            <p><strong>Address:</strong> ${order.address}</p>

            <p><strong>Message:</strong> ${order.message}</p>

            <p><strong>Status:</strong> ${order.status}</p>

            <p><strong>Date:</strong> ${order.date}</p>

        </div>

        `;

    });

});


