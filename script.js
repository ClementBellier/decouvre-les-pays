const weatherSvgToDisplayBasedOnWeatherCode = {
  0: ["#sun"], //Clear sky
  1: ["#sun", "#cloud1"], //Mainly clear
  2: ["#sun", "#cloud1", "#cloud2"], //Partly cloudy
  3: ["#cloud1", "#cloud2"], //Overcast
  45: ["#cloud1", "#cloud2", "#fog"], //Fog
  48: ["#cloud1", "#cloud2", "#fog", "#freeze"], //Depositing rime fog
  51: ["#cloud1", "#rain1"], //Drizzle: Light intensity
  53: ["#cloud1", "#rain1", "#rain2"], //Drizzle: Moderate intensity
  55: ["#cloud1", "#rain1", "#rain2", "#rain3"], //Drizzle: Dense intensity
  56: ["#cloud1", "#rain1", "#freeze"], //Freezing Drizzle: Light intensity
  57: ["#cloud1", "#rain1", "#rain2", "#freeze"], //Freezing Drizzle: Dense intensity
  61: ["#cloud1", "#cloud2", "#rain1"], //Rain: Slight intensity
  63: ["#cloud1", "#cloud2", "#rain1", "#rain2"], //Rain: Moderate intensity
  65: ["#cloud1", "#cloud2", "#rain1", "#rain2", "#rain3"], //Rain: Heavy intensity
  66: ["#cloud1", "#cloud2", "#rain1", "#freeze"], //Freezing Rain: Light intensity
  67: ["#cloud1", "#cloud2", "#rain1", "#rain2", "#freeze"], //Freezing Rain: Heavy intensity
  71: ["#cloud1", "#cloud2", "#snow1"], //Snow fall: Slight intensity
  73: ["#cloud1", "#cloud2", "#snow1", "#snow2"], //Snow fall: Moderate intensity
  75: ["#cloud1", "#cloud2", "#snow1", "#snow2", "#snow3"], //Snow fall: Heavy intensity
  77: ["#cloud1", "#cloud2", "#snow1", "#snow2", "#snow3", "#freeze"], //Snow grains
  80: ["#cloud1", "#cloud2", "#rain1"], //Rain showers: Slight
  81: ["#cloud1", "#cloud2", "#rain1", "#rain2"], //Rain showers: Moderate
  82: ["#cloud1", "#cloud2", "#rain1", "#rain2", "#rain3"], //Rain showers: Violent
  85: ["#cloud1", "#cloud2", "#snow1"], //Snow showers slight
  86: ["#cloud1", "#cloud2", "#snow1", "#snow2", "#snow3"], //Snow showers heavy
  95: ["#cloud1", "#cloud2", "#rain1", "#flash"], //Thunderstorm: Slight
  96: ["#cloud1", "#cloud2", "#rain1", "#rain2", "#flash"], //Thunderstorm: Moderate
  99: ["#cloud1", "#cloud2", "#rain1", "#rain2", "#rain3", "#flash"], //Thunderstorm with slight and heavy hail
};

const applyCountryBorder = async (map, countryName) => {
  const urlBorderData =
    "https://nominatim.openstreetmap.org/search?country=" +
    countryName.trim() +
    "&polygon_geojson=1&format=json";
  const response = await fetch(urlBorderData);
  const borderData = await response.json();
  if (borderData.length > 0) {
    L.geoJSON(borderData[0].geojson, {
      color: "#305B69",
      weight: 2,
      opacity: 1,
      fillColor: "#B5B06E",
      fillOpacity: 0.5,
    }).addTo(map);
  }
};

const destroyPreviousAndCreateMapElement = () => {
  document.querySelector("#os-map")?.remove();
  const mapElement = document.createElement("div");
  mapElement.id = "os-map";
  return document.querySelector("#mapcard").appendChild(mapElement);
};

