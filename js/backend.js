'use strict';
(function () {
  window.backend = {};
  window.backend.load = function (onLoad, onError) { // прием данных
    window.load('https://js.dump.academy/kekstagram/data', undefined, 'GET', onLoad, onError);
  };
  window.backend.save = function (data, onLoad, onError) { // отправка данных
    window.load('https://js.dump.academy/kekstagram', data, 'POST', onLoad, onError);
  };
})();

