window.addEventListener("scroll",()=>{

const navbar=document.querySelector(".navbar");

if(window.scrollY>50){
navbar.style.boxShadow="0 8px 25px rgba(0,0,0,0.1)";
}else{
navbar.style.boxShadow="0 4px 15px rgba(0,0,0,0.05)";
}

});


const cards=document.querySelectorAll(
".feature-box,.product-card,.extra-card"
);

cards.forEach((card)=>{

card.addEventListener("mouseenter",()=>{
card.style.transform="translateY(-10px)";
});

card.addEventListener("mouseleave",()=>{
card.style.transform="translateY(0px)";
});

});

console.log("Moments & Memories Loaded Successfully 💖");
const cards = document.querySelectorAll('.gender-box');

cards.forEach((card)=>{
card.addEventListener('mouseenter',()=>{
card.style.transform='translateY(-10px) scale(1.02)';
card.style.transition='0.4s';
});

card.addEventListener('mouseleave',()=>{
card.style.transform='translateY(0px) scale(1)';
});
});
// NAVBAR EFFECT

window.addEventListener("scroll", () => {

const navbar = document.querySelector(".navbar");

if(window.scrollY > 40){

navbar.style.background = "rgba(255,255,255,0.75)";
navbar.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";

}else{

navbar.style.background = "rgba(255,255,255,0.45)";
navbar.style.boxShadow = "none";

}

});



// CARD ANIMATION

const cards = document.querySelectorAll(".gift-card");

cards.forEach((card)=>{

card.addEventListener("mouseenter",()=>{

card.style.transform = "translateY(-10px)";
card.style.transition = "0.4s";

});

card.addEventListener("mouseleave",()=>{

card.style.transform = "translateY(0px)";

});

});



// FEATURE ANIMATION

const features = document.querySelectorAll(".feature-item");

features.forEach((item)=>{

item.addEventListener("mouseenter",()=>{

item.style.transform = "scale(1.05)";
item.style.transition = "0.3s";

});

item.addEventListener("mouseleave",()=>{

item.style.transform = "scale(1)";

});

});



console.log("Moments & Memories Products Loaded 💖");
