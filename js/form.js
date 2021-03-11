import {sendData} from './server-interaction.js'
import {resetMainMarkerCoordinates, MAIN_MARKER_START_COORDINATES, concatenateCoordinates} from './map.js'
const form = document.querySelector('.ad-form');
const housingType = form.querySelector('#type');
const housingPrice = form.querySelector('#price');
const timeField = form.querySelector('.ad-form__element--time');
const checkinTime = form.querySelector('#timein');
const checkoutTime = form.querySelector('#timeout');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const address = form.querySelector('#address');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const main = document.querySelector('main')

const MinPrices = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
};

const minPricesHandler = () => {
  housingPrice.min = MinPrices[housingType.value.toUpperCase()];
  housingPrice.placeholder = MinPrices[housingType.value.toUpperCase()];
}

const timeFieldHandler = (evt) => {
  const time = evt.target.value;
  checkinTime.value = checkoutTime.value = time;
}

const setAccomodationValidity = () => {
  const capacityValue = +capacity.value;
  const roomsValue = +roomNumber.value;
  const firstException = roomsValue === 100 && capacityValue !== 0;
  const secondException = roomsValue !== 100 && capacityValue === 0;

  if (roomsValue < capacityValue) {
    roomNumber.setCustomValidity('комнат не может быть меньше чем гостей');
  } else if (firstException || secondException) {
    roomNumber.setCustomValidity('100 комнат не доступно бронированию только не для гостей');
  } else {
    roomNumber.setCustomValidity('');
  }
  roomNumber.reportValidity();
}

const roomsHandler = () => {
  setAccomodationValidity();
}

const capacityHandler = () => {
  setAccomodationValidity();
}

const randomPlaceClickHandler = () => {
  main.removeChild(errorMessage);
  window.removeEventListener('click', randomPlaceClickHandler);
}

const escapeKeydownHandler = (evt) => {
  if (evt.keyCode === 27) {
    main.removeChild(errorMessage);
    window.removeEventListener('keydown', escapeKeydownHandler);
  }
}

const showFailPopup = () => {
  main.appendChild(errorMessage);
  window.addEventListener('click', randomPlaceClickHandler);
  window.addEventListener('keydown', escapeKeydownHandler);
}

const showSuccessPopup = () => {
  main.appendChild(successMessage);
  setTimeout(() => {main.removeChild(successMessage)}, 1000);
  form.reset();
  resetMainMarkerCoordinates();
  address.value = concatenateCoordinates(MAIN_MARKER_START_COORDINATES);
}

const submitHandler = (evt) => {
  evt.preventDefault();
  const currentFormData = new FormData(evt.target);
  sendData(showSuccessPopup, showFailPopup, currentFormData);
}

roomNumber.addEventListener('change', roomsHandler);
capacity.addEventListener('change', capacityHandler);
housingType.addEventListener('change', minPricesHandler);
timeField.addEventListener('change', timeFieldHandler);
form.addEventListener('submit', submitHandler);
