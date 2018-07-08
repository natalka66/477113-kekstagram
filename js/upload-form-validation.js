'use strict';
(function () {

  var MAX_HASH_TAG_COUNT = 5;
  var MAX_LENGTH_HASH_TAG = 20;

  // Валидация форм загрузки. Начало.
  // проверка на ошибки в хеш-тегах
  var checkHashTag = function (textHashTagsElement) {
    textHashTagsElement.addEventListener('input', function () {
      textHashTagsElement.style.borderColor = '';
      textHashTagsElement.setCustomValidity('');
      var hashTags = gethashTags(textHashTagsElement);
      checkMistakeStartsOnlyPound(hashTags, textHashTagsElement);
      checkMistakeOnlyPound(hashTags, textHashTagsElement);
      checkMistakeBetweenHashTagSpace(hashTags, textHashTagsElement);
      checkMistakeUseJustOneHashTag(hashTags, textHashTagsElement);
      checkMisstakeMaxFiveHashTag(hashTags, textHashTagsElement);
      checkMistekeMaxCountHashTag(hashTags, textHashTagsElement);
    });
    textHashTagsElement.addEventListener('invalid', function () {
      textHashTagsElement.style.borderColor = 'red';
    });
  };

  // из input получаю строку с хеш-тегами, из это стрки делаю массив (split), убираю из массива пустые элементы
  // затем все буквы делаю маленькими и возвращаю массив хеш-теогов
  var gethashTags = function (textHashTagsElement) {
    var hashTagsString = textHashTagsElement.value;
    var hashTags = hashTagsString.split(' ');
    hashTags = hashTags.filter(function (element) {
      return element !== '';
    });
    hashTags = hashTags.map(function (element) {
      return element.toLowerCase();
    });
    return hashTags;
  };

  // проверка начинается только с #
  var checkMistakeStartsOnlyPound = function (hashTags, textHashTagsElement) {
    for (var i = 0; i < hashTags.length; i++) {
      var startsFromPound = (hashTags[i][0] !== '#');
      if (startsFromPound) {
        textHashTagsElement.setCustomValidity('Хеш-тег должен начинаться с решетки');
        return;
      }
    }
  };

  // проверка, что не один смвол # в хеш-теге
  var checkMistakeOnlyPound = function (hashTags, textHashTagsElement) {
    for (var i = 0; i < hashTags.length; i++) {
      var onlyPound = (hashTags[i] === '#');
      if (onlyPound) {
        textHashTagsElement.setCustomValidity('Хеш-тег не должен содержать только решетку');
        return;
      }
    }
  };

  // проверка что есть пробелы между хеш-тегом
  var checkMistakeBetweenHashTagSpace = function (hashTags, textHashTagsSelector) {
    for (var i = 0; i < hashTags.length; i++) {
      var hashTag = hashTags[i];
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
  var checkMistakeUseJustOneHashTag = function (hashTags, textHashTagsElement) {
    for (var i = 0; i < hashTags.length; i++) {
      var hashtag1 = hashTags[i];
      for (var j = i; j < hashTags.length; j++) {
        var hashtag2 = hashTags[j];
        if ((hashtag1 === hashtag2) && (i !== j)) {
          textHashTagsElement.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        }
      }
    }
  };

  // Нельзя указать больше пяти хэш-тегов
  var checkMisstakeMaxFiveHashTag = function (hashTags, textHashTagsElement) {
    var count = hashTags.length;
    if (count > MAX_HASH_TAG_COUNT) {
      textHashTagsElement.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    }
  };

  // Максимальная длина одного хэш-тега 20 символов, включая решётку'
  var checkMistekeMaxCountHashTag = function (hashTags, textHashTagsElement) {
    for (var i = 0; i < hashTags.length; i++) {
      if (hashTags[i].length > MAX_LENGTH_HASH_TAG) {
        textHashTagsElement.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      }
    }
  };
  window.uploadFormValidation = function () {
    var textHashTagsElement = document.querySelector('.text__hashtags');
    checkHashTag(textHashTagsElement);
  };
})();
