const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if(menuToggle){
    menuToggle.addEventListener('click',()=>{
        navLinks.classList.toggle('active');
    });
}

const contactForm = document.getElementById('contactForm');

if(contactForm){

    contactForm.addEventListener('submit', async(e)=>{

        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        try{

            const response = await fetch('/api/contact',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name,email,message})
            });

            const data = await response.json();

            if(data.success){
                alert('Thank you so much for shopping ❤️');
                contactForm.reset();
            }else{
                alert('Something went wrong');
            }

        }catch(error){
            alert('Server Error');
        }

    });
}
