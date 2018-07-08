'use strict';
(function () {
  window.backend = {};
  window.backend.load = function (onLoad, onError) { // прием данных
    window.load('https://js.dump.academy/kekstagram/data', undefined, 'GET', function (text) {
      onLoad(text);
    }, function (error) {
      onError(error);
    });
  };
  window.backend.save = function (data, onLoad, onError) { // отправка данных
    window.load('https://js.dump.academy/kekstagram', data, 'POST', function (text) {
      onLoad(text);
    }, function (error) {
      onError(error);
    });
  };
})();

