const getRandomNumber = (min, max) => {
  if (Math.sign(min) > -1 && max > min) {
    const randomNumber = Math.random() * (max - min) + min;
    return randomNumber
  }

  alert('Функций getRandomNumber получила недопустимое значение')
  return null
};

const getWholeNumber = (min, max) => Math.round(getRandomNumber(min, max));

const getFractionNumber = (min, max, afterComma) => {
  return (getRandomNumber (min, max)).toFixed(afterComma);
}
// Выше неправильное решение.

const getRandomWholeNumber1 = (min, max) => {
  if (Math.sign(min) > -1 && max > min) {
    retun Math.floor(Math.random() * (max - min + 1) + min)
  }

  alert('Функций getRandomNumber получила недопустимое значение')
  return null
}
// Функция для получение целого значения, как мне кажется, должна выглядеть как то так.
// А как реализовать получение значения с плавающей точкой, да чтоб она ещё и закрывала
// диапазон включительно как то не могу себе представить.
// Решил набросать примерное решение чтоб было что обсудить. =)
