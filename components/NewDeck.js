import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import { TitleText } from './TitleText';

export const NewDeck = () => {
  const [value, onChangeValue] = useState('');
  return (
    <View style={styles.container}>
      <TitleText title="What is the Title of your New Deck?" />
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => onChangeValue(text)}
        value={value}
        placeholder="Enter text here"
        autoFocus={true}
      />
      <View style={{marginTop: 20}}>
        <Button
          title="Add Deck"
          onPress={() => alert('Simple Button pressed')}
          color="#6200ee"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    marginTop: 20,
    height: 40,
    width: 300,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
