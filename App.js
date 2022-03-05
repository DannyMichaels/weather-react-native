import { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  View,
} from 'react-native';
import SearchInput from './components/SearchInput';
import getImageForWeather from './utils/getImageForWeather';

export default function App() {
  const [location, setLocation] = useState('San Fransisco');
  const [search, setSearch] = useState('');

  const handleChangeText = useCallback(
    (value) => {
      setSearch(value);
    },
    [setSearch]
  );

  const handleUpdateLocation = useCallback(() => {
    if (!search) return;
    setLocation(search);
    setSearch('');
  }, [setLocation, search]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground
        source={getImageForWeather('Clear')}
        style={styles.imageContainer}
        imageStyle={styles.image}>
        <View style={styles.detailsContainer}>
          <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
          <Text style={[styles.smallText, styles.textStyle]}>Light Cloud</Text>
          <Text style={[styles.largeText, styles.textStyle]}>24°</Text>
          <SearchInput
            placeholder="Search any city"
            value={search}
            onChangeText={handleChangeText}
            onSubmitEditing={handleUpdateLocation}
          />
        </View>
      </ImageBackground>
      <StatusBar hidden translucent />
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
