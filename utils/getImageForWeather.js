/* eslint-disable global-require */

const IMAGES = {
  Clear: require('../assets/clear.png'),
  Hail: require('../assets/hail.png'),
  'Heavy Cloud': require('../assets/heavy-cloud.png'),
  'Light Cloud': require('../assets/light-cloud.png'),
  'Heavy Rain': require('../assets/heavy-rain.png'),
  'Light Rain': require('../assets/light-rain.png'),
  Showers: require('../assets/showers.png'),
  Sleet: require('../assets/sleet.png'),
  Snow: require('../assets/snow.png'),
  Thunder: require('../assets/thunder.png'),
};

/**
 * @method getImagesForWeather
 * @desc takes a weather param and returns the relavant path based on the key from images map
 * @param {String} weather
 * @return {String} image of weather path
 */
export default (weather) => IMAGES[weather];
