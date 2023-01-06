const showPicture = (selectorImg) => {
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

export default showPicture;