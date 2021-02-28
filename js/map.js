/* global L:readonly */
import {getAdvertisementCard} from './card.js';
// import {getAdvertisements} from './data.js';
import {toggleFormState} from './form-access.js'
import {getData} from './server-interaction.js'
const address = document.querySelector('#address');
const TOKIO_COORDINATES = {
  lat: 35.68742,
  lng: 139.77356,
};
let mainMarkerCoordinates = {
  lat: 35.68742,
  lng: 139.77356,
};
const initialScale = 10;
const coordinatesPrecision = 5;
const pinSize = [50, 50];
const pinAnchor = [pinSize[0] / 2, pinSize[1]];
// const advertisementCount = 10;

const mapLoadHandler = () => {
  toggleFormState()
}
const map = L.map('map-canvas')
  .on('load', mapLoadHandler)
  .setView(TOKIO_COORDINATES, initialScale);
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
  return `${coordinates.lat} ${coordinates.lng}`;
}

const addressHandler = () => {
  mainMarkerCoordinates = mainMarker.getLatLng()
  address.value = concateCoordinates(mainMarkerCoordinates)
}
address.value = concateCoordinates(mainMarkerCoordinates)
mainMarker.on('moveend', addressHandler)


const renderMarkers = (advertisements) => {
  advertisements.forEach((advertisement) => {
    let {location: {lat: x, lng: y}} = advertisement
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
    marker.bindPopup(getAdvertisementCard(advertisement))
  })
}

const setMarkers = () => {
  getData(renderMarkers)
}
setMarkers()
