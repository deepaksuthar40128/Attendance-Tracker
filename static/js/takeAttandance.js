let courseId = document.getElementById('courseId').value;
let fuctionalDiv = document.getElementById('functional')

const loadStudents = async () => {
    let data = await myGET(`/courseStudent/${courseId}`);
    if (data.success) {
        data.students.forEach(async id => {
            let student = await myGET(`/student/${id}`);
            if (student.success) {
                student = student.student;
                fuctionalDiv.innerHTML = fuctionalDiv.innerHTML + ` <div class="card" >
                <img src="${student.profile ? student.profile : '../img/img6.jpg'}" alt="Profile Image">
                <h3>${student.name}</h3>
                <p>Roll No: ${student.rollno}</p>
                <p>Email: ${student.email}</p>
                <div class="button-container">
                    <button id="p${student._id}" onclick="attandStatus('p','${student._id}')" class="present">Present</button>
                    <button id="a${student._id}" onclick="attandStatus('a','${student._id}')" class="absent">Absent</button>
                </div>
            </div>`
            } else {
                alert("Something Wrong!");
            }
        });
    }
    else alert("Something Wrong!");
}

let AttandanceData = [];
const attandStatus = (value, id) => {
    if (value == 'p') {
        AttandanceData.push({
            student_id: id,
            isPresent: true,
        })
        document.getElementById(`a${id}`).style.display = 'none'
        document.getElementById(`p${id}`).innerHTML = 'Marked Present'
    } else {
        AttandanceData.push({
            student_id: id,
            isPresent: false,
        })
        document.getElementById(`p${id}`).style.display = 'none'
        document.getElementById(`a${id}`).style.display = 'Marked Absent'
    }
}

function myGET(url) {
    return new Promise((Resolve, Reject) => {
        xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            let response = JSON.parse(xhr.response);
            return Resolve(response);
        };
        xhr.send();
    })
}


window.onload = loadStudents;


const subData = async () => {  
    let data = {
        AttandanceData,
        courseId
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/loadAttandance', true);
    xhr.setRequestHeader('Content-Type', 'application/json'); 
    xhr.onload = function () {
        alert("Done!");
        location.replace('/');
    };
    xhr.send(JSON.stringify(data));
}