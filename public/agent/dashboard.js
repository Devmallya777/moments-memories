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

// ✅ TODAY CHECK FUNCTION
function isToday(dateString) {
  const d = new Date(dateString);
  return d.toDateString() === new Date().toDateString();
}

async function loadDashboard() {

  try {

    const res = await fetch("/api/orders");
    const orders = await res.json();

    const myOrders = orders.filter(o =>
  (o.assignedTo || "").trim().toLowerCase() === agent.trim().toLowerCase()
);

    // TODAY ORDERS ONLY
    const todayOrders = myOrders.filter(o => isToday(o.createdAt));

    const assignedEl = document.getElementById("assignedCount");
    const deliveredEl = document.getElementById("deliveredCount");
    const cashEl = document.getElementById("cashCollected");

    if (assignedEl)
      assignedEl.innerHTML = myOrders.length;

    if (deliveredEl)
      deliveredEl.innerHTML = myOrders.filter(o => (o.status || "").toLowerCase() === "delivered").length;

    // ✅ ONLY TODAY DELIVERED CASH
    let total = 0;

myOrders.forEach(order => {
  if ((order.status || "").toLowerCase() === "delivered") {
    total += Number(order.total ?? 0);
  }
});

    if (cashEl)
      cashEl.innerHTML = "₹" + total;

  }

  catch (err) {
    console.log(err);
  }
}

// OPTIONAL: auto refresh every 5 sec
loadDashboard();
setInterval(loadDashboard, 5000);

// logout
function logoutAgent() {
  localStorage.removeItem("agentName");
  window.location.href = "login.html";
}