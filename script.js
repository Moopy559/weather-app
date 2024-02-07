let place = "brisbane";
let locWeatherData = {};
let locAstronomyData = {};
const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");
const temp = document.querySelector(".stats h2");
const summary = document.querySelector(".stats h3");
const coords = document.querySelector(".stats h4");
const icon = document.querySelector(".main img");
fetchData();

async function fetchData() {
  await getRawLocData(place);
  console.log(locWeatherData);
  updateMainComponent();
}

// Calls Weather API
async function getRawLocData(location) {
  const response = await fetch(
    "http://api.weatherapi.com/v1/current.json?key=adbb17956b384bcfadc00937240502&q=" +
      location
  );

  const dataPull = await response.json();

  locWeatherData.location = {
    name: dataPull.location.name,
    region: dataPull.location.region,
  };
  locWeatherData.current = {
    temp_c: dataPull.current.temp_c,
    is_day: dataPull.current.is_day,
    text: dataPull.current.condition.text,
    icon: dataPull.current.condition.icon,
  };
}

// // Calls Astronomy API
// async function getRawLocData() {
//   const response = await fetch(
//     // TASK: Change the below URL to have a dynamic date at the end
//     "http://api.weatherapi.com/v1/astronomy.json?key=adbb17956b384bcfadc00937240502&q&q=brisbane&dt=2024-02-07"
//   );

//   const dataPull = await response.json();

//   locAstronomyData.location = {
//     name: dataPull.location.name,
//     region: dataPull.location.region,
//   };
//   locAstronomyData.current = {
//     temp_c: dataPull.current.temp_c,
//     is_day: dataPull.current.is_day,
//     text: dataPull.current.condition.text,
//     icon: dataPull.current.condition.icon,
//   };
// }

// Takes user input (location) and pulls weather data for that location
searchBtn.addEventListener("click", () => {
  place = searchBar.value;
  fetchData();
});

function updateMainComponent() {
  temp.textContent = `${locWeatherData.current.temp_c}\u00B0`;
  summary.textContent = locWeatherData.current.text;
  coords.textContent = `${locWeatherData.location.name}, ${locWeatherData.location.region}`;
  icon.setAttribute("src", locWeatherData.current.icon);
  icon.setAttribute("alt", `'${locWeatherData.current.text}' Icon`);
}
