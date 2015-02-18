/**
 * Given a JSON array of history items and a set of bookmarks
 * (represented as an object literal),
 * iterates through the bookmarks, finding the history item for each,
 * and adds the history data to it
 */

(function () {
  'use strict';

  var fs        = require('fs-extra'),
      data = fs.readJsonSync('./data.json'),
      users = [];

  // });
  readInUsers();
  writeUsersToJson();

  function readInUsers() {
    data.forEach(function (dataItem, idx, arr) {
      console.log(dataItem['user']);
      users.push(dataItem['user']);
      // if (bookmarks[historyItem.url]) {
      //   bookmarks[historyItem.url].history = historyItem;
      // }
    });
  }

  function writeUsersToJson() {
    fs.outputJson('./users.json', users, function (err) {
      if (err) { console.log(err); }
    });
  }
})();
