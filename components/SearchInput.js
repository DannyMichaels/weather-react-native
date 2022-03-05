import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchInput({
  value,
  placeholder,
  onChangeText,
  onSubmitEditing,
}) {
  return (
    <View View style={styles.container}>
      <TextInput
        autoCorrect={false}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="white"
        // underlineColorAndroid: remove the dark underline that shows by default on android
        underlineColorAndroid="transparent"
        style={styles.textInput}
        // clearButtonMode: shows clear button on the right side of input field when characters are inserted (only on iOS)
        clearButtonMode="always"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 300,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
});
