import * as React from 'react';
import { View, Text } from 'react-native';
import { DeckList } from './components/DeckList';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <DeckList />
    </View>
  );
}
