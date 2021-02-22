const form = document.querySelector('.ad-form');
const formFieldsets = form.children;
const mapFilterBox = document.querySelector('.map__filters');
const mapFilters = mapFilterBox.children;

const switchAccessClass = (element) => {
  if (element.classList.contains('ad-form--disabled')) {
    element.classList.remove('ad-form--disabled');
  } else {
    element.classList.add('ad-form--disabled');
  }
}

const switchElementsDisability = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].hasAttribute('disabled')) {
      elements[i].removeAttribute('disabled', 'disabled')
    } else {
      elements[i].setAttribute('disabled', 'disabled');
    }
  }
}

const accessHandler = (element, elements) => {
  switchAccessClass(element);
  switchElementsDisability(elements);
}

const onMapLoad = () => {
  accessHandler(form, formFieldsets);
  accessHandler(mapFilterBox, mapFilters);
}

onMapLoad();

export {onMapLoad};
