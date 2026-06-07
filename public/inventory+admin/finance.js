/* ====================
   DATA LOADING
==================== */

let investors    = JSON.parse(localStorage.getItem("investors"))    || [];
let collections  = JSON.parse(localStorage.getItem("collections"))  || [];
let expenses     = JSON.parse(localStorage.getItem("expenses"))     || [];
let withdrawals  = JSON.parse(localStorage.getItem("withdrawals"))  || [];
let settlements  = JSON.parse(localStorage.getItem("settlements"))  || [];

/* ====================
   SAVE TO LOCALSTORAGE
==================== */

function saveData() {
  localStorage.setItem("investors",   JSON.stringify(investors));
  localStorage.setItem("collections", JSON.stringify(collections));
  localStorage.setItem("expenses",    JSON.stringify(expenses));
  localStorage.setItem("withdrawals", JSON.stringify(withdrawals));
  localStorage.setItem("settlements", JSON.stringify(settlements));
}

/* ====================
   ADD INVESTOR
==================== */

function addInvestor() {
  const nameEl   = document.getElementById("investorName");
  const amountEl = document.getElementById("investorAmount");

  const name   = nameEl.value.trim();
  const amount = Number(amountEl.value);

  if (!name || !amount || amount <= 0) {
    alert("Please enter a valid investor name and amount.");
    return;
  }

  investors.push({ name, amount });

  nameEl.value   = "";
  amountEl.value = "";

  saveData();
  renderAll();
}

/* ====================
   ADD COLLECTION
==================== */

function addCollection() {
  const sourceEl = document.getElementById("collectionReason");
  const amountEl = document.getElementById("collectionAmount");

  const source = sourceEl.value.trim();
  const amount = Number(amountEl.value);

  if (!source || !amount || amount <= 0) {
    alert("Please enter a valid source and amount.");
    return;
  }

  const month = new Date().toLocaleString("default", { month: "long", year: "numeric" });

  collections.push({ source, amount, month });

  sourceEl.value = "";
  amountEl.value = "";

  saveData();
  renderAll();
}

/* ====================
   ADD EXPENSE
==================== */

function addExpense() {
  const reasonEl = document.getElementById("expenseReason");
  const amountEl = document.getElementById("expenseAmount");

  const reason = reasonEl.value.trim();
  const amount = Number(amountEl.value);

  if (!reason || !amount || amount <= 0) {
    alert("Please enter a valid reason and amount.");
    return;
  }

  const month = new Date().toLocaleString("default", { month: "long", year: "numeric" });

  expenses.push({ reason, amount, month });

  reasonEl.value = "";
  amountEl.value = "";

  saveData();
  renderAll();
}

/* ====================
   ADD WITHDRAWAL
==================== */

function addWithdrawal() {
  const personEl = document.getElementById("withdrawPerson");
  const amountEl = document.getElementById("withdrawAmount");

  const person = personEl.value.trim();
  const amount = Number(amountEl.value);

  if (!person || !amount || amount <= 0) {
    alert("Please enter a valid person name and amount.");
    return;
  }

  withdrawals.push({ person, amount });

  personEl.value = "";
  amountEl.value = "";

  saveData();
  renderAll();
}

/* ====================
   SETTLE PROFIT
==================== */

function settleProfit() {
  const totalInvestment = investors.reduce((sum, i) => sum + i.amount, 0);
  const totalRevenue    = collections.reduce((sum, c) => sum + c.amount, 0);
  const totalExpenses   = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalWithdrawals = withdrawals.reduce((sum, w) => sum + w.amount, 0);
  const netProfit       = totalRevenue - totalExpenses - totalWithdrawals;

  if (investors.length === 0) {
    alert("No investors found.");
    return;
  }

  if (netProfit <= 0) {
    alert("No profit available to settle.");
    return;
  }

  const date = new Date().toLocaleDateString();
  let summary = "Profit Settlement on " + date + ":\n\n";

  investors.forEach(i => {
    const share = totalInvestment > 0
      ? ((i.amount / totalInvestment) * netProfit).toFixed(2)
      : 0;

    summary += `${i.name}: ₹${share}\n`;

    settlements.push({
      name: i.name,
      amount: share,
      date
    });
  });

  summary += "\nTotal Profit Distributed: ₹" + netProfit.toFixed(2);
  alert(summary);

  saveData();
  renderAll();
}

/* ====================
   EXPORT REPORT
==================== */

