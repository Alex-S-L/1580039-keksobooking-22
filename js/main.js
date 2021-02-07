'use strict'
// Проверка корректности диапазона
const getCorrectRange = (min, max) => {
  if (min >= 0 && max > min) {
    return true;
  }
  alert('Функций getRandomNumber получила недопустимое значение')
  return false;
};

const getRandomNumber = (min, max) => {
  if (getCorrectRange(min, max)) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};

const getRandomFloat = (min, max, afterComma) => {
  if (getCorrectRange(min, max)) {
    let randomFloat = Math.random() * (max - min + (0.1 ** afterComma)) + min;/*пока самая удачная с точки зрения статистики*/
    return Math.floor(randomFloat * 10 ** afterComma) / 10 ** afterComma;
  }
};
  // Тестирование формул получения рандомных чисел
/*const getRandomArrey = (arreyLength, min, max, afterComma) => {
  let randomArrey = [];
  for (let i = 0; i < arreyLength; i++) {
    randomArrey[i] = getRandomFloat(min, max, afterComma);
  }
  return randomArrey;
};

const randomArrey = getRandomArrey(3000, 0, 5, 0);

const getResultEvaluation = (randomArrey) => {
  const result = {};
  for(let i = 0; i < randomArrey.length; i++) {
    const objectProperty = randomArrey[i]
    if (result[objectProperty] != undefined) {
      result[objectProperty]++
    } else {
      result[objectProperty] = 1;
    }
  }
  return result;
}

const result = getResultEvaluation(randomArrey)

console.log(randomArrey);
console.log(result);
*/
const ADVERTISEMENT_COUNT = 10;
const advertisements = [];
const TYPES_OF_HOUSING = ['bungalow', 'flat', 'house', 'palace'];
const TIME_Of_CHECKIN = ['12.00', '13.00', '14.00'];
const TIME_Of_CHECKOUT = ['12.00', '13.00', '14.00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const getRandomFeatures = (features) => {
  let featuresCopy = features.slice();
  return featuresCopy.slice(0, getRandomNumber(1, featuresCopy.length));
};
const getRandomPhotos = (photos) => {
  let photosCopy = photos.slice();
  return photosCopy.slice(0, getRandomNumber(1,photosCopy.length));
};

const getOffer = () => {
  return {
    title: 'Заголовок',
    address: 'x = ' + getRandomFloat(0, 180, 5) + ', ' + 'y = ' + getRandomFloat(0, 90, 5),
    price: getRandomNumber(1000, 1000000),
    type: TYPES_OF_HOUSING[getRandomNumber(0, 3)],
    rooms: getRandomNumber(0, 10),
    guests: getRandomNumber(0, 10),
    checkin: TIME_Of_CHECKIN[getRandomNumber(0, 2)],
    checkout: TIME_Of_CHECKOUT[getRandomNumber(0, 2)],
    features: getRandomFeatures(FEATURES),
    description: 'Описание помещения',
    photos: getRandomPhotos(PHOTOS),
  }
}

const getLocation = () => {
  return {
    x: getRandomFloat(35.65, 35.7, 5),
    y: getRandomFloat(139.7, 139.8, 5),
  }
}
// Собираем всё в один объект
const getAdvertisement = () => {
  return {
    author: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png',
    offer: getOffer(),
    location: getLocation(),
  }
}

const getAdvertisements = (count) => {
  for (let i = 0; i < count; i++) {
    advertisements.push(getAdvertisement());
  }
  return advertisements;
}
// просто чтоб линтер не ругался.
alert(getAdvertisements(ADVERTISEMENT_COUNT));
