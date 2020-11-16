import '../css/common.css';
import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-search.hbs';
import API from './api-service';
import debounce from 'lodash.debounce';
import getRefs from './get-refs';
import error from './pnotify';

const refs = getRefs();

console.log(refs.searhForm);

refs.searhForm.addEventListener('submit', onSearch);
refs.formControl.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();

  refs.cardContainer.innerHTML = '';

  const form = e.currentTarget;
  const SearchQuery = form.elements.query.value;
  console.log(SearchQuery);

  API.fetchCountry(SearchQuery)
    .then(searchResult)
    // .then(isFetchSucces)
    .catch(console.log)
    .finally(() => {
      form.reset();
    });
}
// console.log(API.fetchCountry);

function rendercountryCard(countrie, countryCardTpl) {
  const markup = countryCardTpl(countrie);
  refs.cardContainer.innerHTML = markup;
}

function searchResult(countries) {
  const countCountries = countries.length;
  console.log(countCountries);

  if (countCountries === 1) {
    rendercountryCard(countries, countryCardTpl);
  } else if (countCountries >= 2 && countCountries <= 10) {
    rendercountryCard(countries, countryListTpl);
  } else if (countCountries > 10) {
    clearCountriesContainer();
    pnotify.Info();
  } else {
    clearCountriesContainer();
    // console.log(console.error());
    error.Error();
  }
}

function clearCountriesContainer() {
  refs.countryContainer.innerHTML = '';
}
