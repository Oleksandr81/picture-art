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
    item.addEventListener('submit', (e) => {
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

      postData(api, formData)
        .then(res => {
          console.log(res);
          statusMessImg.setAttribute('src', message.ok);
          textMessage.textContent = message.success;
        })
        .catch(() => {
          statusMessImg.setAttribute('src', message.fail);
          textMessage.textContent = message.error;
        })
        .finally(() => {
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

export default forms;