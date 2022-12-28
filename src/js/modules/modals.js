const modals = () => {

  let scrollWidth = calcWidthScroll(),
    btnCount = 0;

  function bindModal(modalWindowSelector, btnOpenModalSelector, btnCloseModal, destroy = false) {
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

    modal.addEventListener('click', (e) => {
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
      if (!btnCount && (document.body.offsetHeight <= window.pageYOffset + document.documentElement.clientHeight)) {
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

export default modals;