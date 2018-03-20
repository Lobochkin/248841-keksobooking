'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var TIME_DELAY = 10000;
  var SUCCESS_LOAD = 200;

  window.load = function (onLoad, onError) {
    var xhr = handlingLoad(onLoad, onError);

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIME_DELAY; // 10s
    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  window.upload = function (data, onLoad, onError) {
    var xhr = handlingLoad(onLoad, onError);

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  function handlingLoad(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_LOAD) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    return xhr;
  }

})();
