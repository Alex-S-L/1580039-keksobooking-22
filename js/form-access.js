// Не знаю что тут лучше сделать. То ли импортировать form, то ли заново найти.
// Пока решил его найти.
const form = document.querySelector('.ad-form');
const formFieldsets = form.children;
const mapFilterBox = document.querySelector('.map__filters');
const mapFilters = mapFilterBox.children;
// .childen возвращает HTML-collection, у которой нет метода .forEach
// .querySelectorAll возвращает NodeList, у которого есть .forEach
// Моожно сделать финт ушами как в примере ниже, или привести всё к массиву,
// но не знаю стоит ли оно того.

// const switchElementsDisability = (elements) => {
//   Array.prototype.forEach.call(elements, (item) => {
//     item.disabled = !item.disabled;
//   })
// }

const switchAccessClass = (element) => {
  (element.classList.contains('ad-form--disabled')) ?
    element.classList.remove('ad-form--disabled') :
    element.classList.add('ad-form--disabled');
}

const switchElementsDisability = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = !elements[i].disabled;
  }
}

const accessHandler = (element, elements) => {
  switchAccessClass(element);
  switchElementsDisability(elements);
}

const toggleFormState = () => {
  accessHandler(form, formFieldsets);
  accessHandler(mapFilterBox, mapFilters);
}

toggleFormState();

export {toggleFormState};
