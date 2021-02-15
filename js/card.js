import {getAdvertisement} from './data.js';
// const ADVERTISEMENT_COUNT = 10; /*Эта штука мне пока не нужна, а как понадобится, так, скорее всего будет числом карточек, а не объявлений.*/
const HOUSING_TYPE_NAMES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};
const mapCanvas = document.querySelector('.map__canvas');
const advertisementCardTemplate = document.querySelector('#card').content.querySelector('.popup');
const advertisement = getAdvertisement();

const getFeatureItems = (features) => {
  const featuresItems = document.createDocumentFragment() ;
  for (let i = 0; i < features.length; i++) {
    const featuresElement = document.createElement('li');
    featuresElement.classList.add('popup__feature');
    featuresElement.classList.add('popup__feature' + '--' + features[i]);
    featuresItems.appendChild(featuresElement);
  }
  return featuresItems;
}

const getAdvertisementCard = (advertisement) => {
  const advertisementCard = advertisementCardTemplate.cloneNode(true);
  advertisementCard.querySelector('.popup__avatar').src = advertisement.author;
  advertisementCard.querySelector('.popup__title').textContent = advertisement.offer.title;
  advertisementCard.querySelector('.popup__text--address').textContent = advertisement.offer.description;
  advertisementCard.querySelector('.popup__text--price').textContent = advertisement.offer.price;
  advertisementCard.querySelector('.popup__type').textContent = HOUSING_TYPE_NAMES[advertisement.offer.type];

  const capacityText = advertisement.offer.rooms + ' комнат для ' + advertisement.offer.guests + ' гостей';
  advertisementCard.querySelector('.popup__text--capacity').textContent = capacityText;

  const timeText = 'Заезд после ' + advertisement.offer.checkin + ', Выезд до ' + advertisement.offer.checkout;
  advertisementCard.querySelector('.popup__text--time').textContent = timeText;

  const featuresList = advertisementCard.querySelector('.popup__features');
  featuresList.textContent = '';
  featuresList.appendChild(getFeatureItems(advertisement.offer.features));

  advertisementCard.querySelector('.popup__description').textContent = advertisement.offer.description;
  advertisementCard.querySelector('.popup__photos').children[0].src = advertisement.offer.photos;
  return advertisementCard;
}

const advertisementCard = getAdvertisementCard(advertisement);
mapCanvas.appendChild(advertisementCard);
// Если честно, не понял зачем мне сразу по всему массиву данных отрисовывать карточки.
// Отрисую одну, а как понадобится, то циклом нагенерю сколько надо.