function exportFinance() {
  const totalInvestment  = investors.reduce((sum, i) => sum + i.amount, 0);
  const totalRevenue     = collections.reduce((sum, c) => sum + c.amount, 0);
  const totalExpenses    = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalWithdrawals = withdrawals.reduce((sum, w) => sum + w.amount, 0);
  const netProfit        = totalRevenue - totalExpenses - totalWithdrawals;
  const cashInHand       = totalRevenue - totalExpenses - totalWithdrawals;

  let report = "";
  report += "========================================\n";
  report += "         M&M FINANCE REPORT\n";
  report += "  Generated: " + new Date().toLocaleString() + "\n";
  report += "========================================\n\n";

  report += "--- SUMMARY ---\n";
  report += "Total Investment : ₹" + totalInvestment + "\n";
  report += "Total Revenue    : ₹" + totalRevenue + "\n";
  report += "Total Expenses   : ₹" + totalExpenses + "\n";
  report += "Total Withdrawals: ₹" + totalWithdrawals + "\n";
  report += "Net Profit       : ₹" + netProfit + "\n";
  report += "Cash In Hand     : ₹" + cashInHand + "\n\n";

  report += "--- INVESTORS ---\n";
  if (investors.length === 0) {
    report += "No investors.\n";
  } else {
    investors.forEach(i => {
      const share = totalInvestment > 0
        ? ((i.amount / totalInvestment) * netProfit).toFixed(2)
        : 0;
      report += `${i.name} | Investment: ₹${i.amount} | Profit Share: ₹${share}\n`;
    });
  }

  report += "\n--- COLLECTIONS ---\n";
  if (collections.length === 0) {
    report += "No collections.\n";
  } else {
    collections.forEach(c => {
      report += `${c.source} | ₹${c.amount} | ${c.month || "-"}\n`;
    });
  }

  report += "\n--- EXPENSES ---\n";
  if (expenses.length === 0) {
    report += "No expenses.\n";
  } else {
    expenses.forEach(e => {
      report += `${e.reason} | ₹${e.amount} | ${e.month || "-"}\n`;
    });
  }

  report += "\n--- WITHDRAWALS ---\n";
  if (withdrawals.length === 0) {
    report += "No withdrawals.\n";
  } else {
    withdrawals.forEach(w => {
      report += `${w.person} | ₹${w.amount}\n`;
    });
  }

  report += "\n========================================\n";

  const blob = new Blob([report], { type: "text/plain" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = "MM_Finance_Report.txt";
  a.click();
  URL.revokeObjectURL(url);
}

/* ====================
   RENDER ALL
==================== */

function renderAll() {

  /* --- CALCULATIONS --- */

  const totalInvestment  = investors.reduce((sum, i) => sum + i.amount, 0);
  const totalRevenue     = collections.reduce((sum, c) => sum + c.amount, 0);
  const totalExpenses    = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalWithdrawals = withdrawals.reduce((sum, w) => sum + w.amount, 0);
  const netProfit        = totalRevenue - totalExpenses - totalWithdrawals;
  const cashInHand       = totalRevenue - totalExpenses - totalWithdrawals;
  const businessWorth    = totalInvestment + netProfit;

  /* --- TOP STAT CARDS --- */

  document.getElementById("totalInvestment").innerHTML  = "₹" + totalInvestment;
  document.getElementById("totalRevenue").innerHTML     = "₹" + totalRevenue;
  document.getElementById("totalExpenses").innerHTML    = "₹" + totalExpenses;
  document.getElementById("netProfit").innerHTML        = "₹" + netProfit;
  document.getElementById("cashInHand").innerHTML       = "₹" + cashInHand;
  document.getElementById("pendingPayments").innerHTML  = "₹" + getPendingCOD();
  document.getElementById("agentCollection").innerHTML  = "₹" + getAgentCollections();
  document.getElementById("businessWorth").innerHTML    = "₹" + businessWorth;

  /* --- INVESTOR TABLE --- */

  const investorTable = document.getElementById("investorTable");
  investorTable.innerHTML = "";

  if (investors.length === 0) {
    investorTable.innerHTML = `<tr><td colspan="3" style="text-align:center;opacity:0.5;">No investors yet</td></tr>`;
  } else {
    investors.forEach((i, idx) => {
      investorTable.innerHTML += `
        <tr>
          <td>${i.name}</td>
          <td>₹${i.amount}</td>
          <td>-</td>
          <td><button onclick="deleteItem('investors', ${idx})">🗑️</button></td>
        </tr>`;
    });
  }

  /* --- COLLECTION TABLE --- */

  const collectionTable = document.getElementById("collectionTable");
  collectionTable.innerHTML = "";

  if (collections.length === 0) {
    collectionTable.innerHTML = `<tr><td colspan="2" style="text-align:center;opacity:0.5;">No collections yet</td></tr>`;
  } else {
    collections.forEach((c, idx) => {
      collectionTable.innerHTML += `
        <tr>
          <td>${c.source}</td>
          <td>₹${c.amount}</td>
          <td><button onclick="deleteItem('collections', ${idx})">🗑️</button></td>
        </tr>`;
    });
  }

  /* --- EXPENSE TABLE --- */

  const expenseTable = document.getElementById("expenseTable");
  expenseTable.innerHTML = "";

  if (expenses.length === 0) {
    expenseTable.innerHTML = `<tr><td colspan="2" style="text-align:center;opacity:0.5;">No expenses yet</td></tr>`;
  } else {
    expenses.forEach((e, idx) => {
      expenseTable.innerHTML += `
        <tr>
          <td>${e.reason}</td>
          <td>₹${e.amount}</td>
          <td><button onclick="deleteItem('expenses', ${idx})">🗑️</button></td>
        </tr>`;
    });
  }

  /* --- WITHDRAWAL TABLE --- */

  const withdrawTable = document.getElementById("withdrawTable");
  withdrawTable.innerHTML = "";

  if (withdrawals.length === 0) {
    withdrawTable.innerHTML = `<tr><td colspan="2" style="text-align:center;opacity:0.5;">No withdrawals yet</td></tr>`;
  } else {
    withdrawals.forEach((w, idx) => {
      withdrawTable.innerHTML += `
        <tr>
          <td>${w.person}</td>
          <td>₹${w.amount}</td>
          <td><button onclick="deleteItem('withdrawals', ${idx})">🗑️</button></td>
        </tr>`;
    });
  }

  /* --- PROFIT DISTRIBUTION TABLE --- */

  const profitTable = document.getElementById("profitTable");
  profitTable.innerHTML = "";

  if (investors.length === 0) {
    profitTable.innerHTML = `<tr><td colspan="3" style="text-align:center;opacity:0.5;">No investors yet</td></tr>`;
  } else {
    investors.forEach(i => {
      const share = totalInvestment > 0
        ? ((i.amount / totalInvestment) * netProfit).toFixed(2)
        : 0;
      profitTable.innerHTML += `
        <tr>
          <td>${i.name}</td>
          <td>₹${i.amount}</td>
          <td>₹${share}</td>
        </tr>`;
    });
  }

  /* --- MONTHLY REPORT TABLE --- */

  const monthlyReport = document.getElementById("monthlyReport");
  monthlyReport.innerHTML = "";

  // Group collections and expenses by month
  const monthlyData = {};

  collections.forEach(c => {
    const m = c.month || "Unknown";
    if (!monthlyData[m]) monthlyData[m] = { revenue: 0, expenses: 0 };
    monthlyData[m].revenue += c.amount;
  });

  expenses.forEach(e => {
    const m = e.month || "Unknown";
    if (!monthlyData[m]) monthlyData[m] = { revenue: 0, expenses: 0 };
    monthlyData[m].expenses += e.amount;
  });

  const months = Object.keys(monthlyData);

  if (months.length === 0) {
    monthlyReport.innerHTML = `<tr><td colspan="4" style="text-align:center;opacity:0.5;">No monthly data yet</td></tr>`;
  } else {
    months.forEach(m => {
      const rev  = monthlyData[m].revenue;
      const exp  = monthlyData[m].expenses;
      const prof = rev - exp;
      monthlyReport.innerHTML += `
        <tr>
          <td>${m}</td>
          <td>₹${rev}</td>
          <td>₹${exp}</td>
          <td>₹${prof}</td>
        </tr>`;
    });
  }

  /* --- CASH FLOW SECTION --- */

  const totalInflow  = totalRevenue + totalInvestment;
  const totalOutflow = totalExpenses + totalWithdrawals;
  const balance      = totalInflow - totalOutflow;

  const cashFlowSection = document.querySelector(".section h2");
  // Target the Cash Flow section specifically by its content
  document.querySelectorAll(".section").forEach(section => {
    if (section.querySelector("h2") && section.querySelector("h2").textContent.includes("Cash Flow")) {
      section.querySelector("p:nth-child(2)").textContent = "Total Inflow: ₹"  + totalInflow;
      section.querySelector("p:nth-child(3)").textContent = "Total Outflow: ₹" + totalOutflow;
      section.querySelector("p:nth-child(4)").textContent = "Current Balance: ₹" + balance;
    }
  });

}

/* ====================
   PENDING COD HELPER
   (collections tagged as COD)
==================== */

function getPendingCOD() {
  return collections
    .filter(c => c.source && c.source.toLowerCase().includes("cod"))
    .reduce((sum, c) => sum + c.amount, 0);
}

/* ====================
   AGENT COLLECTIONS HELPER
   (collections tagged as agent)
==================== */

function getAgentCollections() {
  return collections
    .filter(c => c.source && c.source.toLowerCase().includes("agent"))
    .reduce((sum, c) => sum + c.amount, 0);
}

/* ====================
   DELETE ITEM
==================== */

function deleteItem(type, index) {
  if (!confirm("Are you sure you want to delete this entry?")) return;

  if (type === "investors")   investors.splice(index, 1);
  if (type === "collections") collections.splice(index, 1);
  if (type === "expenses")    expenses.splice(index, 1);
  if (type === "withdrawals") withdrawals.splice(index, 1);

  saveData();
  renderAll();
}

/* ====================
   INIT
==================== */

renderAll();