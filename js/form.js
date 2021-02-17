const form = document.querySelector('.ad-form');
const housingType = form.querySelector('#type');
const housingPrice = form.querySelector('#price');
const timeField = form.querySelector('.ad-form__element--time');
const checkinTime = form.querySelector('#timein');
const checkoutTime = form.querySelector('#timeout');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const capacityItems = capacity.querySelectorAll('option')
const MIN_PRICES = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const minPricesHandler = (price) => {
  return () => {
    housingPrice.min = price[housingType.value]
    housingPrice.placeholder = price[housingType.value]
  }
}

housingType.addEventListener('change', minPricesHandler(MIN_PRICES));
timeField.addEventListener('change', (evt) => {
  const time = evt.target.value;
  checkinTime.value = checkoutTime.value = time;
});

// const roomNumberHandler = (items) => {
//   return (evt) => {
//     for (let i = 0; i < items.length; i++) {
//       items[i].disabled = false;
//       if (parseInt(evt.target.value) < parseInt(items[i].value)) {
//         items[i].disabled = true;
//       }
//       if (parseInt(evt.target.value) === 0 && parseInt(items[i].value) === 100) {
//         items[i].disabled = false;
//       }
//     }
//   }
// }
// roomNumber.addEventListener('change', roomNumberHandler(capacityItems))
capacity.textContent = '';
capacity.appendChild(capacityItems[2])
const roomNumberHandler = (items) => {
  return (evt) => {
    capacity.textContent = ''
    for (let i = 0; i < items.length; i++) {
      if (parseInt(evt.target.value) >= parseInt(items[i].value)) {
        capacity.appendChild(items[i])
      }
      if (parseInt(evt.target.value) === 0 && parseInt(items[i].value) === 100) {
        capacity.appendChild(items[i])
      }
    }
  }
}

roomNumber.addEventListener('change', roomNumberHandler(capacityItems))

