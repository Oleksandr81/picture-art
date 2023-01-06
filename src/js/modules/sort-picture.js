const sortPicture = () => {
  const menuContainer = document.querySelector('.portfolio-menu'),
    menuList = menuContainer.querySelectorAll('li'),
    imgBlocks = document.querySelectorAll('.portfolio-block'),
    blockNone = document.querySelector('.portfolio-no');

  let count = 0;

  menuContainer.addEventListener('click', (e) => {
    let target = e.target,
      sortClass = (target.className.split(' ')[0]);

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

export default sortPicture;