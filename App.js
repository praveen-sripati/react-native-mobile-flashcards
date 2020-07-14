import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DeckList, NewDeck } from './components';

const Tab = createMaterialTopTabNavigator();

const MyTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Decks"
        tabBarOptions={{
          activeTintColor: '#ffffff',
          labelStyle: { fontSize: 16 },
          style: { backgroundColor: '#6200ee' },
        }}
      >
        <Tab.Screen name="Decks" component={DeckList} />
        <Tab.Screen name="New Deck" component={NewDeck} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <View style={{ flex: 1}}>
      <StatusBar backgroundColor="#4C00D5" />
      <MyTabs/>
    </View>

    // <NavigationContainer>
    //   <Tab.Navigator>
    //     <Tab.Screen name="Home" component={DeckList} />
    //     <Tab.Screen name="Settings" component={NewDeck} />
    //   </Tab.Navigator>
    // </NavigationContainer>
  );
}
