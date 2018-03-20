'use strict';

(function () {
  var NUMBER_SELECT = 4;
  var MIN_PRICE_HOUSING = {
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000
  };
  var ROOMS_AND_PEOPLE = [
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [1, 1, 1, 0]
  ];
  var ROOMS = {
    100: 0,
    1: 1,
    2: 2,
    3: 3
  };
  var selectionHousing = document.querySelector('select[name=type]');
  var housingPrice = document.querySelector('input[name=price]');
  var timein = document.querySelector('select[name=timein]');
  var timeout = document.querySelector('select[name=timeout]');
  var roomNumber = document.querySelector('select[name=rooms]');
  var capacity = document.querySelector('select[name=capacity]');

  function onSelectionHousingChange(evt) {
    housingPrice.min = MIN_PRICE_HOUSING[evt.target.value];
  }

  function onTimeinChange(evt) {
    timeout.value = evt.target.value;
  }

  function onTimeoutChange(evt) {
    timein.value = evt.target.value;
  }

  function onRoomNumberChange(evt) {
    for (var i = 0; i < NUMBER_SELECT; i++) {
      if (capacity.children[i].hasAttribute('disabled')) {
        capacity.children[i].removeAttribute('disabled');
      }
    }
    capacity.value = ROOMS[evt.target.value];

    for (var j = 0; j < NUMBER_SELECT; j++) {
      if (ROOMS_AND_PEOPLE[ROOMS[evt.target.value]][j] === 0) {
        capacity.children[j].setAttribute('disabled', 'disabled');
      }
    }
  }

  roomNumber.addEventListener('change', onRoomNumberChange);
  selectionHousing.addEventListener('change', onSelectionHousingChange);
  timein.addEventListener('change', onTimeinChange);
  timeout.addEventListener('change', onTimeoutChange);
})();
