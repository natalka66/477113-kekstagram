'use strict';
(function () {

  // работа с пином. Начало.
  // проверяем какой эфект активен и меняем эффект, в зависимости от того, в чем он "измеряетя"
  var changeFilter = function (percent) {
    var effectPueview = document.querySelector('.img-upload__preview');
    if (effectPueview.classList.contains('effects__preview--chrome')) {
      effectPueview.style.filter = 'grayscale(' + percent + ')';
    } else if (effectPueview.classList.contains('effects__preview--sepia')) {
      effectPueview.style.filter = 'sepia(' + percent + ')';
    } else if (effectPueview.classList.contains('effects__preview--marvin')) {
      effectPueview.style.filter = 'invert(' + percent * 100 + '%)';
    } else if (effectPueview.classList.contains('effects__preview--phobos')) {
      effectPueview.style.filter = 'blur(' + percent * 3 + 'px)';
    } else if (effectPueview.classList.contains('effects__preview--heat')) {
      effectPueview.style.filter = 'brightness(' + ((percent * 2) + 1) + ')';
    }
  };

  // движение пина
  var movePin = function () {
    var scalePin = document.querySelector('.scale__pin');
    scalePin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoords = {
        x: evt.clientX
      };
      var onMouseMove = function (moveEvt) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
        };
        startCoords = {
          x: moveEvt.clientX,
        };
        // находим пределы передвижения пина
        var findMaxAndMinX = function () {
          var scaleLine = document.querySelector('.scale__line');
          var coordXMin = scaleLine.getBoundingClientRect();
          var minX = coordXMin.x;
          var maxX = coordXMin.x + coordXMin.width;
          return {minX: minX, maxX: maxX};
        };
        // проверяем, чтобы пин был в нужных нам пределах, если да, то обновляем
        var minAndMaxX = findMaxAndMinX();
        if ((startCoords.x > minAndMaxX.minX) && (startCoords.x < minAndMaxX.maxX)) {
          scalePin.style.left = (scalePin.offsetLeft - shift.x) + 'px';
          var percent = ((startCoords.x - minAndMaxX.minX) / (minAndMaxX.maxX - minAndMaxX.minX));
          changeFilter(percent);
          var scaleLevel = document.querySelector('.scale__level');
          scaleLevel.style.width = ('' + percent * 100 + '%'); // красим желтую
        }
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


  window.changeFiltrAndMovePin = function () {
    movePin();
  };
})();
