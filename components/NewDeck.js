import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { TitleText } from './TitleText';
import { setDeckTitle, getDecks } from '../utils/api';


const onAddNewDeck = async (title, onChangeValue, navigation) => {
  await setDeckTitle(title);
  onChangeValue('');
  const data = await getDecks();
  const item = {
    title: data[title].title,
    questions: data[title].questions,
    numOfCards: data[title].questions.length,
  };
  navigation.navigate('DeckView', {
    item,
  });
};

export const NewDeck = ({ navigation }) => {
  const [value, onChangeValue] = useState('');
  return (
    <View style={styles.container}>
      <TitleText title="What is the Title of your New Deck?" size={32} />
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => onChangeValue(text)}
        value={value}
        placeholder="Enter text here"
        maxLength={20}
      />
      <View style={{ marginTop: 20, width: 150 }}>
        <Button
          title={'Add Deck'}
          onPress={() => onAddNewDeck(value, onChangeValue, navigation)}
          color="#6200ee"
          disabled={value === ''}
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
    borderRadius: 5,
  },
});
