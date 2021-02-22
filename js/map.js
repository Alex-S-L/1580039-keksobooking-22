/* global L:readonly */
import {getAdvertisementCard} from './card.js';
import {getAdvertisements} from './data.js';
import {onMapLoad} from './form-access.js'
import {address} from './form.js'
const TOKIO__COORDINATES = {
  lat: 35.68742,
  lng: 139.77356,
};
let mainMarkerCoordinates = {
  lat: 35.68742,
  lng: 139.77356,
};
const initialScale = 13;
const coordinatesPrecision = 5;
const pinSize = [50, 50];
const pinAnchor = [pinSize[0] / 2, pinSize[1]];
const advertisementCount = 10;
const advertisements = getAdvertisements(advertisementCount);
const map = L.map('map-canvas')
  .on('load', onMapLoad)
  .setView(TOKIO__COORDINATES, initialScale);
const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);
tileLayer.addTo(map);

const mainMarkerPin = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: pinSize,
  iconAnchor: pinAnchor,
});
const ordinaryMarkerPin = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: pinSize,
  iconAnchor: pinAnchor,
})

const mainMarker = L.marker(
  mainMarkerCoordinates,
  {
    draggable: true,
    icon: mainMarkerPin,
  },
);
mainMarker.addTo(map);

const concateCoordinates = (coordinates) => {
  coordinates.lat = coordinates.lat.toFixed(coordinatesPrecision);
  coordinates.lng = coordinates.lng.toFixed(coordinatesPrecision);
  return 'lat: ' + coordinates.lat + ' ' + 'lng: ' +coordinates.lng;
}
const changeCoordinates = () => {
  mainMarkerCoordinates = mainMarker.getLatLng()
  address.value = concateCoordinates(mainMarkerCoordinates)
}
address.value = concateCoordinates(mainMarkerCoordinates)
mainMarker.on('moveend', changeCoordinates)

advertisements.forEach((item) => {
  let {location: {x, y}} = item
  const marker = L.marker(
    {
      lat: x,
      lng: y,
    },
    {
      draggable: false,
      icon: ordinaryMarkerPin,
    },
  )
  marker.addTo(map)
  marker.bindPopup(getAdvertisementCard(item))
})
