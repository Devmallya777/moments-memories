const messagesContainer = document.getElementById("messagesContainer");

fetch("/api/messages")

.then(res => res.json())

.then(data => {

    data.forEach(message => {

        messagesContainer.innerHTML += `

            <div class="message-card">

                <h3>${message.name}</h3>

                <p>${message.email}</p>

                <p>${message.message}</p>

            </div>

        `;
    });
});
