'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var WIDTH_PHOTO = 100;
  var HEIGHT_PHOTO = 70;
  var MARGIN = 10;
  var previewAvatar = document.querySelector('.notice__preview img');
  var previewFotos = document.querySelector('.form__photo-container');

  function loadAvatar() {

    var fileChooser = document.querySelector('.upload input[type=file]');

    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          previewAvatar.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  }

  function loadFoto() {
    var fileChooser = document.querySelector('.form__photo-container input[type=file]');

    fileChooser.addEventListener('change', function () {
      var img = document.createElement('img');
      img.className = 'foto';
      img.draggable = true;
      img.style.cursor = 'move';
      img.style.marginRight = MARGIN + 'px';
      img.style.marginBottom = MARGIN + 'px';
      img.style.width = WIDTH_PHOTO + 'px';
      img.style.height = HEIGHT_PHOTO + 'px';
      previewFotos.appendChild(img);
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          img.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  }
  function resetFotos() {
    previewAvatar.src = 'img/muffin.png';
    while (previewFotos.children[1]) {
      previewFotos.children[1].remove();
    }
  }
  loadAvatar();
  loadFoto();

  window.loadFotos = {
    resetFotos: resetFotos
  };
}
)();
