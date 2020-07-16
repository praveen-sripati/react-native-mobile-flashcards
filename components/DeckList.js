import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { getDecks, removeDeck } from '../utils/api';

const deleteDeck = (title) => {
  removeDeck(title);
};

const renderItem = (item, navigation) => {
  return (
    <View style={styles.listContainer}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        key={item.title}
        onPress={() =>
          navigation.navigate('DeckView', {
            item,
          })
        }
      >
        <View style={styles.listItem}>
          <Text
            style={[
              styles.listItemText,
              item.title.length < 15 ? { fontSize: 32 } : { fontSize: 24 },
            ]}
          >
            {item.title}
          </Text>
          <Text style={{ color: 'gray', fontSize: 16, fontFamily: 'Roboto' }}>
            number of cards {item.numOfCards}
          </Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={() => deleteDeck(item.title)}>
        <View style={styles.listItemIcon}>
          <AntDesign name="delete" size={24} color="black" />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const EmptyList = () => {
  return (
    <View style={{marginTop: 70, alignItems: 'center', justifyContent: 'center'}}>
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
        renderItem={({ item }) => renderItem(item, navigation)}
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
    height: 72,
  },
  listItemIcon: {
    height: 72,
    paddingTop: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  listItem: {
    flexGrow: 1,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  listItemText: {
    fontFamily: 'Roboto',
  },
});