const displayMap = (countryData) => {
  const countryName = countryData.name.common;
  const latLngCountry = [countryData.latlng[0], countryData.latlng[1]];
  let latLngCapital = [countryData.latlng[0], countryData.latlng[1]];
  if (Object.keys(countryData.capitalInfo).length > 0)
    latLngCapital = [
      countryData.capitalInfo.latlng[0],
      countryData.capitalInfo.latlng[1],
    ];
  const mapElement = destroyPreviousAndCreateMapElement();
  const map = L.map(mapElement);
  L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  const target = latLngCountry;
  map.setView(target, 2);
  L.marker(latLngCapital).addTo(map);
  applyCountryBorder(map, countryName);
};

const getCountryData = async (country) => {
  const url = "https://restcountries.com/v3.1/alpha/" + country;
  const countryData = await fetch(url)
    .then((res) => res.json())
    .catch((error) => console.error(error));
  return countryData[0];
};

const changeTextContent = (elementId, text) => {
  document.querySelector(elementId).textContent = text;
};

const displayFlag = (flagData) => {
  const flagElement = document.querySelector("#flag");
  flagElement.src = flagData.svg;
  flagElement.alt = flagData.alt;
};

const displayHeaderNames = (names) => {
  changeTextContent("#name", names.common);
  changeTextContent("#official", names.official);
};

const displayHeaderInfo = (countryData) => {
  const flagData = countryData.flags;
  const names = countryData.translations.fra;
  displayFlag(flagData);
  displayHeaderNames(names);
};

const needScroll = (element, itemsArray) => {
  element.classList.remove("scroll", "scrollbar");
  if (itemsArray.length > 2) element.classList.add("scroll", "scrollbar");
};

const displayLanguages = (languages) => {
  const element = document.querySelector("#languages");
  element.innerHTML = "";
  if (languages) {
    needScroll(element, Object.values(languages));
    Object.values(languages).forEach(
      (language) => (element.innerHTML += `<span>${language}</span>`)
    );
  }
};

const displayCurrencies = (currencies) => {
  const element = document.querySelector("#currencies");
  element.innerHTML = "";
  if (currencies) {
    needScroll(element, Object.values(currencies));
    Object.values(currencies).forEach((currencie) => {
      let html = `<p><span>${currencie.symbol}</span> ${currencie.name}</p>`;
      if (!currencie.symbol) html = `<p>${currencie.name}</p>`;
      element.innerHTML += html;
    });
  }
};

const displayDemonyms = (elementId, demonym) => {
  const lastLetter = demonym[demonym.length - 1];
  let plurialDemonym = demonym;
  if (lastLetter !== "s") plurialDemonym += "s";
  changeTextContent(elementId, plurialDemonym);
};

const eraseDemonyms = () => {
  changeTextContent("#populate-demonyms-f", "");
  changeTextContent("#populate-demonyms-m", "");
};

const displayInfos = (countryData) => {
  changeTextContent(
    "#populate-number",
    countryData.population.toLocaleString("fr-FR")
  );
  if (countryData.demonyms) {
    displayDemonyms(
      "#populate-demonyms-f",
      countryData.demonyms.fra?.f || countryData.demonyms.eng.f
    );
    displayDemonyms(
      "#populate-demonyms-m",
      countryData.demonyms.fra?.m || countryData.demonyms.eng.m
    );
  } else {
    eraseDemonyms();
  }
  displayLanguages(countryData.languages);
  displayCurrencies(countryData.currencies);
  changeTextContent("#continent", countryData.continents[0]);
};

// const displayCapitalCurrentHour = async ([lat, lng]) => {
//   const timeApiUrl = `https://www.timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${lng}`;
//   const capitalHour = await fetch(timeApiUrl)
//     .then((res) => {
//       return res.json();
//     })
//     .catch((err) => console.error(err));
//   if (!capitalHour) {
//     document.querySelector("#hour-title").classList.add("hidden");
//     document.querySelector("#hour").classList.add("hidden");
//     return;
//   }
//   changeTextContent("#hour", capitalHour);
// };

