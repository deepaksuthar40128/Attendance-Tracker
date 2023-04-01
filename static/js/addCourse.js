
let myform = document.getElementById('myform');
myform.addEventListener('submit', (e) => {
    e.preventDefault();
    file = myform.children[1].files[0];

    var formData = new FormData();
    formData.append('file', file);
    formData.append('attandance_criteria', myform.children[4].value);
    formData.append('courseName', myform.children[3].value);
    formData.append('creadit', myform.children[2].value);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/uploadStudentsheet', true);
    xhr.setRequestHeader('X-CSRF-TOKEN', myform.children[0].value);
    xhr.onload = function () {
        // var response = JSON.parse(xhr.response);
        console.log(xhr.response);
    };
    xhr.send(formData);
})


  