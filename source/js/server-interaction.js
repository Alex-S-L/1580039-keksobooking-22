import {getAlertPopup} from './util.js'

const checkResponse = (response) => {
  if (response.ok) {
    return response.json()
  } else {
    throw new Error(response.status + ' ' + response.statusText);
  }
}

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then(checkResponse)
    .then((advertisements) => {
      onSuccess(advertisements)
    })
    .catch(() => {
      getAlertPopup('Ошибка загрузки данных');
    })
}

const sendData = (onSuccess, onFail, body) => {
  fetch('https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      response.ok ? onSuccess() : onFail();
    })
    .catch(() => {
      onFail()
    })
}

export {getData, sendData}