const displayWeatherSvg = (weatherCode) => {
  const weatherSvgToDisplay =
    weatherSvgToDisplayBasedOnWeatherCode[weatherCode];
  const element = document.querySelector("#weather svg");
  element.innerHTML = "";
  weatherSvgToDisplay.forEach((svgId) => {
    element.innerHTML += `<use href='${svgId}' />`;
  });
};

const displayCapitalWeather = async ([lat, lng]) => {
  const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`;
  const capitalWeather = await fetch(weatherApiUrl).then((res) => res.json());
  changeTextContent("#temperature", capitalWeather.current_weather.temperature);
  displayWeatherSvg(capitalWeather.current_weather.weathercode);
};

const displayCapitalInfo = async (countryData) => {
  const capitalCardElement = document.querySelector("#capitalCard");
  capitalCardElement.classList.remove("hidden");
  if (countryData.capitalInfo.latlng) {
    const capitalLatLng = countryData.capitalInfo.latlng;
    changeTextContent("#capital", countryData.capital);
    //await displayCapitalCurrentHour(capitalLatLng);
    await displayCapitalWeather(capitalLatLng);
    return;
  }
  capitalCardElement.classList.add("hidden");
};

const closeCountrySection = () => {
  document.querySelector("#country").classList.add("disappear");
  document.querySelector("#countryLoader").classList.remove("hidden");
};

const closeButton = () => {
  const closeElement = document.querySelector("#close");
  closeElement.addEventListener("click", () => {
    closeCountrySection();
  });
};

const isInCountrySectionThenClose = (event) => {
  const countrySection = document.querySelector("#country");
  if (!countrySection.contains(event.target)) closeCountrySection();
};

const clickOutCountrySection = () => {
  window.addEventListener("click", (e) => isInCountrySectionThenClose(e), true);
};

const handleScrollForShadow = (element) => {
  const wrapper = document.querySelector("#country")
  const leftShadow = document.querySelector("#leftShadow");
  const rightShadow = document.querySelector("#rightShadow");
  const contentScrollWidth =element.scrollWidth - wrapper.offsetWidth
  element.addEventListener("scroll", (e) => {
    const currentScroll = element.scrollLeft / contentScrollWidth;
    leftShadow.style.opacity = currentScroll;
    rightShadow.style.opacity = 1 - currentScroll;
  });
};

const displayCountryInfo = async (country) => {
  const countryElement = document.querySelector("#country");
  const countryScrollElement = document.querySelector(".country-infos");
  window.removeEventListener(
    "click",
    (e) => isInCountrySectionThenClose(e),
    true
  );
  countryElement.classList.remove("disappear");
  countryScrollElement.scrollLeft = 0;
  const countryData = await getCountryData(country);
  if (!countryData) {
    countryElement.classList.add("hidden");
    document.querySelector("#error").classList.remove("hidden");
    return;
  }
  displayHeaderInfo(countryData);
  displayInfos(countryData);
  await displayCapitalInfo(countryData);
  displayMap(countryData);
  closeButton();
  clickOutCountrySection();
  document.querySelector("#countryLoader").classList.add("hidden");
  handleScrollForShadow(countryScrollElement);
};

const displayFlagOnHome = (country) => {
  const list = document.querySelector("#list");
  const img = document.createElement("img");
  img.src = country.flags.svg;
  img.alt = country.flags.alt;
  list.appendChild(img);
  img.addEventListener("click", () => displayCountryInfo(country.cca3));
};

const displayAllCountryOnHome = async () => {
  const countriesData = await fetch(
    "https://restcountries.com/v3.1/all?fields=cca3,flags"
  ).then((res) => res.json());
  document.querySelector("#all #loader").remove();
  countriesData.forEach((country) => {
    displayFlagOnHome(country);
  });
};

displayAllCountryOnHome();
