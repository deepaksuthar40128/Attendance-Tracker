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



window.onload = checkFunction();
function checkFunction() {
    if (window.PublicKeyCredential) {
        document.getElementsByClassName('biometricAuth')[0].innerHTML = `
            <button class="btn1" onclick = "BioAuth()">
                BioAuth
                </button>
        `;
    }

}

function BioAuth() {
    if (window.PublicKeyCredential) {
        var challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);
        var options = {
            publicKey: {
                challenge: challenge,
                userVerification: 'required',
                authenticatorSelection: {
                    authenticatorAttachment: 'platform',
                    requireResidentKey: false,
                    userVerification: 'required'
                }
            }
        };
        navigator.credentials.get(options).then(function (credential) {
            console.log("Here We GOoooooooooo");
            get_datails(credential.id);
        }).catch(function (error) {
            if (error.name === "NotAllowedError" || error.name === "NotFoundError") {
                alert("Keys Not Found ");
            } else {
                alert("Something wrong from our side");
            }
        });
    }
}

function get_datails(id) {
    return new Promise((Resolve, Reject) => {
        document.getElementById('email').type = "text"
        document.getElementById('email').value = id;
        document.getElementById('password').value = 'a';
        document.getElementById('submit-btn').click();
        Resolve();
    })
}