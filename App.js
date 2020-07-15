import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { DeckList, NewDeck, DeckView, NewCard } from './components';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Decks"
      tabBarOptions={{
        activeTintColor: '#ffffff',
        indicatorStyle: { backgroundColor: 'white' },
        labelStyle: { fontSize: 16 },
        style: { backgroundColor: '#6200ee' },
      }}
    >
      <Tab.Screen name="Decks" component={DeckList} />
      <Tab.Screen name="New Deck" component={NewDeck} />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="DeckView" component={DeckView} />
      <Stack.Screen name="New Card" component={NewCard} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#4C00D5" />
        <MainNavigator />
      </View>
    </NavigationContainer>
  );
}
