import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  Animated,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { removeDeck } from '../utils/api';

export const ListItem = ({ item, index, navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const deleteDeck = async (title) => {
    let wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    fadeOut();
    await wait(500)
    await removeDeck(title)
  };

  const fadeOut = () => {
    // console.log(fadeAnim)
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      delay: index * 250,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => fadeIn(), []);

  return (
    <Animated.View style={[styles.listContainer, { opacity: fadeAnim }]}>
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
