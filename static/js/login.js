let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');
emailInput.addEventListener('focus', () => {
    if (emailInput.value == "") {
        let x = 30;
        let si = setInterval(() => {
            // console.log(emailInput.parentNode.children[0].style.top);
            emailInput.parentNode.children[0].style.top = `${x}px`;
            x--;
            if (x == 0) clearInterval(si);
        }, 10);
    }
})

emailInput.addEventListener('blur', () => {
    if (emailInput.value == "") {
        let x = 0;
        let si = setInterval(() => {
            console.log(emailInput.parentNode.children[0].style.top);
            emailInput.parentNode.children[0].style.top = `${x}px`;
            x++;
            if (x == 30) clearInterval(si);
        }, 10);
    }
})

passwordInput.onfocus = () => {
    if (passwordInput.value == "") {
        let x = 30;
        let si = setInterval(() => {
            // console.log(emailInput.parentNode.children[0].style.top);`
            passwordInput.parentNode.children[0].style.top = `${x}px`;
            x--;
            if (x == 0) clearInterval(si);
        }, 10);
    }
}

passwordInput.onblur = () => {
    if (passwordInput.value == "") {
        let x = 0;
        let si = setInterval(() => {
            // console.log(emailInput.parentNode.children[0].style.top);
            passwordInput.parentNode.children[0].style.top = `${x}px`;
            x++;
            if (x == 30) clearInterval(si);
        }, 10);
    }
}

const passwordInput1 = document.querySelector("#password")
const eye = document.querySelector("#eye")

eye.addEventListener("click", function () {
    this.classList.toggle("fa-eye-slash")
    const type = passwordInput1.getAttribute("type") === "password" ? "text" : "password"
    passwordInput.setAttribute("type", type)
})



