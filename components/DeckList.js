import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableNativeFeedback,
} from 'react-native';
import { getDecks, setDeckTitle } from '../utils/api';

const renderItem = (item) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.SelectableBackground()}
      key={item.age}
      onPress={() => this._onPress(item)}
    >
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>{item.title}</Text>
        <Text>number of cards {item.numOfCards}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export const DeckList = () => {
  const [decks, setDecks] = useState(null);
  useEffect(() => {
    const getDecksData = async () => {
      const data = await getDecks();
      console.log(data)
      const decks = Object.keys(data).map((key) => {
        return {
          title: key,
          numOfCards: data[key].questions.length,
        };
      });
      setDecks({ data: decks });
    };
    getDecksData();
  }, []);

  return (
    <View style={styles.listContainer}>
      {decks.data !== 'undefined' ?
      <FlatList data={decks.data} renderItem={({ item }) => renderItem(item)} />: <Text>No Decks here. Add new one to see.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  listItem: {
    height: 72,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  listItemText: {
    fontSize: 32,
    fontFamily: 'Roboto',
    textTransform: 'uppercase',
  },
});
