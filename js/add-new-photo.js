'use strict';
(function () {
  var EFFECTS_CLASSES = ['effects__preview--heat', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos'];
  var MAX_FILTER_VALUE = 1;
  var ESC_KEY_CODE = 27;
  var SCALE_STEP = 0.25;
  var MAX_SCALE_VALUE = 1;

  // показывает окно для добавления нового фото !!!
  var addChangeHandlerToShowNewPhotoForm = function () {
    var imgUploadElement = document.querySelector('#upload-file');
    var imgUploadOverlay = document.querySelector('.img-upload__overlay');
    imgUploadElement.addEventListener('change', function () {
      imgUploadOverlay.classList.remove('hidden');
      closeImgUpLoadKeydown();
    });
  };

  // функция закрытия окна на при нажатии на отправить, при этом нужно сбросить все настройки из памяти
  // например масштаб или эфеект
  var closeAfterSave = function () {
    var imgUploadElement = document.querySelector('#upload-file');
    var imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
    imgUploadOverlayElement.classList.add('hidden');
    imgUploadElement.value = '';
    var imgUploadPreviewElement = document.querySelector('.img-upload__preview');
    imgUploadClassListRemove(imgUploadPreviewElement);
    var scaleElement = document.querySelector('.img-upload__scale');
    scaleElement.classList.add('hidden');
    var uploadPreviewElement = document.querySelector('.img-upload__preview');
    var reasizeControlValueElement = document.querySelector('.resize__control--value');
    uploadPreviewElement.style.transform = 'scale(1)';
    reasizeControlValueElement.value = '100%';
    var textHashtagsElement = document.querySelector('.text__hashtags');
    var textDescriptionElement = document.querySelector('.text__description');
    textHashtagsElement.value = '';
    textDescriptionElement.value = '';
    imgUploadPreviewElement.style.filter = '';
    document.removeEventListener('keydown', closeImgUpLoadByEsc);
  };

  // закрытие окна с добавлением нового фото
  var closeImgUpLoad = function () {
    var impUpLoadCanselElement = document.querySelector('.img-upload__cancel.cancel');
    impUpLoadCanselElement.addEventListener('click', function () {
      closeAfterSave();
    });
  };

  // функция отправки формы измененной фотографии на север
  var sendNewPhoto = function () {
    var photoFormElement = document.querySelector('.img-upload__form');
    photoFormElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      var formData = new FormData(photoFormElement);
      window.backend.save(formData, function () {
        closeAfterSave();
      }, function (error) {
        var element = document.createElement('element');
        element.textContent = error;
        var impUploadTextElement = document.querySelector('.img-upload__text');
        impUploadTextElement.appendChild(element);
      });
    });
  };

  // удаляю все эфекты (потому что нужно все убрать, а потом один добавить)
  var imgUploadClassListRemove = function (imgUploadPreviewElement) {
    for (var i = 0; i < EFFECTS_CLASSES.length; i++) {
      imgUploadPreviewElement.classList.remove(EFFECTS_CLASSES[i]);
    }
  };

  // при нажатии на выбор эфекта, я сначала удаляю все эффекты, а потом добавляю один
  var addEffectEventHandler = function (effect, effectsPreview, imgUploadPreviewElement) {
    var effectStyleElement = document.querySelector(effect);
    effectStyleElement.addEventListener('click', function () {
      imgUploadClassListRemove(imgUploadPreviewElement);
      imgUploadPreviewElement.classList.add(effectsPreview);
      var scaleElement = document.querySelector('.img-upload__scale');
      scaleElement.classList.remove('hidden');
      window.changeFilter(MAX_FILTER_VALUE);
      window.movePinOnMax();
    });
  };

  // добавляю эфект превью на один по клику
  var addEffects = function () {
    var imgUploadPreviewElement = document.querySelector('.img-upload__preview');
    addEffectEventHandler('#effect-chrome', 'effects__preview--chrome', imgUploadPreviewElement);
    addEffectEventHandler('#effect-sepia', 'effects__preview--sepia', imgUploadPreviewElement);
    addEffectEventHandler('#effect-marvin', 'effects__preview--marvin', imgUploadPreviewElement);
    addEffectEventHandler('#effect-phobos', 'effects__preview--phobos', imgUploadPreviewElement);
    addEffectEventHandler('#effect-heat', 'effects__preview--heat', imgUploadPreviewElement);
    var effectNoneElement = document.querySelector('#effect-none');
    effectNoneElement.addEventListener('click', function () {
      imgUploadClassListRemove(imgUploadPreviewElement);
      imgUploadPreviewElement.style.filter = '';
    });
  };

  // на эфекте none слайдера быть не должно
  var showAndHideSlider = function () {
    var effectNoneElement = document.querySelector('#effect-none');
    var scaleElement = document.querySelector('.img-upload__scale');
    scaleElement.classList.add('hidden');
    effectNoneElement.addEventListener('click', function () {
      scaleElement.classList.add('hidden');
    });
  };

  // закрытие окна если хеш-тег активен, то по esc окно не закрывается
  var closeImgUpLoadKeydown = function () {
    document.addEventListener('keydown', closeImgUpLoadByEsc);
  };

  var closeImgUpLoadByEsc = function (evt) {
    var imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
    var isHashTags = evt.target.classList.contains('text__hashtags');
    var isTextDescription = (evt.target.classList.contains('text__description'));
    if ((evt.keyCode === ESC_KEY_CODE) && !(isHashTags) && !(isTextDescription)) {
      imgUploadOverlayElement.classList.add('hidden');
    }
  };

  // добавляю приближение и удаление фото
  var addPlusAndMinusEventListener = function () {
    var controlMinusElement = document.querySelector('.resize__control--minus');
    var controlPlusElement = document.querySelector('.resize__control--plus');
    var uploadPreviewElement = document.querySelector('.img-upload__preview');
    var reasizeControlValueElement = document.querySelector('.resize__control--value');
    reasizeControlValueElement.value = '100%';
    var scale = MAX_SCALE_VALUE;
    controlMinusElement.addEventListener('click', function () {
      scale = Math.max(SCALE_STEP, scale - SCALE_STEP);
      uploadPreviewElement.style.transform = 'scale(' + scale + ')';
      reasizeControlValueElement.value = scale * 100 + '%';
    });
    controlPlusElement.addEventListener('click', function () {
      scale = Math.min(MAX_SCALE_VALUE, scale + SCALE_STEP);
      uploadPreviewElement.style.transform = 'scale(' + scale + ')';
      reasizeControlValueElement.value = scale * 100 + '%';
    });
  };

  window.addNewPhoto = function () {
    addChangeHandlerToShowNewPhotoForm();
    closeImgUpLoad();
    addEffects();
    showAndHideSlider();
    sendNewPhoto();
    addPlusAndMinusEventListener();
  };
})();


