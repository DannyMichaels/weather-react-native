//&&
export const fetchLocationId = async ({ city, latt, long }) => {
  let response;

  if (latt && long) {
    response = await fetch(
      `https://www.metaweather.com//api/location/search/?lattlong=${latt},${long}`
    );
    console.log({ latt, long, response });
  } else if (city) {
    response = await fetch(
      `https://www.metaweather.com/api/location/search/?query=${city}`
    );
  } else {
    throw Error('no city, latt, or long provided for fetchLocationId');
  }

  const locations = await response.json();
  return locations[0].woeid;
};

export const fetchWeather = async (woeid) => {
  const response = await fetch(
    `https://www.metaweather.com/api/location/${woeid}/`
  );
  const { title, consolidated_weather } = await response.json();
  const { weather_state_name, the_temp } = consolidated_weather[0];

  return {
    location: title,
    weather: weather_state_name,
    temperature: the_temp,
  };
};
