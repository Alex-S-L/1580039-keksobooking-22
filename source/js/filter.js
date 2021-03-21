import {debounce} from './util.js'
const PricePoints = {
  LOW: 10000,
  MIDDLE: 50000,
};
const TypeFilterValues = {
  ANY: 'any',
  PALACE: 'palace',
  FLAT: 'flat',
  HOUSE: 'house',
  BUNGALOW: 'bungalow',
};
const PriceFilterValues = {
  ANY: 'any',
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};
const RoomsFilterValues = {
  ANY: 'any',
  ONE: '1',
  TWO: '2',
  THREE: '3',
};
const GuestsFilterValues = {
  ANY: 'any',
  ONE: '1',
  TWO: '2',
  NOT_FOR_GUESTS: '0',
};
const DEBOUNCE_TIMEOUT = 500;

const filters = document.querySelector('.map__filters');
const typeFilter = filters.querySelector('#housing-type');
const priceFilter = filters.querySelector('#housing-price');
const roomsFilter = filters.querySelector('#housing-rooms');
const guestsFilter  = filters.querySelector('#housing-guests');
const featuresFilters = filters.querySelectorAll('.map__checkbox');

const checkType = ({offer: {type : offerType}}) => {
  const typeFilterValue = typeFilter.value;
  const anyValue = typeFilterValue === TypeFilterValues.ANY;
  const equalValue = offerType === typeFilterValue;

  return anyValue || equalValue;
}

const checkPrice = ({offer: {price : offerPrice}}) => {
  const priceFilterValue = priceFilter.value;

  const anyPrice = priceFilterValue === PriceFilterValues.ANY;
  const lowPrice = priceFilterValue === PriceFilterValues.LOW && offerPrice < PricePoints.LOW;
  const middlePrice = priceFilterValue === PriceFilterValues.MIDDLE &&
  (offerPrice >= PricePoints.LOW && offerPrice < PricePoints.MIDDLE);
  const highPrice = priceFilterValue === PriceFilterValues.HIGH && offerPrice >= PricePoints.MIDDLE;

  return anyPrice || lowPrice || middlePrice || highPrice;
}

const checkRooms = ({offer: {rooms: offerRooms}}) => {
  const roomsFilterValue = roomsFilter.value;

  const anyValue = roomsFilterValue === RoomsFilterValues.ANY;
  const equalValue = roomsFilterValue === offerRooms.toString();

  return anyValue || equalValue;
}

const checkGuests = ({offer: {guests: offerGuests}}) => {
  const guestsFilterValue = guestsFilter.value;

  const anyValue = guestsFilterValue === GuestsFilterValues.ANY
  const equalValue = guestsFilterValue === offerGuests.toString()

  return anyValue || equalValue;
}

const getChosenFeatures = () => {
  const chosenFeatures = []
  featuresFilters.forEach((feature) => {
    if (feature.checked) {
      chosenFeatures.push(feature.value)
    }
  })
  return chosenFeatures;
}

const checkFeatures = ({offer: {features: offerFeatures}}) => {
  const chosenFeatures = getChosenFeatures()

  return chosenFeatures.every((chosenFeature) => {
    return offerFeatures.includes(chosenFeature);
  });
};

const checkFilters = (item) => {
  return checkType(item) &&
  checkPrice(item) &&
  checkRooms(item) &&
  checkGuests(item) &&
  checkFeatures(item);
}

const filtrationHandler = (advertisements, markerCount, cb) => {
  const filteredAdvertisements = advertisements.filter((checkFilters)).slice(0, markerCount);
  cb(filteredAdvertisements);
}

const bindFiltrationOnChange = (advertisements, markerCount, cb) => {
  const debounceHandler = debounce(
    filtrationHandler.bind(this, advertisements, markerCount, cb),
    DEBOUNCE_TIMEOUT);

  filters.addEventListener('change', debounceHandler);
}

export {bindFiltrationOnChange}
