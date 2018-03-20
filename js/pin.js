'use strict';

(function () {
  var NUMBER_ITEMS = 5;
  var PriceDay = {
    MIDDLE: 10000,
    HIGH: 50000
  };
  var typeOfHousing = document.querySelector('select[name=housing-type]');
  var typeOfPrice = document.querySelector('select[name=housing-price]');
  var numberOfRooms = document.querySelector('select[name=housing-rooms]');
  var numberOfGuests = document.querySelector('select[name=housing-guests]');
  var mapPins = document.querySelector('.map__pins');
  var features = document.querySelector('.map__filter-set');
  var arrFeatures = features.querySelectorAll('input');

  function addPins() {
    mapPins.appendChild(createPins(filterPinsData(window.map.pinsData).splice(0, NUMBER_ITEMS)));
  }

  function filterUpdateHandler() {
    document.querySelectorAll('.map_pin_avatar').forEach(function (pin) {
      pin.remove();
    });
    if (window.map.isCardShown) {
      document.querySelector('.map__card ').remove();
    }
    window.map.isCardShown = false;
    window.util.debounce(addPins);
  }

  function filterTypeOfHousing(offerData) {
    return typeOfHousing.value !== 'any' ? (offerData.offer.type === typeOfHousing.value) : true;
  }

  function filterTypeOfPrice(offerData) {
    if (typeOfPrice.value !== 'any') {
      if (typeOfPrice.value === 'middle') {
        return offerData.offer.price < PriceDay.HIGH && offerData.offer.price > PriceDay.MIDDLE;
      } else if (typeOfPrice.value === 'low') {
        return offerData.offer.price <= PriceDay.MIDDLE;
      } else if (typeOfPrice.value === 'high') {
        return offerData.offer.price >= PriceDay.HIGH;
      }
    }
    return true;
  }

  function filterNumberOfRooms(offerData) {
    return numberOfRooms.value !== 'any' ? offerData.offer.rooms === +numberOfRooms.value : true;
  }

  function filterNumberOfGuests(offerData) {
    return numberOfGuests.value !== 'any' ? offerData.offer.guests === +numberOfGuests.value : true;
  }

  function filterFeatures(offerData) {
    for (var j = 0; j < arrFeatures.length; j++) {
      if (arrFeatures[j].checked && !offerData.offer.features.includes(arrFeatures[j].value)) {
        return false;
      }
    }
    return true;
  }

  function filterPinsData(arrPinsData) {
    return arrPinsData.filter(function (it) {
      return filterTypeOfHousing(it) && filterTypeOfPrice(it) && filterNumberOfRooms(it) && filterNumberOfGuests(it) && filterFeatures(it);
    });
  }

  function createPins(arrPinsData) {
    var fragmentPin = document.createDocumentFragment();
    var commonTemplate = document.querySelector('template');
    var pinAvatar = commonTemplate.content.querySelector('.map_pin_avatar');

    arrPinsData.forEach(function (el, i) {
      var pin = pinAvatar.cloneNode(true);
      pin.dataset.index = i;
      pin.style.left = el.location.x + 20 + 'px';
      pin.style.top = el.location.y + 44 + 'px';
      pin.children[0].src = el.author.avatar;
      fragmentPin.appendChild(pin);
    });
    return fragmentPin;
  }

  window.pin = {
    createPins: createPins,
    filterPinsData: filterPinsData,
    filterUpdateHandler: filterUpdateHandler
  };
})();
