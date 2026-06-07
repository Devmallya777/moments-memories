/* =========================
LOAD SETTINGS
========================= */

window.onload = function(){

loadSettings();

};

/* =========================
BUSINESS SETTINGS
========================= */

function saveBusinessSettings(){

const data = {

businessName:
document.getElementById("businessName").value,

businessTagline:
document.getElementById("businessTagline").value,

businessEmail:
document.getElementById("businessEmail").value,

businessPhone:
document.getElementById("businessPhone").value,

businessAddress:
document.getElementById("businessAddress").value,

gstNumber:
document.getElementById("gstNumber").value

};

localStorage.setItem(
"businessSettings",
JSON.stringify(data)
);

alert("Business Settings Saved ✅");

}

/* =========================
WEBSITE SETTINGS
========================= */

function saveWebsiteSettings(){

const data = {

footerText:
document.getElementById("footerText").value,

primaryColor:
document.getElementById("primaryColor").value,

secondaryColor:
document.getElementById("secondaryColor").value

};

localStorage.setItem(
"websiteSettings",
JSON.stringify(data)
);

alert("Website Settings Saved ✅");

}

/* =========================
INVENTORY SETTINGS
========================= */

function saveInventorySettings(){

const data = {

lowStockAlert:
document.getElementById("lowStockAlert").value,

minimumStock:
document.getElementById("minimumStock").value,

autoDeduction:
document.getElementById("autoDeduction").checked

};

localStorage.setItem(
"inventorySettings",
JSON.stringify(data)
);

alert("Inventory Settings Saved ✅");

}

/* =========================
FINANCE SETTINGS
========================= */

function saveFinanceSettings(){

const data = {

investorShare:
document.getElementById("investorShare").value,

reserveFund:
document.getElementById("reserveFund").value,

operatingFund:
document.getElementById("operatingFund").value

};

localStorage.setItem(
"financeSettings",
JSON.stringify(data)
);

alert("Finance Settings Saved ✅");

}

/* =========================
PASSWORD UPDATE
========================= */

function updatePassword(){

const current =
document.getElementById("currentPassword").value;

const newPass =
document.getElementById("newPassword").value;

const confirm =
document.getElementById("confirmPassword").value;

if(newPass !== confirm){

alert("Passwords Do Not Match ❌");

return;

}

localStorage.setItem(
"adminPassword",
newPass
);

alert("Password Updated Successfully 🔒");

}

/* =========================
DARK MODE
========================= */

function setTheme(theme){

if(theme === "dark"){

document.body.classList.add("dark");

}

else{

document.body.classList.remove("dark");

}

localStorage.setItem(
"theme",
theme
);

}

/* =========================
SAVE ALL
========================= */

function saveAllSettings(){

saveBusinessSettings();

saveWebsiteSettings();

saveInventorySettings();

saveFinanceSettings();

alert(
"All Settings Saved Successfully 🚀"
);

}

/* =========================
LOAD SETTINGS
========================= */

function loadSettings(){

/* BUSINESS */

const business =
JSON.parse(
localStorage.getItem(
"businessSettings"
)
);

if(business){

document.getElementById(
"businessName"
).value =
business.businessName || "";

document.getElementById(
"businessTagline"
).value =
business.businessTagline || "";

document.getElementById(
"businessEmail"
).value =
business.businessEmail || "";

document.getElementById(
"businessPhone"
).value =
business.businessPhone || "";

document.getElementById(
"businessAddress"
).value =
business.businessAddress || "";

document.getElementById(
"gstNumber"
).value =
business.gstNumber || "";

}

/* WEBSITE */

const website =
JSON.parse(
localStorage.getItem(
"websiteSettings"
)
);

if(website){

document.getElementById(
"footerText"
).value =
website.footerText || "";

document.getElementById(
"primaryColor"
).value =
website.primaryColor || "#111827";

document.getElementById(
"secondaryColor"
).value =
website.secondaryColor || "#2563eb";

}

/* INVENTORY */

const inventory =
JSON.parse(
localStorage.getItem(
"inventorySettings"
)
);

if(inventory){

document.getElementById(
"lowStockAlert"
).value =
inventory.lowStockAlert || "";

document.getElementById(
"minimumStock"
).value =
inventory.minimumStock || "";

document.getElementById(
"autoDeduction"
).checked =
inventory.autoDeduction || false;

}

/* FINANCE */

const finance =
JSON.parse(
localStorage.getItem(
"financeSettings"
)
);

if(finance){

document.getElementById(
"investorShare"
).value =
finance.investorShare || "";

document.getElementById(
"reserveFund"
).value =
finance.reserveFund || "";

document.getElementById(
"operatingFund"
).value =
finance.operatingFund || "";

}

/* THEME */

const savedTheme =
localStorage.getItem(
"theme"
);

if(savedTheme === "dark"){

document.body.classList.add(
"dark"
);

}

}
function toggleSidebar(){

const sidebar =
document.getElementById("sidebar");

sidebar.classList.toggle("show");

}