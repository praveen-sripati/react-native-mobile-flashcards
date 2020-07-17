import React, {useEffect} from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { DeckList, NewDeck, DeckView, NewCard, QuizView } from './components';
import { setLocalNotification } from './utils/helpers';

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
      <Stack.Screen name="QuizView" component={QuizView} />
    </Stack.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    setLocalNotification()
  }, [])
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#4C00D5" />
        <MainNavigator />
      </View>
    </NavigationContainer>
  );
}
