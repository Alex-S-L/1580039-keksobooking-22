const form = document.querySelector('.ad-form');
const address = form.querySelector('#address');
const housingType = form.querySelector('#type');
const housingPrice = form.querySelector('#price');
const timeField = form.querySelector('.ad-form__element--time');
const checkinTime = form.querySelector('#timein');
const checkoutTime = form.querySelector('#timeout');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
// А не является ли это перечислением из критерия Б8 https://up.htmlacademy.ru/javascript/22/criteries#b8 ?
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

// Тут первый вариант. Не нравится за то, что не сухой.
// const roomNumberHandler = () => {
//   if (+roomNumber.value < +capacity.value) {
//     roomNumber.setCustomValidity('комнат не может быть меньше чем гостей');
//   } else if (+roomNumber.value === 100 && +capacity.value !== 0) {
//     roomNumber.setCustomValidity('100 комнат не доступно бронированию для гостей');
//   } else if (+roomNumber.value !== 100 && +capacity.value === 0) {
//     roomNumber.setCustomValidity('Бронированию не для гостей доступно только 100 комнат');
//   } else {
//     roomNumber.setCustomValidity('');
//   }
//   roomNumber.reportValidity();
// }

// const capacityHandler = () => {
//   if (+roomNumber.value < +capacity.value) {
//     capacity.setCustomValidity('гостей не может быть больше чем комнат');
//   } else if (+roomNumber.value !== 100 && +capacity.value === 0) {
//     capacity.setCustomValidity('Бронированию не для гостей доступно только 100 комнат');
//   } else if (+roomNumber.value === 100 && +capacity.value !== 0) {
//     capacity.setCustomValidity('100 комнат не доступно бронированию для гостей');
//   } else {
//     capacity.setCustomValidity('');
//   }
//   capacity.reportValidity();
// }

// roomNumber.addEventListener('change', roomNumberHandler)
// capacity.addEventListener('change', capacityHandler)

// Тут второй. Не нравится за то, что обработчик весит на форме.
// Хотя, наверно можно добавить классы к форме, найти по ним оба поля
// и в итерации навесить обработчики. Посоветуй пазязя как лучше. =)
// А вообще я себя после этого задания ТААААААКИИИИИМ ТУПЫМ чувствую
const isTargetRooms = (target) => {
  if (target === 'rooms') {
    return 'комнат не может быть меньше чем гостей';
  } else {
    return 'гостей не может быть больше чем комнат';
  }
}

const capacityHandler = (evt) => {
  if (+capacity.value > +roomNumber.value) {
    evt.target.setCustomValidity(isTargetRooms(evt.target.name));
  } else if (+capacity.value === 0 && +roomNumber.value !== 100) {
    evt.target.setCustomValidity('Бронированию не для гостей доступно только 100 комнат');
  } else if (+capacity.value !== 0 && +roomNumber.value === 100) {
    evt.target.setCustomValidity('100 комнат не доступно бронированию для гостей');
  } else {
    evt.target.setCustomValidity('');
  }
  evt.target.reportValidity();
}

form.addEventListener('change', capacityHandler);
housingType.addEventListener('change', minPricesHandler);
timeField.addEventListener('change', timeFieldHandler);

export {address};
