'use strict';

(function () {
  function movePin() {
    var MIN_PIN_Y = 150;
    var MAX_PIN_Y = 500;
    var mapPinMain = document.querySelector('.map__pin--main');
    var address = document.querySelector('input[name=address]');
    var map = document.querySelector('.map');

    mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.pageX,
        y: evt.pageY
      };
      var pinStartCoords = {
        x: mapPinMain.offsetLeft,
        y: mapPinMain.offsetTop
      };

      function onMapTokyoMousemove(moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.pageX,
          y: startCoords.y - moveEvt.pageY
        };
        var pinCoords = {
          x: pinStartCoords.x - shift.x,
          y: pinStartCoords.y - shift.y
        };

        if (pinCoords.x < 0) {
          pinCoords.x = 0;
        } else if (pinCoords.x > map.clientWidth) {
          pinCoords.x = map.clientWidth;
        }

        if (pinCoords.y < MIN_PIN_Y) {
          pinCoords.y = MIN_PIN_Y;
        } else if (pinCoords.y > MAX_PIN_Y) {
          pinCoords.y = MAX_PIN_Y;
        }

        mapPinMain.style.top = pinCoords.y + 'px';
        mapPinMain.style.left = pinCoords.x + 'px';
        address.value = pinCoords.x + ', ' + pinCoords.y;
      }

      function onMapTokyoMouseup(upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMapTokyoMousemove);
        document.removeEventListener('mouseup', onMapTokyoMouseup);
      }

      document.addEventListener('mousemove', onMapTokyoMousemove);
      document.addEventListener('mouseup', onMapTokyoMouseup);
    });
  }

  window.pinMove = {
    movePin: movePin
  };
})();
