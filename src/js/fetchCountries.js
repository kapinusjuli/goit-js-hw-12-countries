import '../css/common.css';
import countryCardTpl from '../templates/country-card.hbs';
// import API from './api-service';
// import getRefs from './get-refs';

const refs = {
  cardContainer: document.querySelector('.js-card-container'),
  searhForm: document.querySelector('.js-search-form'),
};

console.log(refs.searhForm);

refs.searhForm.addEventListener('submit', onSearch);

function fetchCountry(CountryName) {
  return fetch(`https://restcountries.eu/rest/v2/name/${CountryName}`).then(
    response => {
      console.log(response);
      return response.json();
    },
  );
}

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const SearchQuery = form.elements.query.value;
  console.log(SearchQuery);

  fetchCountry(SearchQuery)
    .then(rendercountryCard)
    .catch(error => console.log(error))
    .finally(() => {
      form.reset();
    });
}

// const refs = getRefs();

// refs.searchForm.addEventListener('submit', onSearch);

// function onSearch(e) {
//   e.preventDefault();

//   const form = e.currentTarget;
//   const searchQuery = form.elements.query.value;

//   API.fetchPokemon(searchQuery)
//     .then(renderPokemonCard)
//     .catch(onFetchError)
//     .finally(() => form.reset());
// }

function rendercountryCard(countrie) {
  const markup = countryCardTpl(countrie);
  refs.cardContainer.innerHTML = markup;
}

// function onFetchError(error) {
//   alert('Упс, что-то пошло не так и мы не нашли вашего покемона!');
// }

// // =========================================

// const url = 'https://newsapi.org/v2/everything?q=cars';
// const options = {
//   headers: {
//     Authorization: '4330ebfabc654a6992c2aa792f3173a3',
//   },
// };

// fetch(url, options)
//   .then(r => r.json())
//   .then(console.log);
