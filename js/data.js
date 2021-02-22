import {getRandomNumber, getRandomFloat} from './util.js';

// const advertisements = []; /*Не пригодился. Пока закоменчу.*/
const TYPES_OF_HOUSING = ['bungalow', 'flat', 'house', 'palace'];
const TIME_OF_CHECKIN = ['12.00', '13.00', '14.00'];
const TIME_OF_CHECKOUT = ['12.00', '13.00', '14.00'];
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
    price: getRandomNumber(1000, 1000000) + ' ₽/ночь',
    type: TYPES_OF_HOUSING[getRandomNumber(0, 3)],
    rooms: getRandomNumber(1, 10),
    guests: getRandomNumber(1, 10),
    checkin: TIME_OF_CHECKIN[getRandomNumber(0, 2)],
    checkout: TIME_OF_CHECKOUT[getRandomNumber(0, 2)],
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

const getAdvertisement = () => {
  return {
    author: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png',
    offer: getOffer(),
    location: getLocation(),
  }
}

const getAdvertisements = (quantity) => {
  let advertisementsList = []
  for (let i = 0; i < quantity; i++) {
    advertisementsList.push(getAdvertisement())
  }
  return advertisementsList;
}

export {getAdvertisement, getAdvertisements};
