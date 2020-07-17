import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  Animated,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { removeDeck } from '../utils/api';

const deleteDeck = (title) => {
  removeDeck(title);
};

export const ListItem = ({ item, index, navigation }) => {
  const animatedValue = new Animated.Value(1);

  Animated.timing(animatedValue, {
    toValue: 0,
    duration: 1000,
    delay: index * 350,
    useNativeDriver: true,
  }).start();

  console.log(animatedValue);

  return (
    <Animated.View style={[styles.listContainer, { opacity: animatedValue }]}>
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
    </Animated.View>
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
