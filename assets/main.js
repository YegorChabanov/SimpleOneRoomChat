const socket        = io()
const loginContainer    = document.querySelector('#login-container')
const inputUserName     = document.querySelector('#username')
const chatContainer     = document.querySelector('#chat-container')
const messages          = document.querySelector('#messages')
const logoutButton      = document.querySelector('#logout-button')
const form              = document.querySelector('#message-form')
const inputMessage      = document.querySelector('#message')
const submitButton      = document.querySelector('#submit-button')

function login() {
    if (!inputUserName.value) {
        alert('Please fill your name!')

        return;
    }

    loginContainer.classList.remove("d-flex");
    loginContainer.hidden = true;

    chatContainer.hidden = false;

    logoutButton.hidden = false;
}

function logout() {
    chatContainer.hidden = true;

    loginContainer.classList.add("d-flex");
    loginContainer.hidden = false;

    logoutButton.hidden = true;
}

inputUserName.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        login();
    }
});

inputMessage.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        // Press 'Ctrl + Enter' = New line
        if(e.ctrlKey) {
            inputMessage.value += '\r\n';
            // Press 'Enter' = Send message
        } else {
            submitButton.click();
        }
    }
});

form.addEventListener('submit',(e) => {
    e.preventDefault();

    if (inputMessage.value) {
        socket.emit('chatMessage', {
            userName: inputUserName.value,
            message: inputMessage.value
        })

        inputMessage.value = ''
    }
})

socket.on('chatMessage', (data) => {
    // Create message element
    const messageItem = document.createElement('div')

    messageItem.classList.add('d-flex',  'flex-row', 'p-3')

    messageItem.innerHTML = `<span class="ml-2 p-3">${data.userName}</span><div class="chat ml-2 p-3">${data.message}</div>`

    // Add new message element
    messages.appendChild(messageItem)

    // Scroll to the last message
    messages.scrollTop = messages.scrollHeight;
})

