const request = require("request");

const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error,null);
      return;
    }
    if (response.statusCode !== 200) {
      const message = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(message),null);
      return;
    }
    let ipAddress = JSON.parse(body);
    callback(null,ipAddress);
    return ipAddress.ip;
  });

};

const fetchCoordsByIP = function(ip,callback) {
  request("https://api.freegeoip.app/json/?apikey=c4d827c0-53df-11ec-af8e-d7138d27f735", (error, response, body) => {
    if (error) {
      callback(error,null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let data = JSON.parse(body);
    let latLongObj = {};
    latLongObj.latitude = data.latitude;
    latLongObj.longitude = data.longitude;

    callback(null,latLongObj);
  });

};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error,null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let data = JSON.parse(body);
    

    callback(null,data.response);
  });

};

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error,ip) => {
    if (error) {
      return callback(error,null);
    }
  
    fetchCoordsByIP('72.137.62.99',(error,coords) => {
      if (error) {
        return callback(error,null);
      }
  
      fetchISSFlyOverTimes({ latitude:43.783 , longitude: -79.4122 },(error,passingTimes) => {
        if (error) {
          return callback(error,null);
        }
        callback(null,passingTimes);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP,fetchISSFlyOverTimes, nextISSTimesForMyLocation};

