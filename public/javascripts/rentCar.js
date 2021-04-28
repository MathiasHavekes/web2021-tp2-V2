const startLocationEl = document.getElementById("startLocation");

startLocationEl.addEventListener("change", () => {
  const locationId = startLocationEl.value;
  constructOptions(locationId);
});

function constructOptions(locationId) {
  const carsList = document.getElementById("carsList");
  const car = document.getElementById("car");

  car.innerHTML = "";

  for (o of carsList.options) {
    if (o.dataset.location == locationId) {
      car.options.add(new Option(o.innerHTML, o.value));
    }
  }
}
