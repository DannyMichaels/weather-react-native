import { StyleSheet, Text, View } from 'react-native';

export default function WeatherDetails({ location, weather, temperature }) {
  return (
    <View>
      <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
      <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
      <Text style={[styles.largeText, styles.textStyle]}>{temperature}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
