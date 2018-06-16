var COMMENTS_FOR_FOTO = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 200;

var createArray = function() {
  var array = [];
  for (var i = 0; i < 25; i++){
    array[i] = {
      url: createUrl(i + 1),
      likes: createLikes(),
      comments: createComments(),
      description: createDescription(DESCRIPTION)
    }
  }
  return array;
};

var createUrl = function(i){
  var stringUrl = 'photos/' + i + '.jpg';
  return stringUrl;
};

var createLikes = function() {
  var likes = (randomNumber(MAX_LIKES_COUNT - MIN_LIKES_COUNT) + MIN_LIKES_COUNT);
  return likes;
};

var createOneComment = function(array) {
  var numberOfStrings = randomNumber(2) + 1;
  if (numberOfStrings === 1) {
    var stringComents = array[randomNumber(array.length)];
  } else {
    var stringComents = array[randomNumber(array.length)] + ' ' + array[randomNumber(array.length)];
  }
  return stringComents;
};

var createComments = function() {
  var array = [];
  for (var i = 0; i < randomNumber(6); i++) {
    array[i] = createOneComment(COMMENTS_FOR_FOTO);
  };
  return array;
};

var createDescription = function(array) {
  var stringDescription = array[randomNumber(array.length)];
  return stringDescription;
};

var randomNumber = function(i) {
  number = Math.floor(Math.random() * i);
  return number;
};

var showThumbnails = function(picturesArray) {
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
  };
};

var showBigPicturePopUp = function () {
  var userElement = document.querySelector('.big-picture');
  userElement.classList.remove('hidden');
};

var showBigPicture = function (picture) {
  var userElement = document.querySelector('.big-picture');
  userElement.querySelector('.big-picture__img img').src = picture.url;
  userElement.querySelector('.likes-count').textContent = picture.likes;
  userElement.querySelector('.comments-count').textContent = picture.comments.length;
  createAllComments(picture.comments);
  userElement.querySelector('.social__caption').textContent = picture.description;
};

var createOneCommentElement = function(text) {
  var li = document.createElement('li');
  li.classList.add('social__comment');
  li.classList.add('social__comment--text');
  var socialComnents = document.querySelector('.social__comments');
  socialComnents.appendChild(li);
  var img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = 'img/avatar-' + ((randomNumber(6))+1) + '.svg';
  img.alt = 'Аватар комментатора фотографии';
  img.width = '35';
  img.height = '35';
  li.appendChild(img);
  var span = document.createElement('span');
  span.textContent = text;
  li.appendChild(span);
};

var createAllComments = function(comments){
  for (var i = 0; i < comments.length; i++) {
    createOneCommentElement(comments[i]);
  };
};

var removeCountComments = function() {
  var socialComentCount = document.querySelector('.social__comment-count');
  socialComentCount.classList.add('visually-hidden');
  var  socialLoadmore = document.querySelector('.social__loadmore');
  socialLoadmore.classList.add('visually-hidden');
};

var addClickHandlerToShowBigPopUp = function (picturesArray) {
  var picturesLinks = document.querySelectorAll('.picture__link');
  for (var i = 0; i < picturesLinks.length; i++) {
    (function (j) {
      picturesLinks[j].addEventListener('click', function () {
        showBigPicturePopUp();
        showBigPicture(picturesArray[j]);
      });
    }(i));
  };
};

var hideBigPicturePopUp = function () {
  var userElement = document.querySelector('.big-picture');
  userElement.classList.add('hidden');
};

var closePictureLinks = function () {
  var bigPictureCansel = document.querySelector('.big-picture__cancel.cancel');
  bigPictureCansel.addEventListener('click', function () {
    hideBigPicturePopUp();
  });
};

var addChangeHandlerToShowNewPhotoForm = function () {
  var imgUpload = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  imgUpload.addEventListener('change', function () {
    imgUploadOverlay.classList.remove('hidden');
  });
}

var closeImgUpLoad = function () {
  var imgUpload = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var impUpLoadCansel = document.querySelector('.img-upload__cancel.cancel');
  impUpLoadCansel.addEventListener('click', function () {
    imgUploadOverlay.classList.add('hidden');
    imgUpload.value = '';
  });
};

// var scalePin = document.querySelector('.scale__pin');
// document.addEventListener('mouseup', function (evt) {
//   var scaleLine = document.querySelector('.scale__line');
//   var scaleLineWidth =  scaleLine.clientWidth;
//   var scaleLineX = scaleLine.getBoundingClientRect().x;
//   var mouseUpX = evt.screenX;
//   var percent = ((mouseUpX-scaleLineX)/scaleLineWidth)*100;
//   console.log(percent);
// })
var imgUploadClassListRemove = function (imgUploadPreviw) {
  imgUploadPreviw.classList.remove('effects__preview--heat');
  imgUploadPreviw.classList.remove('effects__preview--chrome');
  imgUploadPreviw.classList.remove('effects__preview--sepia');
  imgUploadPreviw.classList.remove('effects__preview--marvin');
  imgUploadPreviw.classList.remove('effects__preview--phobos');
};

var addEffects = function () {
  var effectChrome = document.querySelector('#effect-chrome');
  var imgUploadPreviw = document.querySelector('.img-upload__preview');
  effectChrome.addEventListener('click', function () {
    imgUploadClassListRemove(imgUploadPreviw);
    imgUploadPreviw.classList.add('effects__preview--chrome');
  });
  var effectSepia = document.querySelector('#effect-sepia');
  effectSepia.addEventListener('click', function () {
    imgUploadClassListRemove(imgUploadPreviw);
    imgUploadPreviw.classList.add('effects__preview--sepia');
  });
  var effectMarvin = document.querySelector('#effect-marvin');
  effectMarvin.addEventListener('click', function () {
    imgUploadClassListRemove(imgUploadPreviw);
    imgUploadPreviw.classList.add('effects__preview--marvin');
  });
  var effectPhobos = document.querySelector('#effect-phobos');
  effectPhobos.addEventListener('click', function () {
    imgUploadClassListRemove(imgUploadPreviw);
    imgUploadPreviw.classList.add('effects__preview--phobos');
  });
  var effectHeat = document.querySelector('#effect-heat');
  effectHeat.addEventListener('click', function () {
    imgUploadClassListRemove(imgUploadPreviw);
    imgUploadPreviw.classList.add('effects__preview--heat');
  });
  var effectNone = document.querySelector('#effect-none');
  effectNone.addEventListener('click', function () {
    imgUploadClassListRemove(imgUploadPreviw);
  });
};

var initializePictures = function() {
  var picturesArray = createArray();
  showThumbnails(picturesArray);
  showBigPicture(picturesArray[0]);
  removeCountComments();
  addChangeHandlerToShowNewPhotoForm();
  closeImgUpLoad();
  addEffects();
  closePictureLinks();
  addClickHandlerToShowBigPopUp(picturesArray);
  // showBigPicturePopUp();
};


initializePictures();
