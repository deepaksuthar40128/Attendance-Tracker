var events = [
  { 'Date': new Date(2023, 2, 26), 'Title': 'Present'},
  {'Date': new Date(2023, 3, 18), 'Title': 'Absent'},
  {'Date': new Date(2023, 3, 27), 'Title': 'Leave'},
];
var settings = {};
var element = document.getElementById('caleandar');
caleandar(element, events, settings);
