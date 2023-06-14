window.onload = () => {
    let course_id = document.getElementById('course_id').value;
    let course = sessionStorage.getItem(`${course_id}`);
    if (course) {
        course = JSON.parse(course);
        totalPresent = calculate_attandance(course.attandance);
        totalDay = course.attandance.length; 
        document.getElementById('sub-name').innerHTML = course.course.name;
        document.getElementsByClassName('chart')[0].innerHTML = `<canvas width="230px" height="230px" id="myChart"></canvas>`
        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    label: 'Attandance',
                    data: [totalPresent, totalDay - totalPresent],
                    backgroundColor: [
                        '#16FF00',
                        'rgb(224 59 59)'
                    ],
                    hoverOffset: 20
                }]
            }
        });
        document.getElementById('pt').innerHTML = ` Present <br>
                    ${Math.ceil((totalPresent / totalDay) * 100)}%`
        document.getElementById('at').innerHTML = `Absent <br>
        ${100 - Math.ceil((totalPresent / totalDay) * 100)}%
        `
        var events = [];
        for (let i = 0; i < course.attandance.length; i++) {
            let tdate = new Date(course.attandance[i].date);
            events.push({
                'Date': new Date(`${tdate.getFullYear()}, ${tdate.getMonth()+1}, ${tdate.getDate()}`),
                Title: course.attandance[i].isPresent ? "Present" : "Absent"
            })
        }
        var settings = {};
        var element = document.getElementById('caleandar');
        caleandar(element, events, settings);
    }
    else {

    }
}

function calculate_attandance(attandance) {
    let total_present = 0;
    attandance.forEach(day => {
        total_present += day.isPresent;
    })
    return total_present;
}