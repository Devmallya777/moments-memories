const agent = localStorage.getItem("agentName");

if (!agent) {
  window.location.href = "login.html";
}

async function loadOrders() {

  const res = await fetch("/api/orders");
  const orders = await res.json();

  const myOrders = orders.filter(o => o.assignedTo === agent);

  const table = document.getElementById("ordersTable");

  if (myOrders.length === 0) {
    table.innerHTML = `
      <tr>
        <td colspan="5">No Assigned Orders</td>
      </tr>
    `;
    return;
  }

  table.innerHTML = myOrders.map(order => `
    <tr>

      <td>${order.customerName}</td>
      <td>${order.products}</td>
      <td>₹${order.total}</td>
      <td>${order.status}</td>

      <td>
        ${
          order.status === "Delivered"
          ? `<span style="color:green;font-weight:600;">✔ Delivered</span>`
          : `
            <button onclick="outForDelivery('${order._id}')">🚚 OFD</button>
            <button onclick="arrived('${order._id}')">📍 Arrived</button>
            <button onclick="markDelivered('${order._id}')">✅ Delivered</button>
          `
        }
      </td>

    </tr>
  `).join("");
}

/* ---------------- OUT FOR DELIVERY ---------------- */
async function outForDelivery(id) {

  await fetch(`/api/order/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      status: "Out For Delivery"
    })
  });

  alert("Marked: Out For Delivery");
  loadOrders();
}

/* ---------------- ARRIVED (WHATSAPP ONLY) ---------------- */
async function arrived(id) {

  const phone = prompt("Customer Phone Number");

  const text = encodeURIComponent(
`🚚 Moments & Memories

Your order has arrived.

Please receive your parcel.

Thank You ❤️`
  );

  window.open(`https://wa.me/91${phone}?text=${text}`);
}

/* ---------------- MARK DELIVERED ---------------- */
async function markDelivered(id) {

  const payment = prompt("Payment Type? Cash / UPI");

  await fetch(`/api/order/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      status: "Delivered",
      paymentMethod: payment,
      paymentStatus: "Paid"
    })
  });

  alert("Order Delivered Successfully");
  loadOrders();
}

/* ---------------- LOGOUT ---------------- */
function logoutAgent() {
  localStorage.removeItem("agentName");
  window.location.href = "login.html";
}

loadOrders();