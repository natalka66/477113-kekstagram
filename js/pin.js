'use strict';
(function () {
  window.pin = {};

  // работа с пином. Начало.
  // проверяем какой эфект активен и меняем эффект, в зависимости от того, в чем он "измеряетя"
  window.pin.changeFilter = function (percent) {
    var effectPreviewElement = document.querySelector('.img-upload__preview');

    var effectClass = effectPreviewElement.className.split(' ').filter(function (className) {
      return className !== 'img-upload__preview';
    })[0];

    if (effectClass) {
      var conditions = {
        'effects__preview--chrome': 'grayscale(' + percent + ')',
        'effects__preview--sepia': 'sepia(' + percent + ')',
        'effects__preview--marvin': 'invert(' + percent * 100 + '%)',
        'effects__preview--phobos': 'blur(' + percent * 3 + 'px)',
        'effects__preview--heat': 'brightness(' + ((percent * 2) + 1) + ')'
      };
      effectPreviewElement.style.filter = conditions[effectClass];
    }
  };

  // находим пределы передвижения пина
  var findMaxAndMinX = function () {
    var scaleLineElement = document.querySelector('.scale__line');
    var coordXMin = scaleLineElement.getBoundingClientRect();
    var minX = coordXMin.x;
    var maxX = coordXMin.x + coordXMin.width;
    return {minX: minX, maxX: maxX};
  };

  // проверяем, чтобы пин был в нужных нам пределах, если да, то обновляем
  var checkMinAndMaxPin = function (startCoords, scalePin) {
    var minAndMaxX = findMaxAndMinX();
    if ((startCoords.x > minAndMaxX.minX) && (startCoords.x <= minAndMaxX.maxX)) {
      scalePin.style.left = (startCoords.x - minAndMaxX.minX) + 'px';
      var percent = ((startCoords.x - minAndMaxX.minX) / (minAndMaxX.maxX - minAndMaxX.minX));
      window.pin.changeFilter(percent);
      var scaleLevelElement = document.querySelector('.scale__level');
      scaleLevelElement.style.width = ('' + percent * 100 + '%'); // красим желтую
      var scaleValueElement = document.querySelector('.scale__value');
      scaleValueElement.value = percent * 100;
    }
  };

  // cтановление пина в крайнюю точку 100%
  window.pin.movePinOnMax = function () {
    var minAndMax = findMaxAndMinX();
    var maxX = {x: minAndMax.maxX};
    var scalePinElement = document.querySelector('.scale__pin');
    checkMinAndMaxPin(maxX, scalePinElement);
  };

  // движение пина
  var movePin = function () {
    var scalePinElement = document.querySelector('.scale__pin');
    scalePinElement.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX
      };
      var onMouseMove = function (moveEvt) {
        startCoords = {
          x: moveEvt.clientX,
        };
        checkMinAndMaxPin(startCoords, scalePinElement);
      };
      // удаляю все обработчики событий
      var mouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', mouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', mouseUp);
    });
  };


  window.pin.changeFilterAndMovePin = function () {
    movePin();
  };
})();
