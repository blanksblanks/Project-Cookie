(function () {
  'use strict';
  var cache = function(complexF) {
    var memory = {};
    return function f() {
      var index = JSON.stringify(arguments);
      if (index in memory) {
        return memory[index];
      } else {
        var result = complexF.apply(null,arguments);
        memory[index] = result;
        return result;
      }
    };
  };

  module.exports = cache;
})();