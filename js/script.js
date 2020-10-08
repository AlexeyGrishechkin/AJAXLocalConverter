let inputByn = document.getElementById("byn");
let inputUsd = document.getElementById("usd");
let inputEur = document.getElementById("eur");

inputByn.addEventListener("input", () => {
  function convert() {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();

      request.open("GET", "js/current.json");
      request.setRequestHeader(
        "Content-type",
        "application/json; charset=utf-8"
      );
      request.send();

      request.onload = () => {
        if (request.readyState === 4 && request.status == 200) {
          resolve(request);
        } else {
          reject();
        }
      };
    });
  }
  convert()
    // .then((request) => JSON.parse(request.response))
    .then((requst) => {
      let data = JSON.parse(requst.response);
      inputUsd.value = (inputByn.value / data.usd).toFixed(2);
      inputEur.value = (inputByn.value / data.eur).toFixed(2);
    })
    .catch(() => {
      inputEur.value = "Что-то пошло не так!";
      inputUsd.value = "Что-то пошло не так!";
    });
});
