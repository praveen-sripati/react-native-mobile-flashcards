import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TitleText } from './TitleText';
import { getDecks } from '../utils/api';

export const DeckView = ({ route, navigation }) => {
  const [deck, setDeck] = useState(null);
  const { item } = route.params;

  navigation.setOptions({
    title: item.title,
    headerStyle: {
      backgroundColor: '#6200ee',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerTintColor: 'white',
  });

  const getDecksData = async () => {
    const data = await getDecks();
    setDeck({
      data: data[item.title],
    });
  };
  getDecksData();

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TitleText title={item.title} size={45} />
        <Text style={{ color: 'gray', fontSize: 18 }}>{`${
          deck ? deck.data.questions.length : " "
        } cards`}</Text>
      </View>
      <View>
        <View style={styles.button}>
          <Button
            title={'Add Card'}
            onPress={() =>
              navigation.navigate('New Card', {
                item,
              })
            }
            color="#6200ee"
          />
        </View>
        <View style={styles.button}>
          <Button
            title={'Start Quiz'}
            onPress={() => navigation.navigate().goBack()}
            color="#6200ee"
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
    justifyContent: 'space-evenly',
  },
  button: {
    marginTop: 20,
    width: 200,
  },
});
