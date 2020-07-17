import React, { useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { TitleText } from './TitleText';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

export const QuizView = ({ route, navigation }) => {
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const { questions } = route.params;
  const numOfCards = questions.length;

  navigation.setOptions({
    title: index <= numOfCards - 1 ? `Quiz` : 'Quiz Complete',
    headerStyle: {
      backgroundColor: '#6200ee',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerTintColor: 'white',
  });

  if (index === numOfCards) {
    clearLocalNotification()
      .then(setLocalNotification)
  }

  const Results = () => {
    const correctPercentage = ((correct / numOfCards) * 100).toFixed(0);
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.quizComplete}>Quiz Complete</Text>
          <TitleText
            title={`You got ${correct} out of ${numOfCards} cards correct (${correctPercentage}%)`}
            size={24}
          />
        </View>
        <View>
          <View style={styles.button}>
            <Button
              title={'Restart Quiz'}
              color="#6200ee"
              onPress={() => setIndex(0)}
            />
          </View>
          <View style={styles.button}>
            <Button
              title={'Back to Deck'}
              color="#6200ee"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </View>
    );
  };

  const onButtonClick = (button) => {
    setIndex(index + 1);
    if (button === 'Correct') {
      setCorrect(correct + 1);
      setShowAnswer(false);
    }
    if (button === 'Incorrect') {
      setIncorrect(incorrect + 1);
      setShowAnswer(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {index <= numOfCards - 1 && (
        <Text style={{ padding: 10, fontSize: 16, fontWeight: '500' }}>
          {index + 1}/{numOfCards}
        </Text>
      )}
      {index <= numOfCards - 1 ? (
        <View style={styles.container}>
          {!showAnswer ? (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TitleText title={questions[index].question} size={32} />
              <TouchableNativeFeedback onPress={() => setShowAnswer(true)}>
                <View style={styles.showAnswerButton}>
                  <Text style={{ color: 'green', fontWeight: '500' }}>
                    SHOW ANSWER
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          ) : (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View>
                <Text style={styles.questionText}>Question:</Text>
                <TitleText title={questions[index].question} size={24} />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.answerText}>Answer:</Text>
                <TitleText title={questions[index].answer} size={24} />
              </View>
            </View>
          )}
          <View style={{ marginTop: 20, width: 150 }}>
            <Button
              title={'Correct'}
              onPress={() => onButtonClick('Correct')}
              color="#6200ee"
              disabled={!showAnswer}
            />
            <View style={{ marginTop: 15 }}>
              <Button
                title={'Incorrect'}
                onPress={() => onButtonClick('Incorrect')}
                color="#6200ee"
                disabled={!showAnswer}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  questionText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  answerText: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  showAnswerButton: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  quizComplete: {
    color: 'green',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    width: 200,
  },
});
