const contactForm = document.getElementById("contactForm");

if(contactForm){

    contactForm.addEventListener("submit", async(e)=>{

        e.preventDefault();

        const btn = document.querySelector(".contact-btn");

        btn.innerText = "Sending...";

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        const response = await fetch("/api/contact", {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                name,
                email,
                message
            })
        });

        const data = await response.json();

        if(data.success){

            alert("Message Sent Successfully ❤️");

            contactForm.reset();

        } else {

            alert("Failed To Send Message");
        }

        btn.innerText = "Send Message";
    });
}


// PRODUCTS

const productsContainer = document.getElementById("productsContainer");

if(productsContainer){

    fetch("/api/products")

    .then(res => res.json())

    .then(data => {

        data.forEach(product => {

            productsContainer.innerHTML += `

                <div class="product-card">

                    <img src="${product.image}">

                    <h3>${product.title}</h3>

                    <p>${product.description}</p>

                    <h4>${product.price}</h4>

                </div>

            `;
        });
    });
}
