
let myform = document.getElementById('myform');
let btn = document.getElementById('mypbtn');
myform.addEventListener('submit', (e) => {
    e.preventDefault();
    btn.innerText  = 'Loading...'
    file = myform.file.files[0];
    
    var formData = new FormData();
    formData.append('file', file);
    formData.append('attandance_criteria', myform.attendance_criteria.value);
    formData.append('courseName', myform.courseName.value);
    formData.append('creadit', myform.credit.value);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/uploadStudentsheet', true); 
    xhr.onload = function () {
        alert("Done!");
        btn.innerText  = 'Submit'
        // var response = JSON.parse(xhr.response);
    };
    console.log(formData);
    xhr.send(formData);
})


  