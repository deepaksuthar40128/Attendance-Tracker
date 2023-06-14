window.onload = async () => {
    let allCourses = await getCourses();
    allCourses.forEach(course => {
        document.getElementsByClassName('subjects')[0].innerHTML += ` <div class="subs" id="${course._id}">${course.name}</div>`
    });
    Array.from(document.getElementsByClassName('subs')).forEach(sub => {
        sub.addEventListener('click', () => {
            window.location.replace(`/courseReview/${sub.getAttribute('id')}`);
        })
    })

}

function getCourses() {
    return new Promise((Resolve, Reject) => {
        xhr = new XMLHttpRequest();
        xhr.open('GET', `/ProfCourses`, true); 
        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.response);
                return Resolve(response);
            } else {
                return Reject("error");
            }
        };
        xhr.send();
    })
}

