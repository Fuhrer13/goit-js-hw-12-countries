import countryInfoTemplate from '../templates/country-info.hbs';
import countryListTemplate from '../templates/country-list.hbs';
import fetchCountries from '../js/fetchCountries.js';
import debounce from 'lodash.debounce';
import PNotify from 'pnotify/dist/es/PNotify';

const input = document.querySelector('.js-search');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-blocks');

input.addEventListener('input', debounce(inputSearchCountry, 500));

function clear() {
  list.innerHTML = '';
  info.innerHTML = '';
}

function inputSearchCountry(e) {
  const inputCountry = e.target.value;
  fetchCountry(inputCountry);
}

function renderCountriesList(items) {
  list.insertAdjacentHTML('afterbegin', countryListTemplate(items));
}

function renderCountryInfo(item) {
  info.insertAdjacentHTML('afterbegin', countryInfoTemplate(item));
}

function renderCountry(country) {
  if (country.length >= 2 && country.length <= 10) {
    renderCountriesList(country);
  } else if (country.length === 1) {
    renderCountryInfo(country);
  } else if (country.length > 10) {
    PNotify.error({
      text: 'Too many matches found. Enter more characters',
      delay: 3000,
    });
  } else {
    PNotify.error({
      text: 'Try again!',
      delay: 3000,
    });
  }
}

function fetchCountry(country) {
  clear();
  if (country === '') {
    return;
  }

  fetchCountries(country)
    .then(countries => renderCountry(countries))
    .catch(error => console.log(error));
}
