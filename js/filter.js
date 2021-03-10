import {deliteEmptyItems} from './util.js'

const filters = document.querySelector('.map__filters');
const typeFilter = filters.querySelector('#housing-type');
const priceFilter = filters.querySelector('#housing-price');
const roomsFilter = filters.querySelector('#housing-rooms');
const guestsFilter  = filters.querySelector('#housing-guests');
const PricePoints = {
  LOW: 10000,
  MIDDLE: 50000,
}

const checkType = ({offer: {type : housingType}}) => {
  const typeFilterValue = typeFilter.value;
  if (housingType === typeFilterValue || typeFilterValue === 'any') {
    return true;
  }
}

const checkPrice = ({offer: {price : housingPrice}}) => {
  const priceFilterValue = priceFilter.value;
  if (priceFilterValue === 'any' ||
    (priceFilterValue === 'low' && housingPrice < PricePoints.LOW ) ||
    (priceFilterValue === 'middle' && (housingPrice >= PricePoints.LOW && housingPrice < PricePoints.MIDDLE)) ||
    (priceFilterValue === 'high' && housingPrice >= PricePoints.MIDDLE)) {
    return true;
  }
}

const checkRooms = ({offer: {rooms: housingRooms}}) => {
  const roomsFilterValue = roomsFilter.value;
  if (roomsFilterValue === 'any' ||
    roomsFilterValue === housingRooms.toString()) {
    return true;
  }
}

const checkGuests = ({offer: {guests: housingGuests}}) => {
  const guestsFilterValue = guestsFilter.value;
  if (guestsFilterValue === 'any' ||
    guestsFilterValue === housingGuests.toString()) {
    return true;
  }
}

const checkFilters = (item) => {
  if (checkType(item) && checkPrice(item) && checkRooms(item) && checkGuests(item)) {
    return item;
  }
}

const filtrateData = (advertisements, markerCount, cb) => {
  filters.addEventListener('change', () => {
    const filtratedAdvertisements = deliteEmptyItems(advertisements.map((checkFilters))).slice(0, markerCount)
    cb(filtratedAdvertisements);
    return filtratedAdvertisements;
  })
}

export {filtrateData}
