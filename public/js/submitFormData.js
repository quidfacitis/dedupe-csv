const formElem = document.querySelector('form');

formElem.addEventListener('submit', (e) => {
  // on form submission, prevent default
  e.preventDefault();

  // construct a FormData object, which fires the formdata event
  new FormData(formElem);
});

formElem.addEventListener('formdata', (e) => {
  console.log('formdata fired');

  // Get the form data from the event object
  let data = e.formData;
  for (var value of data.values()) {
    console.log(value);
  }

  // submit the data via XHR
  let request = new XMLHttpRequest();
  request.open("POST", "/testRoute");
  request.send(data);
  request.onload = function(event) {
    console.log(event.target.response);
    if (event.target.response !== 'Conflict') {
      const { csv, json } = JSON.parse(event.target.response);
      const downloadCsvLink = document.getElementById('download-csv');
      const downloadJsonLink = document.getElementById('download-json');
      downloadCsvLink.textContent = csv;
      downloadCsvLink.setAttribute('href', `/csv/${csv}`);
      downloadJsonLink.textContent = json;
      downloadJsonLink.setAttribute('href', `/json/${json}`);
    }
  };
});
