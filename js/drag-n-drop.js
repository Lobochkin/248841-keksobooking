'use strict';

(function () {
  var preview = document.querySelector('.form__photo-container');


  function sortable(container) {
    var foto;
    var target;
    var rect;
    var next;
    // Начало сортировки
    container.addEventListener('dragstart', function (evt) {
      foto = evt.target;
      // Запоминаем элемент который будет перемещать
      // Ограничиваем тип перетаскивания
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('text/plain', foto);
      // Пописываемся на события при dnd
      container.addEventListener('dragover', _onDragOver, false);
      container.addEventListener('dragleave', _onDragLeave, false);
      container.addEventListener('dragend', _onDragEnd, false);
      setTimeout(function () {
      // Если выполнить данное действие без setTimeout, то
      // перетаскиваемый объект, будет иметь этот класс.
        foto.classList.add('ghost');
      }, 0);
    }, false);
    // Фнукция отвечающая за движение
    function _onDragOver(evt) {
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'move';
      if (evt.target !== foto && evt.target.nodeName.toLowerCase() === 'img') {
        target = evt.target;
        target.classList.add('focus');
      }

      rect = target.getBoundingClientRect();
      next = (evt.clientX - rect.left) / (rect.right - rect.left) < 0.5;
    }
    function _onDragLeave(evt) {
      evt.preventDefault();
      if (evt.target.classList.contains('focus')) {
        evt.target.classList.remove('focus');
      }
    }

    function _onDragEnd(evt) {
      evt.preventDefault();

      if (target && target !== foto && target.nodeName.toLowerCase() === 'img') {
      // Сортируем
        container.insertBefore(foto, next && target || target.nextSibling);
      }
      foto.classList.remove('ghost');
      if (target.classList.contains('focus')) {
        target.classList.remove('focus');
      }
      container.removeEventListener('dragover', _onDragOver, false);
      container.removeEventListener('dragend', _onDragEnd, false);
    }
  }

  // Используем
  sortable(preview);
}
)();
