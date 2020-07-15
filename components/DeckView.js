import React from 'react';
import { View, Text } from 'react-native';

export const DeckView = ({ route, navigation }) => {
  const { item } = route.params;

  navigation.setOptions({
    title: item.title,
    headerStyle: {
      backgroundColor: '#6200ee'
    },
    headerTitleStyle: {
      color: "white"
    },
    headerTintColor: "white"
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{JSON.stringify(item)}</Text>
      <Text>DeckView</Text>
    </View>
  );
};
