
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


    // < !-- < !DOCTYPE html >
    //     <html lang="en">

    //         <head>
    //             <meta charset="UTF-8">
    //                 <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //                         <title>Attandance</title>

    //                         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">
    //                         </head>

    //                         <body>

    //                             <form id="myform" >
    //                                 <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
    //                                 <input type="file" name="file" id="file">
    //                                     <input type="text" name="creadit" id="creadit">
    //                                         <input type="text" name="courseName" id="courseName">
    //                                             <input type="number" name="attandance_criteria" id="attandance_criteria">
    //                                                 <button type="submit">submit</button>
    //                                             </form>


    //                                             <script src="js/profHome.js"></script>
    //                                         </body>

    //                                     </html> -->

