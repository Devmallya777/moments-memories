const API = "/api/inventory";

let allItems = [];

/* ---------------- LOAD DATA ---------------- */
async function loadInventory() {
  try {
    const res = await fetch(API);
    allItems = await res.json();

    renderTable();

  } catch (err) {
    console.log(err);
  }
}

/* ---------------- RENDER TABLE ---------------- */
function renderTable() {

  const search =
    document.getElementById("searchInput")?.value.toLowerCase() || "";

  const table = document.getElementById("inventoryTable");

  let totalValue = 0;
  let lowStock = 0;
  let outStock = 0;

  table.innerHTML = "";

  const filtered = allItems.filter(item =>
    item.itemName.toLowerCase().includes(search)
  );

  filtered.forEach(item => {

    const stock = Number(item.stock);
    const cost = Number(item.unitCost);

    if (stock <= 5) lowStock++;
    if (stock === 0) outStock++;

    totalValue += Number(stock) * Number(cost);

    table.innerHTML += `
      <tr>
        <td>${item.itemName}</td>
        <td>${stock}</td>
        <td>₹${cost}</td>
        <td>${new Date(item.updatedAt).toLocaleDateString()}</td>

        <td class="action-cell">

  <button class="action-btn edit-btn"
    onclick="editItem('${item._id}', '${item.itemName}', ${stock}, ${cost})">
    Edit
  </button>

  <button class="action-btn delete-btn"
    onclick="deleteItem('${item._id}')">
    Delete
  </button>

</td>
      </tr>
    `;
  });

  document.getElementById("totalItems").innerText = allItems.length;
  document.getElementById("lowStock").innerText = lowStock;
  document.getElementById("outStock").innerText = outStock;
  document.getElementById("totalValue").innerText = "₹" + totalValue;
}

/* ---------------- ADD ITEM ---------------- */
async function addItem() {

  const itemName = document.getElementById("itemName").value;
  const stock = document.getElementById("stock").value;
  const cost = document.getElementById("cost").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      itemName,
      stock: Number(stock),
      unitCost: Number(cost)
    })
  });

  loadInventory();
}

/* ---------------- DELETE ITEM ---------------- */
async function deleteItem(id) {

  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  loadInventory();
}

/* ---------------- EDIT ITEM ---------------- */
async function editItem(id, name, stock, cost) {

  const newName = prompt("Item Name", name);
  const newStock = prompt("Stock", stock);
  const newCost = prompt("Unit Cost", cost);

  if (!newName) return;

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      itemName: newName,
      stock: Number(newStock),
      unitCost: Number(newCost)
    })
  });

  loadInventory();
}

/* ---------------- INIT ---------------- */
loadInventory();

/* ---------------- LIVE SEARCH UPDATE ---------------- */
document.addEventListener("keyup", (e) => {
  if (e.target.id === "searchInput") {
    renderTable();
  }
});
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click",()=>{
  sidebar.classList.toggle("show");
});