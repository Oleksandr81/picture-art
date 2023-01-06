/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/accordion.js":
/*!*************************************!*\
  !*** ./src/js/modules/accordion.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const accorgion = (blockSelector, btnSelector) => {
  const accordionBlock = document.querySelectorAll(blockSelector),
    btn = document.querySelectorAll(btnSelector);
  accordionBlock.forEach(item => {
    item.style.display = 'none';
    item.classList.add('close');
  });
  btn.forEach(item => {
    item.addEventListener('click', e => {
      let target = e.target,
        accordionBlock = target.parentElement.nextElementSibling;
      if (accordionBlock.classList.contains('close')) {
        accordionBlock.classList.remove('close');
        accordionBlock.classList.add('open', 'animated', 'fadeIn');
        accordionBlock.style.display = 'block';
      } else {
        accordionBlock.classList.remove('open', 'animated', 'fadeIn');
        accordionBlock.classList.add('close');
        accordionBlock.style.display = 'none';
      }
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (accorgion);

/***/ }),

/***/ "./src/js/modules/burger-menu.js":
/*!***************************************!*\
  !*** ./src/js/modules/burger-menu.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const burgerMenu = () => {
  const btn = document.querySelector('.burger'),
    menu = document.querySelector('.burger-menu');
  menu.style.display = 'none';
  btn.addEventListener('click', () => {
    if (menu.style.display === 'none' && window.screen.availWidth < 993) {
      menu.style.display = 'block';
    } else {
      menu.style.display = 'none';
    }
  });
  window.addEventListener('resize', () => {
    if (window.screen.availWidth > 992) {
      menu.style.display = 'none';
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (burgerMenu);

/***/ }),

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/requests */ "./src/js/services/requests.js");

