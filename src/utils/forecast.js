const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=34991b317d3cb91f22d9b99662c92cc8&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect weather stack service", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        "its currently like  " +
          body.current.temperature +
          "  degree out.its feel like  " +
          body.current.feelslike +
          " degree out" +
          body.current.humidity +
          "%"
      );
    }
  });
};
module.exports = forecast;
