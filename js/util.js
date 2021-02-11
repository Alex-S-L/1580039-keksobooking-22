// Проверка корректности диапазона
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
    let randomFloat = Math.random() * (max - min + (0.1 ** afterComma)) + min;/*пока самая удачная с точки зрения статистики*/
    return Math.floor(randomFloat * 10 ** afterComma) / 10 ** afterComma;
  }
};

export {getRandomFloat, getRandomNumber};
