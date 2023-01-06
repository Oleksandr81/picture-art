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

export default showMoreStyles;