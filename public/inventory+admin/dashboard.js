// Protect the route - check if admin is logged in
if (localStorage.getItem('adminLoggedIn') !== 'true') {
  window.location.href = 'login.html';
}
// =====================
// CONFIG
// =====================
const API = ''; // Leave empty if same server, or set to 'https://your-render-url.onrender.com'

const TEAM = ['Eshna', 'Sumit', 'Souvik', 'Lisa'];
const LOW_STOCK_THRESHOLD = 10;

// =====================
// DATE
// =====================
function setDate() {
  const d = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('current-date').textContent = d.toLocaleDateString('en-IN', options);
}

// =====================
// FETCH STATS
// =====================
async function loadStats() {
  try {
    const res = await fetch(`${API}/api/stats`);
    const data = await res.json();

    document.getElementById('total-orders').textContent     = data.totalOrders     || 0;
    document.getElementById('pending-orders').textContent   = data.pendingOrders   || 0;
    document.getElementById('delivered-orders').textContent = data.deliveredOrders || 0;
    document.getElementById('total-customers').textContent  = data.totalCustomers  || 0;
  } catch (err) {
    console.error('Stats error:', err);
  }
}

// =====================
// FETCH RECENT ORDERS
// =====================
async function loadRecentOrders() {
  try {
    const res = await fetch(`${API}/api/orders?limit=8`);
    const orders = await res.json();
    const tbody = document.getElementById('recent-orders-body');

    if (!orders.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#aaa;padding:30px;">No orders yet</td></tr>`;
      return;
    }

    tbody.innerHTML = orders.map(o => `
      <tr>
        <td><strong>#${o._id.toString().slice(-5).toUpperCase()}</strong></td>
        <td>${o.customerName || '—'}</td>
        <td>₹${(o.total || 0).toLocaleString('en-IN')}</td>
        <td>${o.assignedTo || '—'}</td>
        <td><span class="badge ${getBadgeClass(o.status)}">${o.status || 'Pending'}</span></td>
        <td>${formatDate(o.createdAt)}</td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Orders error:', err);
  }
}

// =====================
// FETCH LOW STOCK
// =====================
async function loadLowStock() {
  try {
    const res = await fetch(`${API}/api/inventory`);
    const items = await res.json();

    const low = items.filter(i => i.stock <= LOW_STOCK_THRESHOLD);
    const container = document.getElementById('low-stock-list');
    const countEl = document.getElementById('low-stock-count');

    countEl.textContent = low.length;

    if (!low.length) {
      container.innerHTML = `<p style="color:#aaa;font-size:13px;">✅ All items well stocked</p>`;
      return;
    }

    container.innerHTML = low.map(i => `
      <div class="low-stock-item">
        <span class="low-stock-name">⚠️ ${i.itemName}</span>
        <span class="low-stock-qty">${i.stock} left</span>
      </div>
    `).join('');
  } catch (err) {
    console.error('Inventory error:', err);
  }
}

// =====================
// TEAM WIDGET
// =====================
async function loadTeam() {
  const container = document.getElementById('team-list');

  // Get assigned counts per member from orders
  let assignedCounts = {};
  TEAM.forEach(m => assignedCounts[m] = 0);

  try {
    const res = await fetch(`${API}/api/orders`);
    const orders = await res.json();
    orders.forEach(o => {
      if (o.assignedTo && assignedCounts.hasOwnProperty(o.assignedTo)) {
        assignedCounts[o.assignedTo]++;
      }
    });
  } catch (err) {
    // silently fail, show 0
  }

  container.innerHTML = TEAM.map(name => `
    <div class="team-item">
      <div class="team-avatar">${name[0]}</div>
      <div class="team-info">
        <p>${name}</p>
        <span>${assignedCounts[name]} order(s) assigned</span>
      </div>
    </div>
  `).join('');
}

// =====================
// HELPERS
// =====================
function getBadgeClass(status) {
  const map = {
    'Pending':            'badge-pending',
    'Assigned':           'badge-assigned',
    'Out For Delivery':   'badge-ofd',
    'Arrived':            'badge-arrived',
    'OTP Verified':       'badge-otp',
    'Payment Collected':  'badge-payment',
    'Delivered':          'badge-delivered',
    'Cancelled':          'badge-cancelled',
  };
  return map[status] || 'badge-pending';
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// =====================
// LOGOUT
// =====================
document.getElementById('logout-btn').addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('token');
  localStorage.removeItem('adminLoggedIn');
  sessionStorage.clear();
  window.location.href = 'login.html';
});

// =====================
// INIT
// =====================
setDate();
loadStats();
loadRecentOrders();
loadLowStock();
loadTeam();

// Auto-refresh every 60 seconds
setInterval(() => {
  loadStats();
  loadRecentOrders();
  loadLowStock();
  loadTeam();
}, 60000);

setInterval(() => {
    fetch("/api/heartbeat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: localStorage.getItem("agentName")
        })
    });
}, 5000);
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click",()=>{
  sidebar.classList.toggle("show");
});
document.addEventListener("click", (e) => {
  if (
    sidebar.classList.contains("show") &&
    !sidebar.contains(e.target) &&
    e.target !== menuBtn
  ) {
    sidebar.classList.remove("show");
  }
});
function toggleSidebar(){

const sidebar =
document.getElementById("sidebar");

sidebar.classList.toggle("show");

}