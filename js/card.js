import {getAdvertisement} from './data.js';
// А не является ли это перечислением из критерия Б8 https://up.htmlacademy.ru/javascript/22/criteries#b8 ?
const HOUSING_TYPE_NAMES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const advertisementCardTemplate = document.querySelector('#card').content.querySelector('.popup');

const setAdvertisementDataSource = (element, advertisementData) => {
  element.src = advertisementData;
}

const setAdvertisementDataText = (element, advertisementData) => {
  element.textContent = advertisementData;
}

const setAdvertisementDataCapacityText = (element, advertisementDataOne, advertisementDataTwo) => {
  element.textContent = advertisementDataOne + ' комнат для ' + advertisementDataTwo + ' гостей';
}

const setAdvertisementDataTimeText = (element, advertisementDataOne, advertisementDataTwo) => {
  element.textContent = 'Заезд после ' + advertisementDataOne + ', Выезд до ' + advertisementDataTwo;
}

const isDataEmpty = (advertisementData) => {
  return (!advertisementData || (Array.isArray(advertisementData) && !advertisementData.length));
}

const setAdvertisementData = (element, advertisementData, callback) => {
  if (isDataEmpty(advertisementData)) {
    element.classList.add('hidden');
  } else {
    element.classList.remove('hidden');
    callback(element, advertisementData);
  }
}

const setAdvertisementConcateData = (element, advertisementDataOne, advertisementDataTwo, callback) => {
  if (isDataEmpty(advertisementDataOne) || isDataEmpty(advertisementDataTwo)) {
    element.classList.add('hidden');
  } else {
    element.classList.remove('hidden');
    callback(element, advertisementDataOne, advertisementDataTwo);
  }
}

const setAdvertisementDatas = (element, datas, callback) => {
  element.textContent = '';
  if (isDataEmpty(datas)) {
    element.classList.add('hidden');
  } else {
    element.classList.remove('hidden');
    element.appendChild(callback(datas));
  }
}

const renderFeatureItems = (features) => {
  const featureItems = document.createDocumentFragment() ;
  features.forEach((feature) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add('popup__feature' + '--' + feature);
    featureItems.appendChild(featureElement);
  });
  return featureItems;
}

const renderPhotoItems = (photos) => {
  const photoItems = document.createDocumentFragment();
  photos.forEach((photo) => {
    const photoElement = document.createElement('img');
    photoElement.classList.add('.popup__photo');
    photoElement.src = photo;
    photoElement.width = 45;
    photoElement.height = 45;
    photoElement.alt = 'Фотография жилья';
    photoItems.appendChild(photoElement);
  });
  return photoItems;
}

const getAdvertisementCard = (advertisement) => {
  const advertisementCard = advertisementCardTemplate.cloneNode(true);
  const avatar = advertisementCard.querySelector('.popup__avatar');
  const title = advertisementCard.querySelector('.popup__title');
  const adress = advertisementCard.querySelector('.popup__text--address');
  const price = advertisementCard.querySelector('.popup__text--price');
  const type = advertisementCard.querySelector('.popup__type');
  const capacity = advertisementCard.querySelector('.popup__text--capacity');
  const time = advertisementCard.querySelector('.popup__text--time');
  const features = advertisementCard.querySelector('.popup__features');
  const description = advertisementCard.querySelector('.popup__description');
  const photos = advertisementCard.querySelector('.popup__photos');

  setAdvertisementData(avatar, advertisement.author, setAdvertisementDataSource);
  setAdvertisementData(title, advertisement.offer.title, setAdvertisementDataText);
  setAdvertisementData(adress, advertisement.offer.description, setAdvertisementDataText);
  setAdvertisementData(price, advertisement.offer.price, setAdvertisementDataText);
  setAdvertisementData(type, HOUSING_TYPE_NAMES[advertisement.offer.type], setAdvertisementDataText);
  setAdvertisementConcateData(capacity, advertisement.offer.rooms, advertisement.offer.guests, setAdvertisementDataCapacityText);
  setAdvertisementConcateData(time, advertisement.offer.checkin, advertisement.offer.checkout, setAdvertisementDataTimeText);
  setAdvertisementDatas(features, advertisement.offer.features, renderFeatureItems);
  setAdvertisementData(description, advertisement.offer.description, setAdvertisementDataText);
  setAdvertisementDatas(photos, advertisement.offer.photos, renderPhotoItems);

  return advertisementCard;
}

export {getAdvertisementCard, getAdvertisement}
