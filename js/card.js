import {getAdvertisement} from './data.js';
const HOUSING_TYPE_NAMES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};
const mapCanvas = document.querySelector('.map__canvas');
const advertisementCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const advertisement = getAdvertisement();

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

const checkData = (advertisementData) => {
  if (!advertisementData || (Array.isArray(advertisementData) && !advertisementData.length)) {
    return true;
  }
}

const setAdvertisementData = (element, advertisementData, setFunction) => {
  if (checkData(advertisementData)) {
    element.style.display = 'none';
  } else {
    setFunction(element, advertisementData);
  }
}

const setAdvertisementConcateData = (element, advertisementDataOne, advertisementDataTwo, setFunction) => {
  if (checkData(advertisementDataOne) || checkData(advertisementDataTwo)) {
    element.style.display = 'none';
  } else {
    setFunction(element, advertisementDataOne, advertisementDataTwo);
  }
}

const setAdvertisementArrayData = (element, arrayData, setFunction) => {
  element.textContent = '';
  if (checkData(arrayData)) {
    element.style.display = 'none';
  } else {
    element.appendChild(setFunction(arrayData))
  }
}

const renderFeatureItems = (featuresArray) => {
  const featureItems = document.createDocumentFragment() ;
  for (let i = 0; i < featuresArray.length; i++) {
    const featuresElement = document.createElement('li');
    featuresElement.classList.add('popup__feature');
    featuresElement.classList.add('popup__feature' + '--' + featuresArray[i]);
    featureItems.appendChild(featuresElement);
  }
  return featureItems;
}

const renderPhotoItems = (photos) => {
  const photoItems = document.createDocumentFragment();
  for (let i = 0; i < photos.length; i++) {
    const photo = document.createElement('img');
    photo.classList.add('.popup__photo');
    photo.src = photos[i];
    photo.width = 45;
    photo.height = 45;
    photo.alt = 'Фотография жилья'
    photoItems.appendChild(photo);
  }
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
  setAdvertisementArrayData(features, advertisement.offer.features, renderFeatureItems);
  setAdvertisementData(description, advertisement.offer.description, setAdvertisementDataText);
  setAdvertisementArrayData(photos, advertisement.offer.photos, renderPhotoItems);

  return advertisementCard;
}

const advertisementCard = getAdvertisementCard(advertisement);

mapCanvas.appendChild(advertisementCard);
