'use strict';
(function () {

  var MIN_AVATAR_VALUE = 1;
  var MAX_AVATAR_VALUE = 6;
  var AVATAR_SIZE = 35;
  var MAX_NUMBER_OF_COMMENTS = 5;
  var ESC_KEY_CODE = 27;
  var MAX_NUMBER_OF_NEW_PHOTOS = 10;

  // функция возвращает случайное значение
  var getRandomNumber = function (i) {
    var number = Math.floor(Math.random() * i);
    return number;
  };

  // показывает маленькие картинки вокруг надписи кексограм
  var showThumbnails = function (pictures) {
    var pictureLinkElements = document.querySelectorAll('.picture__link');
    for (var j = 0; j < pictureLinkElements.length; j++) { // удаляем предыдущие фото
      pictureLinkElements[j].parentElement.removeChild(pictureLinkElements[j]);
    }
    var templatePictureElement = document.querySelector('#picture').content.querySelector('.picture__link');
    var picturesContainerElement = document.querySelector('.pictures');
    for (var i = 0; i < pictures.length; i++) {
      var pictureElement = templatePictureElement.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = pictures[i].url;
      pictureElement.querySelector('.picture__stat--likes').textContent = pictures[i].likes;
      pictureElement.querySelector('.picture__stat--comments').textContent = pictures[i].comments.length;
      var fragment = document.createDocumentFragment();
      fragment.appendChild(pictureElement);
      picturesContainerElement.appendChild(fragment);
    }
  };

  // показывает картинку ближе при нажатии на нее
  var showBigPicture = function (picture, bigPictureElement) {
    var parentElement = bigPictureElement.parentElement;
    parentElement.removeChild(bigPictureElement);
    bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
    createAllComments(picture.comments, bigPictureElement);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(bigPictureElement);
    parentElement.appendChild(fragment);
    document.body.classList.add('modal-open');
    addClosePictureEventHandler();
  };

  // удаляет класс для показа картинки покрупнее
  var showBigPicturePopUp = function (bigPictureElement) {
    bigPictureElement.classList.remove('hidden');
  };

  // добавляет один коментарий с фото(случайным образом) и текстом, который я передам
  var createOneCommentElement = function (text, bigPictureElement) {
    var li = document.createElement('li');
    li.classList.add('social__comment');
    li.classList.add('social__comment--text');
    var socialCommentsElement = bigPictureElement.querySelector('.social__comments');
    socialCommentsElement.appendChild(li);
    var img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = 'img/avatar-' + ((getRandomNumber(MAX_AVATAR_VALUE)) + MIN_AVATAR_VALUE) + '.svg';
    img.alt = 'Аватар комментатора фотографии';
    img.width = AVATAR_SIZE;
    img.height = AVATAR_SIZE;
    li.appendChild(img);
    var span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);
  };

  // цикл создает коментарии. Используем в другой функции, при нажатии на картинку и приближении ее
  // в цикле ограничитель, не более 5 коментариев
  var createAllComments = function (comments, bigPictureElement) {
    for (var i = 0; i < Math.min(comments.length, MAX_NUMBER_OF_COMMENTS); i++) {
      createOneCommentElement(comments[i], bigPictureElement);
    }
  };

  // скрываю количество коментариев и надпись "закрузить еще"
  var removeCountComments = function () {
    var socialComentCountElement = document.querySelector('.social__comment-count');
    socialComentCountElement.classList.add('visually-hidden');
    var socialLoadmoreElement = document.querySelector('.social__loadmore');
    socialLoadmoreElement.classList.add('visually-hidden');
  };

  // по клику покайзывется картинка т.е. навешивается обработчик
  var addClickHandlerToShowBigPicture = function (picturesLinksElements, i, bigPictureElement, pictures) {
    picturesLinksElements[i].addEventListener('click', function () {
      showBigPicturePopUp(bigPictureElement);
      showBigPicture(pictures[i], bigPictureElement);
    });
  };

  // маленькие картинки перебирает в цикле и передаются для навешивания в обработчик
  var addClickHandlerToShowBigPopUp = function (pictures, bigPictureElement) {
    var picturesLinksElements = document.querySelectorAll('.picture__link');
    for (var i = 0; i < picturesLinksElements.length; i++) {
      addClickHandlerToShowBigPicture(picturesLinksElements, i, bigPictureElement, pictures);
    }
  };

  // добавляю класс хиден и картинка скроется
  // удаляем старые коментарии у фото
  var hideBigPicturePopUp = function (bigPictureElement) {
    bigPictureElement.classList.add('hidden');
    var socialCommentElements = document.querySelectorAll('.social__comment');
    for (var i = 0; i < socialCommentElements.length; i++) {
      socialCommentElements[i].parentElement.removeChild(socialCommentElements[i]);
    }
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', closePictureByEsc);
  };

  // добавляется обратчик и вызываю функцию для закрытия картинки
  var closePictureLinks = function (bigPictureElement, bigPictureCancelElement) {
    bigPictureCancelElement.addEventListener('click', function () {
      hideBigPicturePopUp(bigPictureElement);
    });
  };

  // закрытие окна при нажатии клавиши esc
  var addClosePictureEventHandler = function () {
    document.addEventListener('keydown', closePictureByEsc);
  };

  var closePictureByEsc = function (evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      var bigPictureElement = document.querySelector('.big-picture');
      bigPictureElement.classList.add('hidden');
    }
  };

  // после завершения загрузки фото с сервера
  var addClassFilter = function () {
    var imgFiltersElement = document.querySelector('.img-filters');
    imgFiltersElement.classList.remove('img-filters--inactive');
  };
  // функция показывает, что кнопка активна. Выделяется белым.
  var removeActiveFilter = function (activeButton) {
    var filterDiscussedElement = document.querySelector('#filter-discussed');
    var filterNewElement = document.querySelector('#filter-new');
    var filterPopularElement = document.querySelector('#filter-popular');
    filterDiscussedElement.classList.remove('img-filters__button--active');
    filterNewElement.classList.remove('img-filters__button--active');
    filterPopularElement.classList.remove('img-filters__button--active');
    activeButton.classList.add('img-filters__button--active');
  };

  // показ популярных фото по кнопке
  var showPopularPhoto = function (originPhoto, bigPictureElement) {
    var filterPopularElement = document.querySelector('#filter-popular');
    filterPopularElement.addEventListener('click', function () {
      window.debounce(function () {
        removeActiveFilter(filterPopularElement);
        var popularPhoto = [].concat(originPhoto);
        showThumbnails(popularPhoto);
        addClickHandlerToShowBigPopUp(popularPhoto, bigPictureElement);
      });
    });
  };

  // показ новых фото по кнопке
  var showNewPhoto = function (originPhoto, bigPictureElement) {
    var filterNewElement = document.querySelector('#filter-new');
    var newPhoto = [];
    var originPhotoCopy = [].concat(originPhoto); // делаю копию массива
    for (var i = 0; i < MAX_NUMBER_OF_NEW_PHOTOS; i++) {
      var randomI = getRandomNumber(originPhotoCopy.length);
      newPhoto.push(originPhotoCopy[randomI]);
      originPhotoCopy.splice(randomI, 1);
    }
    filterNewElement.addEventListener('click', function () {
      window.debounce(function () {
        removeActiveFilter(filterNewElement);
        showThumbnails(newPhoto);
        addClickHandlerToShowBigPopUp(newPhoto, bigPictureElement);
      });
    });
  };

  // показ фото по популярности, сортируем по количеству коментариев
  var showPhotoMaxToMinComents = function (originPhoto, bigPictureElement) {
    var filterDiscussedElement = document.querySelector('#filter-discussed');
    var photoSortedByDiscussed = [].concat(originPhoto);
    photoSortedByDiscussed.sort(function (photo1, photo2) {
      return photo2.comments.length - photo1.comments.length;
    });
    filterDiscussedElement.addEventListener('click', function () {
      window.debounce(function () {
        removeActiveFilter(filterDiscussedElement);
        showThumbnails(photoSortedByDiscussed);
        addClickHandlerToShowBigPopUp(photoSortedByDiscussed, bigPictureElement);
      });
    });
  };

  window.initializeThumbnailsAndPopup = function () {
    window.backend.load(function (originPhoto) {
      var bigPictureElement = document.querySelector('.big-picture');
      var bigPictureCancelElement = document.querySelector('.big-picture__cancel.cancel');
      showThumbnails(originPhoto);
      removeCountComments();
      closePictureLinks(bigPictureElement, bigPictureCancelElement);
      addClickHandlerToShowBigPopUp(originPhoto, bigPictureElement);
      addClassFilter();
      showPopularPhoto(originPhoto, bigPictureElement);
      showNewPhoto(originPhoto, bigPictureElement);
      showPhotoMaxToMinComents(originPhoto, bigPictureElement);
    }, function (error) {
      var pictureContainerElement = document.querySelector('.pictures.container');
      var element = document.createElement('div');
      element.textContent = error;
      pictureContainerElement.appendChild(element);
    });
  };
})();

