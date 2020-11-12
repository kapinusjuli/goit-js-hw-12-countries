function fetchCountry(CountryName) {
  const BASE_URL = `https://restcountries.eu/rest/v2/name/${CountryName}`;
  return fetch(BASE_URL).then(response => {
    console.log(response);
    return response.json();
  });
}

export default { fetchCountry };
