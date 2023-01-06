import postData from "../services/requests";

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
    price = Math.ceil(((+size) * (+material) + (+options)) * promocode);
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

export default calc;