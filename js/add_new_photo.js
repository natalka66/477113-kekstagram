'use strict';
(function () {

  // показывает окно для добавления нового фото !!!
  var addChangeHandlerToShowNewPhotoForm = function () {
    var imgUpload = document.querySelector('#upload-file');
    var imgUploadOverlay = document.querySelector('.img-upload__overlay');
    imgUpload.addEventListener('change', function () {
      imgUploadOverlay.classList.remove('hidden');
    });
  };
  // закрытие окна с добавлением нового фото
  var closeImgUpLoad = function (imgUploadOverlay) {
    var imgUpload = document.querySelector('#upload-file');
    var impUpLoadCansel = document.querySelector('.img-upload__cancel.cancel');
    impUpLoadCansel.addEventListener('click', function () {
      imgUploadOverlay.classList.add('hidden');
      imgUpload.value = '';
    });
  };

  // функция отправки формы измененной фотографии на север
  var sendNewPhoto = function () {
    var photoForm = document.querySelector('.img-upload__form');
    photoForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      var formData = new FormData();
      var inputTextHashtags = document.querySelector('.text__hashtags');
      var textHashtags = inputTextHashtags.value;
      var textAreaTextDescription = document.querySelector('.text__description');
      var textDescription = textAreaTextDescription.value;
      var scaleValue = document.querySelector('.scale__value');
      var percent = scaleValue.value;
      var inputEffectsRadio = document.querySelector('.effects__radio');
      var effectRadio = inputEffectsRadio.value;
      var inputImpUpload = document.querySelector('.img-upload__input');
      var fileName = inputImpUpload.value;
      formData.append('hashtags', textHashtags);
      formData.append('description', textDescription);
      formData.append('scale', percent);
      formData.append('effect', effectRadio);
      formData.append('filename', fileName);
      window.backend.save(formData, function () {
        window.closeImgUpLoad();
      }, function (error) {
        var div = document.createElement('div');
        div.textContent = error;
        var impUploadText = document.querySelector('.img-upload__text');
        impUploadText.appendChild(div);
      });
    });
  };

  // удаляю все эфекты (потому что нужно все убрать, а потом один добавить)
  var imgUploadClassListRemove = function (imgUploadPreview) {
    var effectsArray = ['effects__preview--heat', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos'];
    for (var i = 0; i < effectsArray.length; i++) {
      imgUploadPreview.classList.remove(effectsArray[i]);
    }
  };

  // при нажатии на выбор эфекта, я сначала удаляю все эффекты, а потом добавляю один
  var addEffectsgetSekectorAndClassList = function (effect, effectsPreview, imgUploadPreview) {
    var effectStile = document.querySelector(effect);
    effectStile.addEventListener('click', function () {
      imgUploadClassListRemove(imgUploadPreview);
      imgUploadPreview.classList.add(effectsPreview);
      var scale = document.querySelector('.img-upload__scale');
      scale.classList.remove('hidden');
    });
  };

  // добавляю эфект превью на один по клику
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

  // на эфекте none слайдера быть не должно
  var showAndHideSlider = function () {
    var effectNone = document.querySelector('#effect-none');
    var scale = document.querySelector('.img-upload__scale');
    scale.classList.add('hidden');
    effectNone.addEventListener('click', function () {
      scale.classList.add('hidden');
    });
  };

  // закрытие окна если хеш-тег активен, то по esc окно не закрывается
  var closeImgUpLoadKeydown = function (imgUploadOverlay) {
    document.addEventListener('keydown', function (evt) {
      var isHashTags = evt.target.classList.contains('text__hashtags');
      var isTextDescription = (evt.target.classList.contains('text__description'));
      if ((evt.keyCode === 27) && !(isHashTags) && !(isTextDescription)) {
        imgUploadOverlay.classList.add('hidden');

      }
    });
  };
  window.addNewPhoto = function () {
    var imgUploadOverlay = document.querySelector('.img-upload__overlay');
    addChangeHandlerToShowNewPhotoForm();
    closeImgUpLoad(imgUploadOverlay);
    addEffects();
    closeImgUpLoadKeydown(imgUploadOverlay);
    showAndHideSlider();
    sendNewPhoto();
  };
})();


