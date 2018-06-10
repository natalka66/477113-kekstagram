var COMMENTS_FOR_FOTO = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var createArray = function() {
  var array = [];
  for (var i = 0; i < 25; i++){
    array[i] = {
      url: createUrl(i + 1),
      likes: createLikes(),
      comment: createComments(COMMENTS_FOR_FOTO),
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
  for (var i = 15; i < 256; i++) {
    var likes = randomNumber(i);
  }
  return likes;
};

var createComments = function(array) {
  var numberOfStrings = randomNumber(2) + 1;
  if (numberOfStrings === 1) {
    var stringComents = array[randomNumber(array.length)];
  } else {
    var stringComents = array[randomNumber(array.length)] + ' ' + array[randomNumber(array.length)];
  }
  return stringComents;
};

var createDescription = function(array) {
  var stringDescription = array[randomNumber(array.length)];
  return stringDescription;
};

var randomNumber = function(i) {
  number = Math.floor(Math.random() * i);
  return number;
};


