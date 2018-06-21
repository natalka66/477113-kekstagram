'use strict';
var COMMENTS_FOR_FOTO = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 200;
var MAX_HASH_TAG_COUNT = 5;
var MAX_LENGTH_HASH_TAG = 20;

var createArray = function () {
  var array = [];
  for (var i = 0; i < 25; i++) {
    array[i] = {
      url: createUrl(i + 1),
      likes: createLikes(),
      comments: createComments(),
      description: createDescription(DESCRIPTION)
    };
  }
  return array;
};

var createUrl = function (i) {
  var stringUrl = 'photos/' + i + '.jpg';
  return stringUrl;
};

var createLikes = function () {
  var likes = (randomNumber(MAX_LIKES_COUNT - MIN_LIKES_COUNT) + MIN_LIKES_COUNT);
  return likes;
};

var createOneComment = function (array) {
  var numberOfStrings = randomNumber(2) + 1;
  var stringComents;
  if (numberOfStrings === 1) {
    stringComents = array[randomNumber(array.length)];
  } else {
    stringComents = array[randomNumber(array.length)] + ' ' + array[randomNumber(array.length)];
  }
  return stringComents;
};

var createComments = function () {
  var array = [];
  for (var i = 0; i < randomNumber(6); i++) {
    array[i] = createOneComment(COMMENTS_FOR_FOTO);
  }
  return array;
};

var createDescription = function (array) {
  var stringDescription = array[randomNumber(array.length)];
  return stringDescription;
};

var randomNumber = function (i) {
  var number = Math.floor(Math.random() * i);
  return number;
};

var showThumbnails = function (picturesArray) {
  var templatePicture = document.querySelector('#picture').content.querySelector('.picture__link');
  var picturesContainer = document.querySelector('.pictures');
  for (var i = 0; i < picturesArray.length; i++) {
    var pictureElement = templatePicture.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picturesArray[i].url;
    pictureElement.querySelector('.picture__stat--likes').textContent = picturesArray[i].likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = picturesArray[i].comments.length;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(pictureElement);
    picturesContainer.appendChild(fragment);
  }
};

var showBigPicture = function (picture, bigPictureElement) {
  bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  createAllComments(picture.comments);
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;
};

var showBigPicturePopUp = function (bigPictureElement) {
  bigPictureElement.classList.remove('hidden');
};

var createOneCommentElement = function (text) {
  var li = document.createElement('li');
  li.classList.add('social__comment');
  li.classList.add('social__comment--text');
  var socialComnents = document.querySelector('.social__comments');
  socialComnents.appendChild(li);
  var img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = 'img/avatar-' + ((randomNumber(6)) + 1) + '.svg';
  img.alt = 'Аватар комментатора фотографии';
  img.width = '35';
  img.height = '35';
  li.appendChild(img);
  var span = document.createElement('span');
  span.textContent = text;
  li.appendChild(span);
};

var createAllComments = function (comments) {
  for (var i = 0; i < comments.length; i++) {
    createOneCommentElement(comments[i]);
  }
};

var removeCountComments = function () {
  var socialComentCount = document.querySelector('.social__comment-count');
  socialComentCount.classList.add('visually-hidden');
  var socialLoadmore = document.querySelector('.social__loadmore');
  socialLoadmore.classList.add('visually-hidden');
};

var addClickHandlerToShowBigPicture = function (picturesLinks, i, bigPictureElement, picturesArray) {
  picturesLinks[i].addEventListener('click', function () {
    showBigPicturePopUp(bigPictureElement);
    showBigPicture(picturesArray[i], bigPictureElement);
  });
};

var addClickHandlerToShowBigPopUp = function (picturesArray, bigPictureElement) {
  var picturesLinks = document.querySelectorAll('.picture__link');
  for (var i = 0; i < picturesLinks.length; i++) {
    addClickHandlerToShowBigPicture(picturesLinks, i, bigPictureElement, picturesArray);
  }
};

var hideBigPicturePopUp = function (bigPictureElement) {
  bigPictureElement.classList.add('hidden');
};

var closePictureLinks = function (bigPictureElement, bigPictureCancel) {
  bigPictureCancel.addEventListener('click', function () {
    hideBigPicturePopUp(bigPictureElement);
  });
};

var addChangeHandlerToShowNewPhotoForm = function () {
  var imgUpload = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  imgUpload.addEventListener('change', function () {
    imgUploadOverlay.classList.remove('hidden');
  });
};

var closeImgUpLoad = function (imgUploadOverlay) {
  var imgUpload = document.querySelector('#upload-file');
  var impUpLoadCansel = document.querySelector('.img-upload__cancel.cancel');
  impUpLoadCansel.addEventListener('click', function () {
    imgUploadOverlay.classList.add('hidden');
    imgUpload.value = '';
  });
};

