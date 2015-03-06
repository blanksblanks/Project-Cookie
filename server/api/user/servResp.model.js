((function() {
	'use strict';

	var mongoose   = require('mongoose'),
      timestamps = require('../../db/plugins/timestamps'),
      qs         = require('querystring'),
      bcrypt     = require('bcryptjs'),
      jwt        = require('jwt-simple'),
      Schema     = mongoose.Schema,
      ObjectId   = mongoose.Schema.Types.ObjectId;

      var cachedData = new Schema({
      	stuff : String
      	// lastModified : Date,
      	// url : String,
      	// response : String
      });

      cachedData.methods.asJSON = function (cb) {
            return JSON.stringify(this);
      }

      cachedData = mongoose.model('CachedData',cachedData);

      module.exports = CachedData;
}}());