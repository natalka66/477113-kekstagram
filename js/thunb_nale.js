'use strict';
(function () {

  // функция возвращает случайное значение
  var randomNumber = function (i) {
    var number = Math.floor(Math.random() * i);
    return number;
  };

  // показывает маленькие картинки вокруг надписи кексограм
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

  // показывает картинку ближе при нажатии на нее
  var showBigPicture = function (picture, bigPictureElement) {
    bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
    createAllComments(picture.comments);
  };

  // удаляет класс для показа картинки покрупнее
  var showBigPicturePopUp = function (bigPictureElement) {
    bigPictureElement.classList.remove('hidden');
  };

  // добавляет один коментарий с фото(случайным образом) и текстом, который я передам
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

  // цикл создает коментарии. Используем в другой функции, при нажатии на картинку и приближении ее
  var createAllComments = function (comments) {
    for (var i = 0; i < comments.length; i++) {
      createOneCommentElement(comments[i]);
    }
  };

  // скрываю количество коментариев и надпись "закрузить еще"
  var removeCountComments = function () {
    var socialComentCount = document.querySelector('.social__comment-count');
    socialComentCount.classList.add('visually-hidden');
    var socialLoadmore = document.querySelector('.social__loadmore');
    socialLoadmore.classList.add('visually-hidden');
  };

  // по клику покайзывется картинка т.е. навешивается обработчик
  var addClickHandlerToShowBigPicture = function (picturesLinks, i, bigPictureElement, picturesArray) {
    picturesLinks[i].addEventListener('click', function () {
      showBigPicturePopUp(bigPictureElement);
      showBigPicture(picturesArray[i], bigPictureElement);
    });
  };

  // маленькие картинки перебирает в цикле и передаются для навешивания в обработчик
  var addClickHandlerToShowBigPopUp = function (picturesArray, bigPictureElement) {
    var picturesLinks = document.querySelectorAll('.picture__link');
    for (var i = 0; i < picturesLinks.length; i++) {
      addClickHandlerToShowBigPicture(picturesLinks, i, bigPictureElement, picturesArray);
    }
  };

  // добавляю класс хиден и картинка скроется
  var hideBigPicturePopUp = function (bigPictureElement) {
    bigPictureElement.classList.add('hidden');
  };

  // добавляется обратчик и вызываю функцию для закрытия картинки
  var closePictureLinks = function (bigPictureElement, bigPictureCancel) {
    bigPictureCancel.addEventListener('click', function () {
      hideBigPicturePopUp(bigPictureElement);
    });
  };

  window.initializeThumbnailsAndPopup = function () {
    window.backend.load(function (text) {
      showThumbnails(text);
      removeCountComments();
      closePictureLinks(bigPictureElement, bigPictureCancel);
      addClickHandlerToShowBigPopUp(text, bigPictureElement);
    }, function (error) {
      var pictureContainer = document.querySelector('.pictures.container');
      var div = document.createElement('div');
      div.textContent = error;
      pictureContainer.appendChild(div);
    });

    var bigPictureElement = document.querySelector('.big-picture');
    var bigPictureCancel = document.querySelector('.big-picture__cancel.cancel');

  };
})();

