const getCorrectRange = (min, max) => {
  if (min >= 0 && max > min) {
    return true;
  }
  alert('Функций getRandomNumber получила недопустимое значение')
  return false;
};

const getRandomNumber = (min, max) => {
  if (getCorrectRange(min, max)) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};

const getRandomFloat = (min, max, afterComma) => {
  if (getCorrectRange(min, max)) {
    let randomFloat = Math.random() * (max - min + (0.1 ** afterComma)) + min;
    return Math.floor(randomFloat * 10 ** afterComma) / 10 ** afterComma;
  }
};

const getAlertPopup = (message) => {
  const alertContainer = document.createElement('div')
  alertContainer.style.width = '300px';
  alertContainer.style.padding = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'white';
  alertContainer.style.backgroundColor = '#ccc';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '50%'
  alertContainer.style.top = '50%'
  alertContainer.style.transform = 'translate(-50%, -50%)';
  alertContainer.style.zIndex = '666';
  alertContainer.textContent = message;
  document.body.appendChild(alertContainer);
  setTimeout(() => {document.body.removeChild(alertContainer)}, 2000);
}
/* eslint-disable no-unused-vars */
const debounce = (f, ms) => {
  let timeout;
  return function() {
    const fnCall = () => {
      f.apply(this, arguments);
    };
    clearTimeout(fnCall);
    timeout = setTimeout(fnCall, ms);
  };
}
/* eslint-enable no-unused-vars */
export {getRandomFloat, getRandomNumber, getAlertPopup, debounce};
