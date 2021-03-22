/* global L:readonly */
import {getAdvertisementCard} from './card.js';
import {toggleFormState as mapLoadHandler} from './form-access.js';
import {getData} from './server-interaction.js';
import {bindFiltrationOnChange} from './filter.js';
const MARKERS_COUNT = 10;

const TOKIO_COORDINATES = {
  lat: 35.68742,
  lng: 139.77356,
};
let mainMarkerCoordinates = {
  lat: 35.68742,
  lng: 139.77356,
};
const MAIN_MARKER_START_COORDINATES = {
  lat: 35.68742,
  lng: 139.77356,
};

const form = document.querySelector('.ad-form');
const address = document.querySelector('#address');
const initialScale = 10;
const coordinatesPrecision = 5;
const pinSize = [50, 50];
const pinAnchor = [pinSize[0] / 2, pinSize[1]];

const map = L.map('map-canvas');
const tileLayer = L.tileLayer(/*'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'*/
  'https://tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);
const mainMarkerPin = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: pinSize,
  iconAnchor: pinAnchor,
});
const ordinaryMarkerPin = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: pinSize,
  iconAnchor: pinAnchor,
});
const mainMarker = L.marker(
  mainMarkerCoordinates,
  {
    draggable: true,
    icon: mainMarkerPin,
  },
);
const markerGroup = L.layerGroup([]);

const concatenateCoordinates = ({lat, lng}) => {
  const x = lat.toFixed(coordinatesPrecision);
  const y = lng.toFixed(coordinatesPrecision);
  return `${x} ${y}`;
}

const addressHandler = () => {
  mainMarkerCoordinates = mainMarker.getLatLng();
  address.value = concatenateCoordinates(mainMarkerCoordinates);
}

const resetMapState = () => {
  map.setView(TOKIO_COORDINATES, initialScale);
}

const resetMainMarkerCoordinates = () => {
  mainMarker.setLatLng(MAIN_MARKER_START_COORDINATES);
}

const addMarkers = (advertisements) => {
  markerGroup.clearLayers();
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
    );
    marker.bindPopup(getAdvertisementCard(advertisement));
    marker.addTo(markerGroup);
  })
}

const resetMarkersOnSubmit = (advertisements) => {
  form.addEventListener('submit', () => {
    addMarkers(advertisements)
  })
}

const initMapMarkers = (advertisements) => {
  addMarkers(advertisements);
  bindFiltrationOnChange(advertisements, MARKERS_COUNT, addMarkers);
  resetMarkersOnSubmit(advertisements);
}

map.on('load', mapLoadHandler).setView(TOKIO_COORDINATES, initialScale);
tileLayer.addTo(map);
mainMarker.addTo(map);
markerGroup.addTo(map)
address.value = concatenateCoordinates(mainMarkerCoordinates);
mainMarker.on('moveend', addressHandler);
getData(initMapMarkers);

export {resetMainMarkerCoordinates, MAIN_MARKER_START_COORDINATES, concatenateCoordinates, resetMapState}
