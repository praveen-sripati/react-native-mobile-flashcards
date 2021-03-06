import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { TitleText } from './TitleText';
import { addCardToDeck } from '../utils/api';

const onAddCard = (
  title,
  card,
  onChangeAnswer,
  onChangeQuestion,
  navigation
) => {
  addCardToDeck(title, card);
  onChangeAnswer('');
  onChangeQuestion('');
  navigation.navigate('DeckView', {
    subscribeValue: true
  });
};

export const NewCard = ({ route, navigation }) => {
  const [answer, onChangeAnswer] = useState('');
  const [question, onChangeQuestion] = useState('');

  const { item } = route.params;
  navigation.setOptions({
    headerStyle: {
      backgroundColor: '#6200ee',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerTintColor: 'white',
  });

  return (
    <View style={styles.container}>
      <TitleText title="Add New Card" size={32} />
      <View style={styles.inputSection}>
        <Text style={styles.subtitle}>Your Question:</Text>
        <TextInput
          style={[styles.textInput, { height: 40 }]}
          onChangeText={(text) => onChangeQuestion(text)}
          value={question}
          placeholder="Enter Question here"
          maxLength={40}
        />
      </View>
      <View style={styles.inputSection}>
        <Text style={styles.subtitle}>Your Answer:</Text>
        <TextInput
          style={[styles.textInput, { paddingTop: 10, paddingBottom: 10 }]}
          multiline
          numberOfLines={4}
          placeholder="Enter Answer Here"
          textAlignVertical="top"
          onChangeText={(text) => onChangeAnswer(text)}
          value={answer}
        />
      </View>
      <View>
        <View style={styles.button}>
          <Button
            title={'Add Card'}
            onPress={() =>
              onAddCard(
                item.title,
                {
                  question,
                  answer,
                },
                onChangeAnswer,
                onChangeQuestion,
                navigation
              )
            }
            color="#6200ee"
            disabled={question === '' || answer === ''}
          />
        </View>
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
  inputSection: {
    marginTop: 20,
  },
  textInput: {
    width: 300,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    width: 200,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
});
