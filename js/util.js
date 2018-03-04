'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  var lastTimeout;
  function debounce(fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  }

  function eventPath(evt) {
    var path = (evt.composedPath && evt.composedPath()) || evt.path;
    var target = evt.target;

    if (path) {
      return (path.indexOf(window) < 0) ? path.concat(window) : path;
    }

    if (target === window) {
      return [window];
    }

    function getParents(node, memo) {
      memo = memo || [];
      var parentNode = node.parentNode;
      return !parentNode ? memo : getParents(parentNode, memo.concat(parentNode));
    }

    return [target].concat(getParents(target), window);
  }

  window.util = {
    debounce: debounce,
    eventPath: eventPath
  };

})();
