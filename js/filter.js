const filters = document.querySelector('.map__filters');
const typeFilter = filters.querySelector('#housing-type');
const priceFilter = filters.querySelector('#housing-price');
const roomsFilter = filters.querySelector('#housing-rooms');
const guestsFilter  = filters.querySelector('#housing-guests');
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

const checkType = ({offer: {type : housingType}}) => {
  const typeFilterValue = typeFilter.value;
  const anyValue = typeFilterValue === TypeFilterValues.ANY;
  const equalValue = housingType === typeFilterValue;

  return anyValue || equalValue;
}

const checkPrice = ({offer: {price : housingPrice}}) => {
  const priceFilterValue = priceFilter.value;

  const anyPrice = priceFilterValue === PriceFilterValues.ANY;
  const lowPrice = priceFilterValue === PriceFilterValues.LOW && housingPrice < PricePoints.LOW;
  const middlePrice = priceFilterValue === PriceFilterValues.MIDDLE &&
  (housingPrice >= PricePoints.LOW && housingPrice < PricePoints.MIDDLE);
  const highPrice = priceFilterValue === PriceFilterValues.HIGH && housingPrice >= PricePoints.MIDDLE;

  return anyPrice || lowPrice || middlePrice || highPrice;
}

const checkRooms = ({offer: {rooms: housingRooms}}) => {
  const roomsFilterValue = roomsFilter.value;

  const anyValue = roomsFilterValue === RoomsFilterValues.ANY;
  const equalValue = roomsFilterValue === housingRooms.toString();

  return anyValue || equalValue;
}

const checkGuests = ({offer: {guests: housingGuests}}) => {
  const guestsFilterValue = guestsFilter.value;

  const anyValue = guestsFilterValue === GuestsFilterValues.ANY
  const equalValue = guestsFilterValue === housingGuests.toString()

  return anyValue || equalValue;
}

const checkFilters = (item) => {
  if (checkType(item) && checkPrice(item) && checkRooms(item) && checkGuests(item)) {
    return item;
  }
}

const bindFiltrationOnChange = (advertisements, markerCount, cb) => {
  filters.addEventListener('change', () => {
    const filteredAdvertisements = advertisements.filter((checkFilters)).slice(0, markerCount)
    cb(filteredAdvertisements);
  })
}

export {bindFiltrationOnChange}
