const formElem = document.querySelector('form');

formElem.addEventListener('submit', (e) => {
  e.preventDefault();
  new FormData(formElem);
});

formElem.addEventListener('formdata', (e) => {
  let data = e.formData;

  let request = new XMLHttpRequest();
  request.open("POST", "/dedupe");
  request.send(data);

  request.onload = (event) => {
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
