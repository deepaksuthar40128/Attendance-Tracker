let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');
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

passwordInput.onfocus = () => {
    if (passwordInput.value == "") {
        passwordInput.parentNode.children[0].style.top = 0;
    }
}

passwordInput.onblur = () => {
    if (passwordInput.value == "") {
        passwordInput.parentNode.children[0].style.top = `30px`;
    }
}

const passwordInput1 = document.querySelector("#password")
const eye = document.querySelector("#eye")

eye.addEventListener("click", function () {
    this.classList.toggle("fa-eye-slash")
    const type = passwordInput1.getAttribute("type") === "password" ? "text" : "password"
    passwordInput.setAttribute("type", type)
})



