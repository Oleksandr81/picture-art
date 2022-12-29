/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const forms = () => {
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
  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: 'POST',
      body: data
    });
    return await res.text();
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
      let api;
      item.closest('popup-design') || item.classList.contains('form-upload') ? api = path.designer : api = path.question;
      console.log(api);
      postData(api, formData).then(res => {
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
          console.log('hello');
          item.style.display = 'block';
          item.classList.remove('fadeOutUp');
          item.classList.add('fadeInUp');
        }, 2000);
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
        slides[slideIndex].classList.add('slideInRight');
        slides[slideIndex].classList.remove('slideInLeft');
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



window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  (0,_modules_modals__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_1__["default"])('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_1__["default"])('.main-slider-item', 'vertical');
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map