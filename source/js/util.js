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

const debounce = (f, ms) => {
  return function() {
    const fnCall = () => {
      f.apply(this, arguments);
    };
    clearTimeout(fnCall);
    setTimeout(fnCall, ms);
  };
}

export {getAlertPopup, debounce};
