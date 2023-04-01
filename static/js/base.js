let emailInput = document.getElementById('email');
let nameInput = document.getElementById('name');
let messageInput = document.getElementById('message');
emailInput.addEventListener('focus', () => {
    if (emailInput.value == "") {
        emailInput.parentNode.children[0].style.top = 0;
    }
})

emailInput.addEventListener('blur', () => {
    if (emailInput.value == "") {
        emailInput.parentNode.children[0].style.top = `30px`;
    }
})

nameInput.onfocus = () => {
    if (nameInput.value == "") {
        nameInput.parentNode.children[0].style.top = 0;
    }
}

nameInput.onblur = () => {
    if (nameInput.value == "") {
        nameInput.parentNode.children[0].style.top = `30px`;
    }
}

messageInput.onfocus = () => {
    if (messageInput.value == "") {
        messageInput.parentNode.children[0].style.top = 0;
    }
}

messageInput.onblur = () => {
    if (messageInput.value == "") {
        messageInput.parentNode.children[0].style.top = `30px`;
    }
}