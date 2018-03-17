'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var WIDTH_PHOTO = 100;
  var HEIGHT_PHOTO = 70;
  var MARGIN = 10;

  function loadAvatar() {

    var fileChooser = document.querySelector('.upload input[type=file]');
    var preview = document.querySelector('.notice__preview img');

    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  }

  function loadFoto() {
    var fileChooser = document.querySelector('.form__photo-container input[type=file]');
    var preview = document.querySelector('.form__photo-container');

    fileChooser.addEventListener('change', function () {
      var img = document.createElement('img');
      img.className = 'foto';
      img.draggable = true;
      img.style.cursor = 'move';
      img.style.marginRight = MARGIN + 'px';
      img.style.marginBottom = MARGIN + 'px';
      img.style.width = WIDTH_PHOTO + 'px';
      img.style.height = HEIGHT_PHOTO + 'px';
      preview.appendChild(img);
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

  loadAvatar();
  loadFoto();
}
)();
