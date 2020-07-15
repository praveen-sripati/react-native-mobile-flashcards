import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { getDecks } from '../utils/api';

const renderItem = (item) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.SelectableBackground()}
      key={item.title}
      onPress={() => this._onPress(item)}
    >
      <View style={styles.listItem}>
        <View style={styles.listItemTitles}>
          <Text style={styles.listItemText}>{item.title}</Text>
          <Text style={{ color: 'gray', fontSize: 16, fontFamily: 'Roboto' }}>
            number of cards {item.numOfCards}
          </Text>
        </View>
        <View style={styles.listItemIcon}>
          <TouchableNativeFeedback>
            <AntDesign
              name="delete"
              size={24}
              color="black"
            />
          </TouchableNativeFeedback>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export const DeckList = () => {
  const [decks, setDecks] = useState(null);
  useEffect(() => {
    const getDecksData = async () => {
      const data = await getDecks();
      const decks = Object.keys(data).map((key) => {
        return {
          title: key,
          numOfCards: data[key].questions.length,
        };
      });
      setDecks({ data: decks });
    };
    getDecksData();
  }, [decks]);

  return (
    <View style={styles.listContainer}>
      {decks === 'null' ? (
        <Text>No Decks here. Add new one to see.</Text>
      ) : (
        <FlatList
          data={decks ? decks.data : []}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  listItem: {
    height: 72,
    flexDirection: "row",
  },
  listItemIcon: {
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25,
  },
  listItemTitles: {
    flexGrow: 1,
    alignSelf: "flex-start",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  listItemText: {
    fontSize: 32,
    fontFamily: 'Roboto',
  },
});