const calc = (formCalc, state) => {
  const form = document.querySelector(formCalc),
    sizeSelect = form.querySelector('#size'),
    materialSelect = form.querySelector('#material'),
    optionsSelect = form.querySelector('#options'),
    promocodeInput = form.querySelector('.promocode'),
    calcPrice = form.querySelector('.calc-price');
  let size = 0,
    material = 0,
    options = 0,
    promocode = 1,
    price = 0;
  sizeSelect.addEventListener('change', () => {
    size = sizeSelect.value;
    state.size = size;
    calcSum();
  });
  materialSelect.addEventListener('change', () => {
    material = materialSelect.value;
    state.material = material;
    calcSum();
  });
  optionsSelect.addEventListener('change', () => {
    options = optionsSelect.value;
    state[material] = material;
    calcSum();
  });
  promocodeInput.addEventListener('input', () => {
    if (promocodeInput.value === 'IWANTPOPART') {
      promocode = 0.7;
      calcSum();
    } else {
      promocode = 1;
      calcSum();
    }
    state.promocode = promocodeInput.value;
  });
  function calcSum() {
    price = Math.ceil((+size * +material + +options) * promocode);
    if (!size || !material) {
      calcPrice.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
    } else {
      calcPrice.textContent = price;
    }
    state.price = price;
  }
  form.addEventListener('submit', () => {
    calcPrice.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
    sizeSelect.value = '';
    optionsSelect.value = '';
    materialSelect.value = '';
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/requests */ "./src/js/services/requests.js");

const forms = state => {
  const form = document.querySelectorAll('form'),
    input = document.querySelectorAll('input'),
    upload = document.querySelectorAll('[name="upload"]');
  const message = {
    loading: 'loading..',
    success: 'success',
    error: 'error..',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png'
  };
  const path = {
    designer: 'assets/server.php',
    question: 'assets/question.php'
  };
  const clearInput = () => {
    input.forEach(item => {
      item.value = '';
    });
    upload.forEach(item => {
      item.previousElementSibling.textContent = "Файл не выбран";
    });
  };
  upload.forEach(item => {
    item.addEventListener('input', () => {
      const statusUploadText = item.previousElementSibling;
      if (item.files[0]) {
        statusUploadText.textContent = moderateFileName(item.files[0].name);
      }
    });
  });
  function moderateFileName(fileName) {
    let arr = fileName.split("."),
      newArr = [];
    for (let j of arr) {
      if (j.length > 7) {
        newArr.push(j.slice(0, 7) + '..');
      } else {
        newArr.push(j);
      }
    }
    return newArr.join(".");
  }
  form.forEach(item => {
    item.addEventListener('submit', e => {
      e.preventDefault();
      let messageBlock = document.createElement('div');
      messageBlock.classList.add('status');
      messageBlock.style.textAlign = 'center';
      item.parentNode.append(messageBlock);
      item.classList.add('animated', 'fadeOutUp');
      setTimeout(() => {
        item.style.display = 'none';
      }, 400);
      let statusMessImg = document.createElement('img');
      statusMessImg.setAttribute('src', message.spinner);
      statusMessImg.classList.add('animated', 'fadeInUp');
      messageBlock.append(statusMessImg);
      let textMessage = document.createElement('div');
      textMessage.textContent = message.loading;
      messageBlock.append(textMessage);
      const formData = new FormData(item);
      if (item.getAttribute('data-calc') === 'end') {
        for (let key in state) {
          formData.append(key, state[key]);
        }
      }
      state = {};
      let api;
      item.closest('popup-design') || item.classList.contains('form-upload') ? api = path.designer : api = path.question;
      console.log(api);
      (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.postData)(api, formData).then(res => {
        console.log(res);
        statusMessImg.setAttribute('src', message.ok);
        textMessage.textContent = message.success;
      }).catch(() => {
        statusMessImg.setAttribute('src', message.fail);
        textMessage.textContent = message.error;
      }).finally(() => {
        clearInput();
        setTimeout(() => {
          textMessage.remove();
          statusMessImg.remove();
          item.style.display = 'block';
          item.classList.remove('fadeOutUp');
          item.classList.add('fadeInUp');
        }, 2000);
        // state = {};
      });
    });
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modals.js":
/*!**********************************!*\
  !*** ./src/js/modules/modals.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const modals = () => {
  let scrollWidth = calcWidthScroll(),
    btnCount = 0;
  function bindModal(modalWindowSelector, btnOpenModalSelector, btnCloseModal) {
    let destroy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    const btnOrder = document.querySelectorAll(btnOpenModalSelector),
      modal = document.querySelector(modalWindowSelector),
      modalClose = document.querySelector(btnCloseModal);
    btnOrder.forEach(btn => {
      btn.addEventListener('click', () => {
        if (destroy) {
          btn.remove();
        }
        btnCount += 1;
        modal.style.display = 'block';
        modal.classList.add('animated', 'fadeIn');
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scrollWidth}px`;
      });
    });
    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.marginRight = `0px`;
    });
    modal.addEventListener('click', e => {
      let target = e.target;
      if (target && target.classList.contains(modalWindowSelector.replace(/\./, ""))) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.marginRight = `0px`;
      }
    });
  }
  function openModalByTime(modalWindowSelector, time) {
    const modalConsult = document.querySelector(modalWindowSelector),
      modals = document.querySelectorAll('[data-modal]');
    setTimeout(() => {
      let display;
      modals.forEach(modal => {
        if (getComputedStyle(modal).display !== 'none') {
          display = 'block';
        }
      });
      if (!display) {
        modalConsult.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scrollWidth}px`;
      }
    }, time);
  }
  function openModalByScrollBottom(modalWindowSelector, btnSelector) {
    const modal = document.querySelector(modalWindowSelector),
      btn = document.querySelector(btnSelector);
    window.addEventListener('scroll', () => {
      if (!btnCount && document.body.offsetHeight <= window.pageYOffset + document.documentElement.clientHeight) {
        btn.click();
      }
    });
  }
  openModalByScrollBottom('.popup-gift', '.fixed-gift');
  function calcWidthScroll() {
    const block = document.createElement('div');
    block.style.width = '50px';
    block.style.height = '50px';
    block.style.overflowY = 'scroll';
    block.style.visibility = 'hidden';
    document.body.append(block);
    let scrollWidth = block.offsetWidth - block.clientWidth;
    block.remove();
    return scrollWidth;
  }
  bindModal('.popup-design', '.button-design', '.popup-design .popup-close');
  bindModal('.popup-consultation', '.button-consultation', '.popup-consultation .popup-close');
  bindModal('.popup-gift', '.fixed-gift', '.popup-gift .popup-close', true);
  openModalByTime('.popup-consultation', 60000);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);

/***/ }),

/***/ "./src/js/modules/scroll-page.js":
/*!***************************************!*\
  !*** ./src/js/modules/scroll-page.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const scrollPage = () => {
  let links = document.querySelectorAll('[href^="#"]'),
    speed = 0.3;
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      let widthTop = document.documentElement.scrollTop,
        hash = this.hash,
        toBlock = document.querySelector(hash).getBoundingClientRect().top,
        start = null;
      requestAnimationFrame(step);
      function step(time) {
        if (start === null) {
          start = time;
        }
        let progress = time - start,
          r = toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock);
        document.documentElement.scrollTo(0, r);
        if (r != widthTop + toBlock) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (scrollPage);

/***/ }),

/***/ "./src/js/modules/show-more-styles.js":
/*!********************************************!*\
  !*** ./src/js/modules/show-more-styles.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const showMoreStyles = () => {
  const btn = document.querySelector('.button-styles'),
    stylesConteiner = document.querySelector('#styles .row'),
    styles = document.querySelectorAll('.styles-2');
  let open = true;
  function showStyles() {
    styles.forEach(item => {
      item.classList.add('animated', 'fadeIn');
      item.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs', 'styles-2');
      item.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
    });
    btn.textContent = 'Посмотреть меньше стилей';
    open = false;
  }
  function hideStyles() {
    for (let i = 4; i < stylesConteiner.children.length; i++) {
      stylesConteiner.children[i].classList.remove('fadeIn');
      stylesConteiner.children[i].classList.remove('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
      stylesConteiner.children[i].classList.add('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs', 'styles-2');
    }
    btn.textContent = 'Посмотреть больше стилей';
    open = true;
  }
  btn.addEventListener('click', () => {
    if (open) {
      showStyles();
    } else {
      console.log(stylesConteiner.children.length);
      hideStyles();
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showMoreStyles);

/***/ }),

