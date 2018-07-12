'use strict';
(function () { // функция приема и отправки данных. Передаем GET, на отправку передаем Post
  var SUCCESSFUL_HTTP_CODE = 200;
  var HTTP_TIMEOUT = 10000;
  window.load = function (url, data, method, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json'; // в каком формате будут приходить данные
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESSFUL_HTTP_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Ошибка! Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соеденения');
    });
    xhr.timeout = HTTP_TIMEOUT;
    xhr.open(method, url);
    xhr.send(data);
  };
})();
