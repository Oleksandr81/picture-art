import modals from "./modules/modals";
import slider from "./modules/slider";
import forms from "./modules/forms";
import showMoreStyles from "./modules/show-more-styles";
import showPicture from "./modules/show-picture";
import sortPicture from "./modules/sort-picture";
import calc from "./modules/calc";
import accorgion from "./modules/accordion";
import scrollPage from "./modules/scroll-page";
import burgerMenu from "./modules/burger-menu";

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  let modalState = {};
  modals();
  forms(modalState);
  slider('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
  slider('.main-slider-item', 'vertical');
  showMoreStyles();
  showPicture('.sizes-block');
  sortPicture();
  calc('.form-upload', modalState);
  accorgion('.accordion-block', '.accordion-heading');
  scrollPage();
  burgerMenu();
});