import React, { useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

export const QuizView = ({ route, navigation }) => {
  // const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  const { questions } = route.params;

  navigation.setOptions({
    headerStyle: {
      backgroundColor: '#6200ee',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerTintColor: 'white',
  });

  const Results = () => {
    return (
      <Text>
        {correct} out of {index}
      </Text>
    );
  };

  const onButtonClick = (button) => {
    setIndex(index + 1);
    if (button === 'Correct') {
      setCorrect(correct + 1);
    }
    if (button === 'Incorrect') {
      setIncorrect(incorrect + 1);
    }
  };

  return (
    <View>
      {index <= questions.length - 1 ? (
        <View>
          <Text>{questions[index].question}</Text>
          <Text>{questions[index].answer}</Text>
          <View style={{ marginTop: 20, width: 150 }}>
            <Button
              title={'Correct'}
              onPress={() => onButtonClick('Correct')}
              color="#6200ee"
            />
            <View style={{ marginTop: 15 }}>
              <Button
                title={'Incorrect'}
                onPress={() => onButtonClick('Incorrect')}
                color="#6200ee"
              />
            </View>
          </View>
        </View>
      ) : (
        <Results />
      )}
    </View>
  );
};
