const accorgion = (blockSelector, btnSelector) => {
  const accordionBlock = document.querySelectorAll(blockSelector),
    btn = document.querySelectorAll(btnSelector);

  accordionBlock.forEach(item => {
    item.style.display = 'none';
    item.classList.add('close');
  });

  btn.forEach(item => {
    item.addEventListener('click', (e) => {
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

export default accorgion;