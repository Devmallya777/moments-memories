const API = "";

const AGENTS = [
"Eshna",
"Sumit",
"Souvik",
"Lisa"
];

async function loadOrders(){

try{

const res =
await fetch(`${API}/api/orders`);

const orders =
await res.json();

const table =
document.getElementById(
"ordersTable"
);

if(!orders.length){

table.innerHTML = `

<tr>
<td colspan="6">
No Orders Found
</td>
</tr>
`;

return;

}

table.innerHTML =
orders.map(order => `

<tr>

<td>
${order.customerName}
</td>

<td>
${order.products}
</td>

<td>
₹${order.total}
</td>

<td>

<span>${order.status}</span>

</td>

<td>

<select id="agent-${order._id}" onchange="assignOrder('${order._id}')">

<option value="">Select Agent</option>

${AGENTS.map(agent => `
  <option value="${agent}" ${order.assignedTo === agent ? "selected" : ""}>
    ${agent}
  </option>
`).join("")}

</select>

</td>

<button
onclick="assignOrder(
'${order._id}'
)">
Assign </button>

</td>

</tr>

`).join("");

}

catch(err){

console.log(err);

}

}

async function updateStatus(
id,
status
){

await fetch(
`${API}/api/order/${id}`,
{
method:"PUT",
headers:{
"Content-Type":
"application/json"
},
body:JSON.stringify({
status
})
}
);

loadOrders();

}

async function assignOrder(id){

const agent =
document.getElementById(
`agent-${id}`
).value;

if(!agent){

alert(
"Select Agent First"
);

return;

}

await fetch(
`${API}/api/order/${id}`,
{
method:"PUT",
headers:{
"Content-Type":
"application/json"
},
body:JSON.stringify({

assignedTo:agent,

status:"Assigned"

})
}
);

alert(
`Order Assigned To ${agent}`
);

loadOrders();

}

loadOrders();
setInterval(() => {
  loadOrders();
}, 5000);