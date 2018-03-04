'use strict';

(function () {
  var WIDTH_PHOTO = 70;
  var HEIGHT_PHOTO = 50;
  var Codes = {
    ESC: 27,
    INTER: 13
  };
  var typeOfHousing = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

  function createFeatures(featuresPinsDataArr, cardfeatures) {
    var popupFeatures = cardfeatures.querySelector('.popup__features');
    while (popupFeatures.firstChild) {
      popupFeatures.removeChild(popupFeatures.firstChild);
    }
    var arrFeatures = featuresPinsDataArr.offer.features;

    arrFeatures.forEach(function (el) {
      var li = document.createElement('li');
      li.className = 'feature feature--' + el;
      popupFeatures.appendChild(li);
    });
    return popupFeatures;
  }

  function createPhotos(cardPictures, fotosPinsData) {
    var popupPictures = cardPictures.querySelector('.popup__pictures');

    while (popupPictures.firstChild) {
      popupPictures.removeChild(popupPictures.firstChild);
    }

    var arrPictures = fotosPinsData.offer.photos;

    arrPictures.forEach(function (it) {
      var li = document.createElement('li');
      var img = document.createElement('img');
      img.src = it;
      img.style.width = WIDTH_PHOTO + 'px';
      img.style.height = HEIGHT_PHOTO + 'px';
      li.appendChild(img);
      popupPictures.appendChild(li);
    });

    return popupPictures;
  }

  function cardDelete() {
    document.querySelector('.popup__close').removeEventListener('click', closeMouseClickHandler);
    document.querySelector('.popup__close').removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('keydown', closeCardByEsc);
    document.querySelector('.map__card ').remove();
    window.map.isCardShown = false;
  }

  function closeMouseClickHandler() {
    cardDelete();
  }

  function keyDownHandler(evtClose) {
    if (evtClose.keyCode === Codes.INTER) {
      cardDelete();
    }
  }

  function closeCardByEsc(evtClose) {
    if (evtClose.keyCode === Codes.ESC && window.map.isCardShown) {
      cardDelete();
    }
  }

  function createCard(pinsDataArr, cardPopup) {
    var fragmentCard = document.createDocumentFragment();
    cardPopup.children[0].src = pinsDataArr.author.avatar;
    cardPopup.children[2].textContent = pinsDataArr.offer.title;
    cardPopup.children[3].children[0].textContent = pinsDataArr.offer.address;

    var popupPrice = cardPopup.querySelector('.popup__price');
    popupPrice.textContent = pinsDataArr.offer.price;
    popupPrice.innerHTML += '&#x20bd;/ночь';
    cardPopup.children[5].textContent = typeOfHousing[pinsDataArr.offer.type];
    cardPopup.children[6].textContent = pinsDataArr.offer.rooms + ' комнаты для ' + pinsDataArr.offer.guests + ' гостей';
    cardPopup.children[7].textContent = 'Заезд после ' + pinsDataArr.offer.checkin + ', выезд до ' + pinsDataArr.offer.checkout;
    createFeatures(pinsDataArr, cardPopup);
    cardPopup.children[9].textContent = pinsDataArr.offer.description;
    createPhotos(cardPopup, pinsDataArr);
    fragmentCard.appendChild(cardPopup);

    return fragmentCard;
  }

  function forcedClose() {
    if (window.map.isCardShown) {
      cardDelete();
    }
  }

  function initCard() {
    if (!window.map.isCardShown) {
      var popupCloseBtn = document.querySelector('.popup__close');

      popupCloseBtn.addEventListener('click', closeMouseClickHandler);
      popupCloseBtn.addEventListener('keydown', keyDownHandler);
      document.addEventListener('keydown', closeCardByEsc);

      window.map.isCardShown = true;
    }
  }

  window.card = {
    createCard: createCard,
    initCard: initCard,
    forcedClose: forcedClose
  };
}
)();
