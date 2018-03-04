'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var WIDTH_PHOTO = 70;
  var HEIGHT_PHOTO = 50;

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
      img.className = 'Фотография';
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
