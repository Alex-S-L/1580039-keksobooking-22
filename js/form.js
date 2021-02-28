import {sendData} from './server-interaction.js'
const form = document.querySelector('.ad-form');
const housingType = form.querySelector('#type');
const housingPrice = form.querySelector('#price');
const timeField = form.querySelector('.ad-form__element--time');
const checkinTime = form.querySelector('#timein');
const checkoutTime = form.querySelector('#timeout');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const main = document.querySelector('main')

const MIN_PRICES = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const minPricesHandler = () => {
  housingPrice.min = MIN_PRICES[housingType.value];
  housingPrice.placeholder = MIN_PRICES[housingType.value];
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
  /*Я подумал, что если по условию у нас клик в любое место экрана
   должен удалять меседж, то отдельный обработчик для кнопки и не
   нужен, ибо кнопка - это вообще самое любое место экрана из всех любых*/
  window.addEventListener('click', randomPlaceClickHandler);
  window.addEventListener('keydown', escapeKeydownHandler);
}

const showSuccessPopup = () => {
  main.appendChild(successMessage);
  setTimeout(() => {main.removeChild(successMessage)}, 1000);
  form.reset();
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
