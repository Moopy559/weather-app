let place = "brisbane";
let locData = {};
const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");
fetchData();

async function fetchData() {
  await getRawLocData(place);
  console.log(locData);
}

async function getRawLocData(location) {
  const response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=adbb17956b384bcfadc00937240502&q=" +
      location
  );

  const dataPull = await response.json();

  locData.location = {
    name: dataPull.location.name,
    region: dataPull.location.region,
  };
  locData.current = {
    temp_c: dataPull.current.temp_c,
    is_day: dataPull.current.is_day,
    text: dataPull.current.condition.text,
    icon: dataPull.current.condition.icon,
  };
}

searchBtn.addEventListener("click", () => {
  place = searchBar.value;
  fetchData();
}); //
