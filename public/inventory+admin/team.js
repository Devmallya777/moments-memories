const API = "/api";

// 🔥 ONLINE MEMBERS
async function loadOnline() {
  const res = await fetch(`${API}/online-users`);
  const users = await res.json();

  const list = document.getElementById("onlineList");

  list.innerHTML = users.length
    ? users.map(u => `<li>🟢 ${u}</li>`).join("")
    : `<li>No one online</li>`;
}

// 📜 ACTIVITY LOG
async function loadLogs() {
  const res = await fetch(`${API}/activity-log`);
  const logs = await res.json();

  const list = document.getElementById("activityLog");

  list.innerHTML = logs.length
    ? logs.map(l => `
        <li>
          👤 ${l.user} - ${l.action}
          <br><small>${l.time}</small>
        </li>
      `).join("")
    : `<li>No activity yet</li>`;
}

// 🔄 AUTO REFRESH
function init() {
  loadOnline();
  loadLogs();

  setInterval(loadOnline, 5000);
  setInterval(loadLogs, 5000);
}

init();