/***/ "./src/js/modules/show-picture.js":
/*!****************************************!*\
  !*** ./src/js/modules/show-picture.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const showPicture = selectorImg => {
  const pictures = document.querySelectorAll(selectorImg);
  pictures.forEach(item => {
    item.addEventListener('mouseover', () => {
      let img = item.querySelector('img'),
        pBlocks = item.querySelectorAll('p:not(.sizes-hit)');
      img.classList.add('animated', 'fadeIn');
      img.src = img.src.slice(0, -4) + '-1.png';
      pBlocks.forEach(p => {
        p.style.display = 'none';
      });
    });
    item.addEventListener('mouseout', () => {
      let img = item.querySelector('img'),
        pBlocks = item.querySelectorAll('p:not(.sizes-hit)');
      img.classList.remove('animated', 'fadeIn');
      img.src = img.src.slice(0, -6) + '.png';
      pBlocks.forEach(p => {
        p.style.display = 'block';
      });
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (showPicture);

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const slider = (slidesSelector, dir, prev, next) => {
  const slides = document.querySelectorAll(slidesSelector),
    prevBtn = document.querySelector(prev),
    nextBtn = document.querySelector(next);
  let slideIndex = 0,
    paused = true;
  function viewSlide(n) {
    if (n > slides.length - 1) {
      slideIndex = 0;
    }
    if (n < 0) {
      slideIndex = slides.length - 1;
    }
    slides.forEach(item => {
      item.style.display = 'none';
      item.classList.add('animated');
    });
    slides[slideIndex].style.display = 'block';
  }
  function plusSlide(n) {
    viewSlide(slideIndex += n);
  }
  function showSlideByTime() {
    paused = setInterval(() => {
      plusSlide(1);
      if (dir === 'horizontal') {
        slides[slideIndex].classList.add('fadeIn');

        // slides[slideIndex].classList.add('slideInRight');
        // slides[slideIndex].classList.remove('slideInLeft');
      } else {
        slides[slideIndex].classList.add('slideInDown');
      }
    }, 3000);
  }
  try {
    prevBtn.addEventListener('click', () => {
      plusSlide(-1);
      slides[slideIndex].classList.remove('slideInRight');
      slides[slideIndex].classList.add('slideInLeft');
    });
    nextBtn.addEventListener('click', () => {
      plusSlide(1);
      slides[slideIndex].classList.add('slideInRight');
      slides[slideIndex].classList.remove('slideInLeft');
    });
  } catch (e) {}
  slides[0].parentNode.addEventListener('mouseenter', () => {
    clearInterval(paused);
  });
  slides[0].parentNode.addEventListener('mouseleave', () => {
    showSlideByTime();
  });
  viewSlide(slideIndex);
  showSlideByTime(dir);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/sort-picture.js":
/*!****************************************!*\
  !*** ./src/js/modules/sort-picture.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const sortPicture = () => {
  const menuContainer = document.querySelector('.portfolio-menu'),
    menuList = menuContainer.querySelectorAll('li'),
    imgBlocks = document.querySelectorAll('.portfolio-block'),
    blockNone = document.querySelector('.portfolio-no');
  let count = 0;
  menuContainer.addEventListener('click', e => {
    let target = e.target,
      sortClass = target.className.split(' ')[0];
    menuList.forEach(item => {
      item.classList.remove('active');
    });
    target.classList.add('active');
    showSortImg(sortClass);
    count = 0;
  });
  function showSortImg(showStyle) {
    imgBlocks.forEach(item => {
      item.style.display = 'none';
      item.classList.remove('animated', 'fadeIn');
      if (item.classList.contains(showStyle)) {
        item.style.display = 'block';
        item.classList.add('animated', 'fadeIn');
        count += 1;
      }
    });
    if (!count) {
      blockNone.style.display = 'block';
      count = 0;
    } else {
      blockNone.style.display = 'none';
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sortPicture);

/***/ }),

