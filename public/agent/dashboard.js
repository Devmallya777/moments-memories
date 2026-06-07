const agent = localStorage.getItem("agentName");

if (!agent) {
  window.location.href = "login.html";
}

const nameEl = document.getElementById("agentName");
if (nameEl) nameEl.innerHTML = agent;

// Greeting
const hour = new Date().getHours();
const greeting = document.getElementById("greeting");

if (greeting) {
  if (hour < 12) {
    greeting.innerHTML = "Good Morning ☀️";
  } else if (hour < 18) {
    greeting.innerHTML = "Good Afternoon 🌤️";
  } else {
    greeting.innerHTML = "Good Evening 🌙";
  }
}

async function loadDashboard() {

  try {

    const res = await fetch("/api/orders");
    const orders = await res.json();

    const myOrders = orders.filter(o =>
      (o.assignedTo || "").trim().toLowerCase() === agent.trim().toLowerCase()
    );

    const assignedEl = document.getElementById("assignedCount");
    const deliveredEl = document.getElementById("deliveredCount");
    const cashEl = document.getElementById("cashCollected");

    // Assigned Orders
    if (assignedEl)
      assignedEl.innerHTML = myOrders.length;

    // Delivered Orders
    const delivered = myOrders.filter(o =>
      (o.status || "").toLowerCase() === "delivered"
    );

    if (deliveredEl)
      deliveredEl.innerHTML = delivered.length;

    // Cash Collected
    let total = 0;

    delivered.forEach(order => {
      total += Number(order.total ?? 0);
    });

    if (cashEl)
      cashEl.innerHTML = "₹" + total;

  }

  catch (err) {
    console.log(err);
  }
}

// INIT
loadDashboard();
setInterval(loadDashboard, 5000);

// logout
function logoutAgent() {
  localStorage.removeItem("agentName");
  window.location.href = "login.html";
}