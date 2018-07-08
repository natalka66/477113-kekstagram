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

  // функция закрытия окна на при нажатии на отправить, при этом нужно сбросить все настройки из памяти
  // например масштаб или эфеект
  var closeAfterSave = function () {
    var imgUpload = document.querySelector('#upload-file');
    var imgUploadOverlay = document.querySelector('.img-upload__overlay');
    imgUploadOverlay.classList.add('hidden');
    imgUpload.value = '';
    var imgUploadPreview = document.querySelector('.img-upload__preview');
    imgUploadClassListRemove(imgUploadPreview);
    var scale = document.querySelector('.img-upload__scale');
    scale.classList.add('hidden');
    var uploadPreview = document.querySelector('.img-upload__preview');
    var reasizeControlValue = document.querySelector('.resize__control--value');
    uploadPreview.style.transform = 'scale(1)';
    reasizeControlValue.value = '100%';
    var textHashtags = document.querySelector('.text__hashtags');
    var textDescription = document.querySelector('.text__description');
    textHashtags.value = '';
    textDescription.value = '';
    imgUploadPreview.style.filter = '';
  };

  // закрытие окна с добавлением нового фото
  var closeImgUpLoad = function () {
    var impUpLoadCansel = document.querySelector('.img-upload__cancel.cancel');
    impUpLoadCansel.addEventListener('click', function () {
      closeAfterSave();
    });
  };

  // функция отправки формы измененной фотографии на север
  var sendNewPhoto = function () {
    var photoForm = document.querySelector('.img-upload__form');
    photoForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      var formData = new FormData(photoForm);
      window.backend.save(formData, function () {
        closeAfterSave();
      }, function (error) {
        var element = document.createElement('element');
        element.textContent = error;
        var impUploadText = document.querySelector('.img-upload__text');
        impUploadText.appendChild(element);
      });
    });
  };

  // удаляю все эфекты (потому что нужно все убрать, а потом один добавить)
  var imgUploadClassListRemove = function (imgUploadPreview) {
    var effects = ['effects__preview--heat', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos'];
    for (var i = 0; i < effects.length; i++) {
      imgUploadPreview.classList.remove(effects[i]);
    }
  };

  // при нажатии на выбор эфекта, я сначала удаляю все эффекты, а потом добавляю один
  var addEffectEventHandler = function (effect, effectsPreview, imgUploadPreview) {
    var effectStyle = document.querySelector(effect);
    effectStyle.addEventListener('click', function () {
      imgUploadClassListRemove(imgUploadPreview);
      imgUploadPreview.classList.add(effectsPreview);
      var scale = document.querySelector('.img-upload__scale');
      scale.classList.remove('hidden');
      window.changeFilter(1);
      window.movePinOnMax();
    });
  };

  // добавляю эфект превью на один по клику
  var addEffects = function () {
    var imgUploadPreview = document.querySelector('.img-upload__preview');
    addEffectEventHandler('#effect-chrome', 'effects__preview--chrome', imgUploadPreview);
    addEffectEventHandler('#effect-sepia', 'effects__preview--sepia', imgUploadPreview);
    addEffectEventHandler('#effect-marvin', 'effects__preview--marvin', imgUploadPreview);
    addEffectEventHandler('#effect-phobos', 'effects__preview--phobos', imgUploadPreview);
    addEffectEventHandler('#effect-heat', 'effects__preview--heat', imgUploadPreview);
    var effectNone = document.querySelector('#effect-none');
    effectNone.addEventListener('click', function () {
      imgUploadClassListRemove(imgUploadPreview);
      imgUploadPreview.style.filter = '';
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

  // добавляю приближение и удаление фото
  var addPlusAndMinusEventListener = function () {
    var controlMinus = document.querySelector('.resize__control--minus');
    var controlPlus = document.querySelector('.resize__control--plus');
    var uploadPreview = document.querySelector('.img-upload__preview');
    var reasizeControlValue = document.querySelector('.resize__control--value');
    reasizeControlValue.value = '100%';
    var scale = 1;
    controlMinus.addEventListener('click', function () {
      scale = Math.max(0.25, scale - 0.25);
      uploadPreview.style.transform = 'scale(' + scale + ')';
      reasizeControlValue.value = scale * 100 + '%';
    });
    controlPlus.addEventListener('click', function () {
      scale = Math.min(1, scale + 0.25);
      uploadPreview.style.transform = 'scale(' + scale + ')';
      reasizeControlValue.value = scale * 100 + '%';
    });
  };

  window.addNewPhoto = function () {
    var imgUploadOverlay = document.querySelector('.img-upload__overlay');
    addChangeHandlerToShowNewPhotoForm();
    closeImgUpLoad();
    addEffects();
    closeImgUpLoadKeydown(imgUploadOverlay);
    showAndHideSlider();
    sendNewPhoto();
    addPlusAndMinusEventListener();
  };
})();


