// lightweight wrapper for google distance matrix

'use strict';

var qs = require('querystring'),
    request = require('request');

var DISTANCE_API_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';

var GoogleDistance = function() {
	// todo: replace this with env var
	this.apiKey = "AIzaSyDixoQhSDJD2UdcJpT449uAPsgTPmxspSc";
};

GoogleDistance.prototype.get = function(args, callback) {
  var self = this;
  var options = formatOptions.call(this, args);
  fetchData(options, function(err, data) {
    if (err) return callback(err);
    formatResults(data, options, function(err, results) {
      if (err) return callback(err);
      return callback(null, results);
    });
  });
};

var formatOptions = function(args) {
  var options = {
    index: args.index || null,
    origins: args.origin,
    destinations: args.destination,
    mode: args.mode,
    units: args.units,
    language: args.language,
    key: this.apiKey
  };
  return options;
};

var formatResults = function(data, options, callback) {
  var formatData = function (element) {
    return {
      index: options.index,
      distance: element.distance.text,
      distanceValue: element.distance.value,
      duration: element.duration.text,
      durationValue: element.duration.value,
      origin: element.origin,
      destination: element.destination,
      mode: options.mode,
      units: options.units,
      language: options.language
    };
  };

  var requestStatus = data.status;
  if (requestStatus != 'OK') {
    return callback(new Error('Status error: ' + requestStatus + ': ' + data.error_message));
  }
  var results = [];

  for (var i = 0; i < data.origin_addresses.length; i++) {
    for (var j = 0; j < data.destination_addresses.length; j++) {
      var element = data.rows[i].elements[j];
      var resultStatus = element.status;
      if (resultStatus != 'OK') {
        return callback(new Error('Result error: ' + resultStatus));
      }
      element.origin = data.origin_addresses[i];
      element.destination = data.destination_addresses[j];

      results.push(formatData(element));
    }
  }

  if (results.length == 1 && !options.batchMode) {
    results = results[0];
  }
  return callback(null, results);
};

var fetchData = function(options, callback) {
  request(DISTANCE_API_URL + qs.stringify(options), function (err, res, body) {
    if (!err && res.statusCode == 200) {
      var data = JSON.parse(body);
      callback(null, data);
    } else {
      callback(new Error('Request error: Could not fetch data from Google\'s servers: ' + body));
    }
  });
};

module.exports = new GoogleDistance();





