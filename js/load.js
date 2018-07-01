'use strict';
(function () { // функция приема и отправки данных. Передаем GET, на отправку передаем Post
  window.load = function (url, data, method, onSucces, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json'; // в каком формате будут приходить данные
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSucces(xhr.response);
      } else {
        onError('Ошибка! Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соеденения');
    });
    xhr.timeout = 10000;
    xhr.open(method, url);
    xhr.send(data);
  };
})();
