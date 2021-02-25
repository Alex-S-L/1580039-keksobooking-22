const form = document.querySelector('.ad-form');
const address = form.querySelector('#address');
const housingType = form.querySelector('#type');
const housingPrice = form.querySelector('#price');
const timeField = form.querySelector('.ad-form__element--time');
const checkinTime = form.querySelector('#timein');
const checkoutTime = form.querySelector('#timeout');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
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

roomNumber.addEventListener('change', roomsHandler)
capacity.addEventListener('change', capacityHandler)
housingType.addEventListener('change', minPricesHandler);
timeField.addEventListener('change', timeFieldHandler);

export {address};
