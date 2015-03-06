// (function() {
//   'use strict';

  var mongoose   = require('mongoose'),
    timestamps = require('../../db/plugins/timestamps'),
    qs         = require('querystring'),
    bcrypt     = require('bcryptjs'),
    jwt        = require('jwt-simple'),
    Schema     = mongoose.Schema,
    ObjectId   = mongoose.Schema.Types.ObjectId;

    var cachedData = new Schema({
      key : String,
      stuff : String
      // lastModified : Date,
      // url : String,
      // response : String
    });

    cachedData.methods.asJSON = function (cb) {
      return JSON.stringify(this);
    }

    cachedData.statics.findByKey = function (title, cb) {
      return this.findOne({ key: new RegExp(title, 'i') }, cb);

    var CachedData = mongoose.model('cachedData', cachedData);

    module.exports = CachedData;
// }());