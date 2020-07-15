import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TitleText } from './TitleText';

const onAddCard = () => {
  return;
};

export const DeckView = ({ route, navigation }) => {
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

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TitleText title={item.title} size={70} />
        <Text style={{color: "gray", fontSize: 18}}>{`${item.numOfCards} cards`}</Text>
      </View>
      <View>
        <View style={styles.button}>
          <Button
            title={'Add Card'}
            onPress={() => onAddCard()}
            color="#6200ee"
          />
        </View>
        <View style={styles.button}>
          <Button
            title={'Add New Deck'}
            onPress={() => onAddCard()}
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
    justifyContent: 'space-evenly'
  },
  button: {
    marginTop: 20,
    width: 200,
  },
});
