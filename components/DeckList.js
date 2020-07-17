import React, { useState, useEffect } from 'react';
import { ListItem } from './ListItem';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDecks } from '../utils/api';

const EmptyList = () => {
  return (
    <View
      style={{ marginTop: 70, alignItems: 'center', justifyContent: 'center' }}
    >
      <MaterialCommunityIcons name="delete-empty" size={200} color="green" />
      <Text style={{ textAlign: 'center' }}>
        No Decks here, Add new one to see it.
      </Text>
    </View>
  );
};

export const DeckList = ({ navigation }) => {
  const [decks, setDecks] = useState(null);

  const getDecksData = async () => {
    const data = await getDecks();
    const decks = Object.keys(data).map((key) => {
      return {
        title: key,
        questions: data[key].questions,
        numOfCards: data[key].questions.length,
      };
    });
    setDecks({ data: decks });
  };

  useEffect(() => {
    getDecksData();
  });

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={decks ? decks.data : []}
        renderItem={({ item, index }) => <ListItem item={item} index={index} navigation={navigation} />}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 80,
  },
  listItemIcon: {
    height: 80,
    paddingTop: 30,
    paddingLeft: 25,
    paddingRight: 25,
  },
  listItem: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  listItemText: {
    fontFamily: 'Roboto',
  },
});
