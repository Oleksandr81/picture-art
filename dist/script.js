/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
  let scrollWidth = calcWidthScroll();
  function bindModal(modalWindowSelector, btnOpenModalSelector, btnCloseModal) {
    const btnOrder = document.querySelectorAll(btnOpenModalSelector),
      modalDesign = document.querySelector(modalWindowSelector),
      modalClose = document.querySelector(btnCloseModal);
    btnOrder.forEach(btn => {
      btn.addEventListener('click', () => {
        modalDesign.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scrollWidth}px`;
      });
    });
    modalClose.addEventListener('click', () => {
      modalDesign.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.marginRight = `0px`;
    });
    modalDesign.addEventListener('click', e => {
      let target = e.target;
      if (target && target.classList.contains(modalWindowSelector.replace(/\./, ""))) {
        modalDesign.style.display = 'none';
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
  openModalByTime('.popup-consultation', 5000);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);

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

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  (0,_modules_modals__WEBPACK_IMPORTED_MODULE_0__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map