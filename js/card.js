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

const checkData = (tag, advertisementData) => {
  if (typeof advertisementData === 'undefined') {
    tag.style.display = 'none';
  }
}

const checkDataArray = (tag, advertisementDataArray) => {
  if ((advertisementDataArray.isArray) && (advertisementDataArray.length === 0)) {
    tag.style.display = 'none'
  }
}

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
// вот этого тут явно не хватало
const getPhotoItems = (photos) => {
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

  checkData(avatar, advertisement.author);
  avatar.src = advertisement.author;

  checkData(title, advertisement.offer.title);
  title.textContent = advertisement.offer.title;

  checkData(adress, advertisement.offer.description);
  adress.textContent = advertisement.offer.description;

  checkData(price, advertisement.offer.price);
  price.textContent = advertisement.offer.price;

  checkData(type, advertisement.offer.type)
  type.textContent = HOUSING_TYPE_NAMES[advertisement.offer.type];

  checkData(capacity, advertisement.offer.rooms);
  checkData(capacity, advertisement.offer.guests);
  const capacityText = advertisement.offer.rooms + ' комнат для ' + advertisement.offer.guests + ' гостей';
  capacity.textContent = capacityText;

  checkData(time, advertisement.offer.checkin);
  checkData(time, advertisement.offer.checkout);
  const timeText = 'Заезд после ' + advertisement.offer.checkin + ', Выезд до ' + advertisement.offer.checkout;
  time.textContent = timeText;

  checkData(features, advertisement.offer.features);
  checkDataArray(features, advertisement.offer.features);
  features.textContent = '';
  features.appendChild(getFeatureItems(advertisement.offer.features));

  checkData(description, advertisement.offer.description)
  description.textContent = advertisement.offer.description;

  checkData(photos, advertisement.offer.photos);
  checkDataArray(photos, advertisement.offer.photos);
  photos.textContent = '';
  photos.appendChild(getPhotoItems(advertisement.offer.photos));

  return advertisementCard;
}

const advertisementCard = getAdvertisementCard(advertisement);

mapCanvas.appendChild(advertisementCard);
