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

export default slider;