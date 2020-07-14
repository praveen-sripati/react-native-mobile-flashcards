import * as React from 'react';
import { View, Text } from 'react-native';
import { DeckList, NewDeck } from './components';

export default function App() {
  return (
    <View style={{flex: 1}}>
      {/* <DeckList /> */}
      <NewDeck />
    </View>
  );
}
