let form_input = document.getElementsByClassName('form_input');

Array.from(form_input).forEach((element) => {
    element.addEventListener('focus', () => {
        if (element.value == "") {
            element.parentNode.children[0].style.top = 0;
        }
    })

    element.addEventListener('blur', () => {
        if (element.value == "") {
            element.parentNode.children[0].style.top = `35px`;
        }
    })
})