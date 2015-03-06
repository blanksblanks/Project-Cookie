(function () {
  'use strict';

  var model = require('./cached.model.js');

  function cache(fx) {
    var key;
    if (arguments === undefined)
      key = JSON.stringify('undefined');
    else
      key = JSON.stringify(arguments);

    var info = model.findByKey(key, function(err, data){
      if (err)
        console.log('ERR!');
      else if (data) // if data exists
        console.log('retrieving cache... ', data);
      else {
        var result = fx.apply(this, arguments);
        var stuff = new model( { 'key' : key, 'stuff' : result } );
        stuff.save(function(err) {
        if (err)
          console.log('ERR!');
        else
          console.log('cached successfully');
        });
      }
    });
  }

  function someFunction(a, b) {
    return a + b;
  }

  var cached = cache(someFunction);

  cached(1,2);
  cached(3,4);
  cached(1,2);

  module.exports = cache;

}());
