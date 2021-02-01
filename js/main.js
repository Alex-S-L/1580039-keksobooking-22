// Решил вынести проверку чтоб не писать в 2-х функциях
const getCorrectRange = (min, max) => {
  if (min >= 0 && max > min) {
    return true;
  }
  alert('Функций getRandomNumber получила недопустимое значение')
  return false;
};
// Пусть хоть эта формула будет корректной
const getRandomNumber = (min, max) => {
  if (getCorrectRange(min, max)) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};

const getRandomFloat = (min, max, afterComma) => {
  if (getCorrectRange(min,max)) {
    // переменная нужна для улучшения читаемости
    const randomFloat = Math.random() * (max - min) + min;
    return +(randomFloat.toFixed(afterComma));
  }
};

const randomNumbers = [];
const randomFloats = [];

for (let i = 0; i < 30; i++) {
  randomNumbers[i] = getRandomNumber(0, 20);
  randomFloats[i] = getRandomFloat(0, 20, 2);
}

// console.log(randomNumbers);
// console.log(randomFloats);
