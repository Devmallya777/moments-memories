const loginForm =
document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener(
"submit",
function(e){

e.preventDefault();

const password =
document.getElementById("password").value;

if(password === "eshna@1429"){

localStorage.setItem(
"adminLoggedIn",
"true"
);

window.location.href =
"dashboard.html";

}else{

document.getElementById(
"loginMessage"
).innerHTML =
"❌ Invalid Password";

}

});
}