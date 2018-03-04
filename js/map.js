'use strict';

(function () {
  var START_PRICE = 1000;
  var NUMBER_ITEMS = 5;

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapPins = document.querySelector('.map__pins');
  var commonTemplate = document.querySelector('template');
  var mapCard = commonTemplate.content.querySelector('.map__card');
  var isCardShown = false;
  var noticeForm = document.querySelector('.notice__form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var address = document.querySelector('input[name=address]');
  var housingPrice = document.querySelector('input[name=price]');
  var typeOfHousing = document.querySelector('select[name=housing-type]');
  var typeOfPrice = document.querySelector('select[name=housing-price]');
  var numberOfRooms = document.querySelector('select[name=housing-rooms]');
  var numberOfGuests = document.querySelector('select[name=housing-guests]');
  var features = document.querySelector('.map__filter-set');
  var arrFeatures = features.querySelectorAll('input');
  var pinsData;

  function onMapPinsClick(evt) {
    window.util.eventPath(evt);
    window.util.eventPath(evt).forEach(function (el) {
      if (el.classList && el.classList.contains('map__pin') && !el.classList.contains('map__pin--main')) {
        window.card.forcedClose();

        var adCard = window.card.createCard(window.pin.filterPinsData(pinsData)[el.dataset.index], mapCard.cloneNode('true'));
        mapFiltersContainer.insertBefore(adCard, mapFiltersContainer.firstChild);
        window.card.initCard();
      }
    });
  }


  function removeMapFaded() {
    map.classList.remove('map--faded');
  }

  function removeNoticeFormDisabled() {
    noticeForm.classList.remove('notice__form--disabled');
  }

  function removeDisable() {
    var fieldset = document.querySelectorAll('fieldset');
    for (var i = 0; i < fieldset.length; i++) {
      if (fieldset[i].hasAttribute('disabled')) {
        fieldset[i].removeAttribute('disabled');
      }
    }
  }

  function download(evt) {
    window.upload(new FormData(noticeForm), function () {
      noticeForm.reset();
    },
    errorBlock);
    evt.preventDefault();
  }

  function errorBlock(errorMessage) {
    var div = document.createElement('div');
    div.style = 'z-index: 10; margin: 0; text-align: center; background-color: white; border: 3px solid black;';
    div.style.position = 'fixed';
    div.style.width = '50%';
    div.style.height = '70px';
    div.style.paddingTop = '20px';
    div.style.left = '25%';
    div.style.top = '25%';
    div.style.fontSize = '30px';
    div.textContent = errorMessage;
    div.style.color = 'DarkRed';
    document.body.prepend(div);
    setTimeout(function () {
      div.classList.add('hidden');
    }, 2500);
  }

  function init() {
    typeOfHousing.addEventListener('change', window.pin.filterUpdateHandler);
    typeOfPrice.addEventListener('change', window.pin.filterUpdateHandler);
    numberOfRooms.addEventListener('change', window.pin.filterUpdateHandler);
    numberOfGuests.addEventListener('change', window.pin.filterUpdateHandler);

    for (var i = 0; i < arrFeatures.length; i++) {
      arrFeatures[i].addEventListener('change', window.pin.filterUpdateHandler);
    }

    var dragget;

    window.load(function (response) {
      pinsData = response;
      mapPinMain.addEventListener('mouseup', function (evt) {
        if (!dragget) {
          removeMapFaded();
          removeNoticeFormDisabled();
          removeDisable();
          document.querySelector('.map__filters').reset();

          mapPins.appendChild(window.pin.createPins(window.pin.filterPinsData(pinsData).splice(0, NUMBER_ITEMS)));
          mapPins.addEventListener('click', onMapPinsClick);

          address.value = (evt.clientX) + ', ' + (evt.clientY);
          housingPrice.value = START_PRICE;
          window.pinMove.movePin();
        }
        dragget = true;

        noticeForm.addEventListener('submit', download);
      });

      window.map = {
        pinsData: pinsData,
        isCardShown: isCardShown
      };
    }, errorBlock);
  }

  init();
})();