/***/ "./src/js/services/requests.js":
/*!*************************************!*\
  !*** ./src/js/services/requests.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResourse": () => (/* binding */ getResourse),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  let res = await fetch(url, {
    method: 'POST',
    body: data
  });
  return await res.text();
};
const getResourse = async url => {
  let res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status ${res.status}`);
  }
  return await res.json();
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modals */ "./src/js/modules/modals.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_show_more_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/show-more-styles */ "./src/js/modules/show-more-styles.js");
/* harmony import */ var _modules_show_picture__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/show-picture */ "./src/js/modules/show-picture.js");
/* harmony import */ var _modules_sort_picture__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/sort-picture */ "./src/js/modules/sort-picture.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_accordion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/accordion */ "./src/js/modules/accordion.js");
/* harmony import */ var _modules_scroll_page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/scroll-page */ "./src/js/modules/scroll-page.js");
/* harmony import */ var _modules_burger_menu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/burger-menu */ "./src/js/modules/burger-menu.js");










window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  let modalState = {};
  (0,_modules_modals__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])(modalState);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_1__["default"])('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_1__["default"])('.main-slider-item', 'vertical');
  (0,_modules_show_more_styles__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_show_picture__WEBPACK_IMPORTED_MODULE_4__["default"])('.sizes-block');
  (0,_modules_sort_picture__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])('.form-upload', modalState);
  (0,_modules_accordion__WEBPACK_IMPORTED_MODULE_7__["default"])('.accordion-block', '.accordion-heading');
  (0,_modules_scroll_page__WEBPACK_IMPORTED_MODULE_8__["default"])();
  (0,_modules_burger_menu__WEBPACK_IMPORTED_MODULE_9__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map