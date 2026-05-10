const contactForm = document.getElementById('contactForm');

if(contactForm){

contactForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const data = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        message: contactForm.message.value
    };

    const res = await fetch('/api/contact', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)

    });

    const result = await res.json();

    alert(result.message);

    contactForm.reset();

});

}
