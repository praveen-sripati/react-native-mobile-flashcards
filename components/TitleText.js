import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TitleText = ({ title, size }) => {
  return (
    <View style={styles.titleTextContainer}>
      <Text style={[styles.titleText, {fontSize: size}]}>{title}</Text>
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
    fontWeight: "bold",
    fontFamily:'Roboto',
  }
})
