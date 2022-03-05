import { useState, useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  View,
  ActivityIndicator, // displays a circular lodaing spinner
} from 'react-native';
import SearchInput from './components/SearchInput';
import getImageForWeather from './utils/getImageForWeather';
import { fetchLocationId, fetchWeather } from './utils/api';
import WeatherDetails from './components/WeatherDetails';
import useNativeGeoLocation from './hooks/useNativeGeoLocation';

export default function App() {
  const [location, setLocation] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState(0);
  const [weather, setWeather] = useState('');
  const [error, setError] = useState(false);

  const { geo, hasPerms: hasGeoLocPerms } = useNativeGeoLocation();

  const handleChangeText = useCallback(
    (value) => {
      setCitySearch(value);
    },
    [setCitySearch]
  );

  const handleUpdateLocation = async ({ city = '', latt = '', long = '' }) => {
    try {
      setLoading(true);

      const locationId = await fetchLocationId({ city, latt, long });

      const { location, weather, temperature } = await fetchWeather(locationId);

      setError(false);

      setLocation(location);
      setWeather(weather);
      setTemperature(temperature);
      setCitySearch('');
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasGeoLocPerms && geo.latt && geo.long) {
      // update whenever geo changes (which will probably only happen on app mount)
      handleUpdateLocation({ latt: geo.latt, long: geo.long });
      return;
    }
  }, [geo.latt, geo.long, hasGeoLocPerms]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={getImageForWeather(weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}>
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={isLoading} color="white" size="large" />

          {error && (
            <View>
              <Text style={[styles.smallText, styles.textStyle]}>
                Could not load weather, please try a different city
              </Text>
            </View>
          )}

          {!error && (
            <WeatherDetails
              location={location}
              weather={weather}
              temperature={`${Math.round(temperature)}`}
            />
          )}

          <SearchInput
            placeholder="Search any city"
            value={citySearch}
            onChangeText={handleChangeText}
            onSubmitEditing={() => handleUpdateLocation({ city: citySearch })}
          />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    // fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    ...Platform.select({
      ios: {
        fontFamily: 'AvenirNext-Regular',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },

  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
    // set width and height to null so that the dimensions of the image fit the container instead
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});
