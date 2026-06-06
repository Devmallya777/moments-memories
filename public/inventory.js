const API =
"/api/inventory";

async function loadInventory(){

const response =
await fetch(API);

const items =
await response.json();

let totalValue = 0;
let lowStock = 0;
let outStock = 0;

const table =
document.getElementById(
"inventoryTable"
);

table.innerHTML = "";

items.forEach(item=>{

if(item.stock <= item.lowStockAlert)
lowStock++;

if(item.stock === 0)
outStock++;

totalValue +=
item.stock * item.unitCost;

table.innerHTML += `

<tr>

<td>${item.itemName}</td>

<td>${item.stock}</td>

<td>₹${item.unitCost}</td>

<td>
${new Date(item.updatedAt)
.toLocaleDateString()}
</td>

<td>

<button
class="delete-btn"
onclick="deleteItem('${item._id}')">

Delete

</button>

</td>

</tr>

`;

});

document.getElementById(
"totalItems"
).innerHTML =
items.length;

document.getElementById(
"lowStock"
).innerHTML =
lowStock;

document.getElementById(
"outStock"
).innerHTML =
outStock;

document.getElementById(
"totalValue"
).innerHTML =
"₹" + totalValue;

}

async function addItem(){

const itemName =
document.getElementById(
"itemName"
).value;

const stock =
document.getElementById(
"stock"
).value;

const cost =
document.getElementById(
"cost"
).value;

await fetch(API,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
itemName,
stock,
unitCost:cost
})

});

loadInventory();

}

async function deleteItem(id){

await fetch(API + "/" + id,{
method:"DELETE"
});

loadInventory();

}

loadInventory();