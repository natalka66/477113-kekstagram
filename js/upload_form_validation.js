'use strict';
(function () {

  var MAX_HASH_TAG_COUNT = 5;
  var MAX_LENGTH_HASH_TAG = 20;

  // Валидация форм загрузки. Начало.
  // проверка на ошибки в хеш-тегах
  var checkHashTag = function (textHashTagsSelector) {
    textHashTagsSelector.addEventListener('input', function () {
      textHashTagsSelector.setCustomValidity('');
      var hashTagArray = getHashTagArray(textHashTagsSelector);
      checkMistakeStartsOnlyPound(hashTagArray, textHashTagsSelector);
      checkMistakeOnlyPound(hashTagArray, textHashTagsSelector);
      checkMistakeBetweenHashTagSpace(hashTagArray, textHashTagsSelector);
      checkMistakeUseJustOneHashTag(hashTagArray, textHashTagsSelector);
      checkMisstakeMaxFiveHashTag(hashTagArray, textHashTagsSelector);
      checkMistekeMaxCountHashTag(hashTagArray, textHashTagsSelector);
    });
  };

  // из input получаю строку с хеш-тегами, из это стрки делаю массив (split), убираю из массива пустые элементы
  // затем все буквы делаю маленькими и возвращаю массив хеш-теогов
  var getHashTagArray = function (textHashTagsSelector) {
    var hashTagsString = textHashTagsSelector.value;
    var hashTagArray = hashTagsString.split(' ');
    hashTagArray = hashTagArray.filter(function (element) {
      return element !== '';
    });
    hashTagArray = hashTagArray.map(function (element) {
      return element.toLowerCase();
    });
    return hashTagArray;
  };

  // проверка начинается только с #
  var checkMistakeStartsOnlyPound = function (hashTagArray, textHashTagsSelector) {
    for (var i = 0; i < hashTagArray.length; i++) {
      var startsFromPound = (hashTagArray[i][0] !== '#');
      if (startsFromPound) {
        textHashTagsSelector.setCustomValidity('Хеш-тег должен начинаться с решетки');
        return;
      }
    }
  };

  // проверка, что не один смвол # в хеш-теге
  var checkMistakeOnlyPound = function (hashTagArray, textHashTagsSelector) {
    for (var i = 0; i < hashTagArray.length; i++) {
      var onlyPound = (hashTagArray[i] === '#');
      if (onlyPound) {
        textHashTagsSelector.setCustomValidity('Хеш-тег не должен содержать только решетку');
        return;
      }
    }
  };

  // проверка что есть пробелы между хеш-тегом
  var checkMistakeBetweenHashTagSpace = function (hashTagArray, textHashTagsSelector) {
    for (var i = 0; i < hashTagArray.length; i++) {
      var hashTag = hashTagArray[i];
      var count = 0;
      for (var j = 0; j < hashTag.length; j++) {
        if (hashTag[j] === '#') {
          count++;
        }
      }
      if (count > 1) {
        textHashTagsSelector.setCustomValidity('Хеш-теги должны разделяться пробелами');
      }
    }
  };

  // Один и тот же хэш-тег не может быть использован дважды
  var checkMistakeUseJustOneHashTag = function (hashTagArray, textHashTagsSelector) {
    for (var i = 0; i < hashTagArray.length; i++) {
      var hashtag1 = hashTagArray[i];
      for (var j = i; j < hashTagArray.length; j++) {
        var hashtag2 = hashTagArray[j];
        if ((hashtag1 === hashtag2) && (i !== j)) {
          textHashTagsSelector.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        }
      }
    }
  };

  // Нельзя указать больше пяти хэш-тегов
  var checkMisstakeMaxFiveHashTag = function (hashTagArray, textHashTagsSelector) {
    var count = hashTagArray.length;
    if (count > MAX_HASH_TAG_COUNT) {
      textHashTagsSelector.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    }
  };

  // Максимальная длина одного хэш-тега 20 символов, включая решётку'
  var checkMistekeMaxCountHashTag = function (hashTagArray, textHashTagsSelector) {
    for (var i = 0; i < hashTagArray.length; i++) {
      if (hashTagArray[i].length > MAX_LENGTH_HASH_TAG) {
        textHashTagsSelector.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      }
    }
  };
  window.uploadFormValidation = function () {
    var textHashTagsSelector = document.querySelector('.text__hashtags');
    checkHashTag(textHashTagsSelector);
  };
})();
