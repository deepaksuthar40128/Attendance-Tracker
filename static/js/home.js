const ctx1 = document.getElementById('myChart1');
const ctx2 = document.getElementById('myChart2');
const ctx3 = document.getElementById('myChart3');
const ctx4 = document.getElementById('myChart4');
const ctx5 = document.getElementById('myChart5');


  new Chart(ctx1, {
    type: 'doughnut',  
    data: {
      labels: [
       
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [60, 40],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 4
      }]
    },
  });
  new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: [
      
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [20, 80],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 4
      }]
    },
  });
  new Chart(ctx3, {
    type: 'doughnut',
    data: {
      labels: [
      
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [80, 20],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 4
      }]
    },
  });
  new Chart(ctx4, {
    type: 'doughnut',
    data: {
      labels: [
      
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [80, 20],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 4
      }]
    },
  });
  new Chart(ctx5, {
    type: 'doughnut',
    data: {
      labels: [
      
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [80, 20],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 4
      }]
    },
  });

  