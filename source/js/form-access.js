const FORM_DISABLED_CLASS = 'ad-form--disabled';

const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('.ad-form__element', '.ad-form-header');
const mapFilterBox = document.querySelector('.map__filters');
const mapFilters = mapFilterBox.querySelectorAll('.map__filter', '.map__features');

const switchAccessClass = (element) => {
  (element.classList.contains(FORM_DISABLED_CLASS)) ?
    element.classList.remove(FORM_DISABLED_CLASS) :
    element.classList.add(FORM_DISABLED_CLASS);
}

const switchElementsDisability = (elements) => {
  elements.forEach((element) => {
    element.disabled = !element.disabled;
  })
}

const switchFormAccess = (element, elements) => {
  switchAccessClass(element);
  switchElementsDisability(elements);
}

const toggleFormState = () => {
  switchFormAccess(form, formFieldsets);
  switchFormAccess(mapFilterBox, mapFilters);
}

toggleFormState();

export {toggleFormState};