var imgUploadClassListRemove = function (imgUploadPreview) {
  var effectsArray = ['effects__preview--heat', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos'];
  for (var i = 0; i < effectsArray.length; i++) {
    imgUploadPreview.classList.remove(effectsArray[i]);
  }
};

var addEffectsgetSekectorAndClassList = function (effect, effectsPreview, imgUploadPreview) {
  var effectStile = document.querySelector(effect);
  effectStile.addEventListener('click', function () {
    imgUploadClassListRemove(imgUploadPreview);
    imgUploadPreview.classList.add(effectsPreview);
    var scale = document.querySelector('.img-upload__scale');
    scale.classList.remove('hidden');
  });
};

var addEffects = function () {
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  addEffectsgetSekectorAndClassList('#effect-chrome', 'effects__preview--chrome', imgUploadPreview);
  addEffectsgetSekectorAndClassList('#effect-sepia', 'effects__preview--sepia', imgUploadPreview);
  addEffectsgetSekectorAndClassList('#effect-marvin', 'effects__preview--marvin', imgUploadPreview);
  addEffectsgetSekectorAndClassList('#effect-phobos', 'effects__preview--phobos', imgUploadPreview);
  addEffectsgetSekectorAndClassList('#effect-heat', 'effects__preview--heat', imgUploadPreview);
  var effectNone = document.querySelector('#effect-none');
  effectNone.addEventListener('click', function () {
    imgUploadClassListRemove(imgUploadPreview);
  });
};

var showAndHideSlider = function () {
  var effectNone = document.querySelector('#effect-none');
  var scale = document.querySelector('.img-upload__scale');
  scale.classList.add('hidden');
  effectNone.addEventListener('click', function () {
    scale.classList.add('hidden');
  });
};

var closeImgUpLoadKeydown = function (imgUploadOverlay) {
  document.addEventListener('keydown', function (evt) {
    var isHashTags = evt.target.classList.contains('text__hashtags');
    var isTextDescription = (evt.target.classList.contains('text__description'));
    if ((evt.keyCode === 27) && !(isHashTags) && !(isTextDescription)) {
      imgUploadOverlay.classList.add('hidden');

    }
  });
};

// Валидация форм загрузки. Начало.

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

var checkMistakeStartsOnlyPound = function (hashTagArray, textHashTagsSelector) {
  for (var i = 0; i < hashTagArray.length; i++) {
    var startsFromPound = (hashTagArray[i][0] !== '#');
    if (startsFromPound) {
      textHashTagsSelector.setCustomValidity('Хеш-тег должен начинаться с решетки');
      return;
    }
  }
};

var checkMistakeOnlyPound = function (hashTagArray, textHashTagsSelector) {
  for (var i = 0; i < hashTagArray.length; i++) {
    var onlyPound = (hashTagArray[i] === '#');
    if (onlyPound) {
      textHashTagsSelector.setCustomValidity('Хеш-тег не должен содержать только решетку');
      return;
    }
  }
};

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
var checkMisstakeMaxFiveHashTag = function (hashTagArray, textHashTagsSelector) {
  var count = hashTagArray.length;
  if (count > MAX_HASH_TAG_COUNT) {
    textHashTagsSelector.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  }
};

var checkMistekeMaxCountHashTag = function (hashTagArray, textHashTagsSelector) {
  for (var i = 0; i < hashTagArray.length; i++) {
    if (hashTagArray[i].length > MAX_LENGTH_HASH_TAG) {
      textHashTagsSelector.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
    }
  }
};

// Валидация форм загрузки. Конец.

// работа с пином. Начало.
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
      var findMaxAndMinX = function () {
        var scaleLine = document.querySelector('.scale__line');
        var coordXMin = scaleLine.getBoundingClientRect();
        var minX = coordXMin.x;
        var maxX = coordXMin.x + coordXMin.width;
        return {minX: minX, maxX: maxX};
      };
      var minAndMaxX = findMaxAndMinX();
      if ((startCoords.x > minAndMaxX.minX) && (startCoords.x < minAndMaxX.maxX)) {
        scalePin.style.left = (scalePin.offsetLeft - shift.x) + 'px';
        var percent = ((startCoords.x - minAndMaxX.minX) / (minAndMaxX.maxX - minAndMaxX.minX));
        changeFilter(percent);
        var scaleLevel = document.querySelector('.scale__level');
        scaleLevel.style.width = ('' + percent * 100 + '%');
      }
    };
    var mouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', mouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', mouseUp);
  });
};


var initializePictures = function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var picturesArray = createArray();
  var bigPictureCancel = document.querySelector('.big-picture__cancel.cancel');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var textHashTagsSelector = document.querySelector('.text__hashtags');
  showThumbnails(picturesArray);
  showBigPicture(picturesArray[0], bigPictureElement);
  removeCountComments();
  addChangeHandlerToShowNewPhotoForm();
  closeImgUpLoad(imgUploadOverlay);
  addEffects();
  closePictureLinks(bigPictureElement, bigPictureCancel);
  addClickHandlerToShowBigPopUp(picturesArray, bigPictureElement);
  closeImgUpLoadKeydown(imgUploadOverlay);
  checkHashTag(textHashTagsSelector);
  movePin();
  showAndHideSlider();
};

initializePictures();
