import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TitleText = ({ title }) => {
  return (
    <View style={styles.titleTextContainer}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleTextContainer: {
    justifyContent: "center",
    alignItems: 'center'
  },
  titleText: {
    textAlign:"center",
    fontSize: 32,
    fontWeight: "bold",
    fontFamily:'Roboto',
  }
})
