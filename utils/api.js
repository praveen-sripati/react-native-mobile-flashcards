import { AsyncStorage } from 'react-native';
const UDACICARDS_STORAGE_KEY = 'udacicards';

export const getDecks = async () => {
  return await AsyncStorage.getItem(
    UDACICARDS_STORAGE_KEY,
    (error, results) => {
      if (error) {
        return console.log('Error retrieving Decks! -- Error:', error);
      }
      const decks = JSON.stringify(results);
      return decks;
    }
  );
};

export const getDeck = async (id) => {
  return await AsyncStorage.getItem(
    UDACICARDS_STORAGE_KEY,
    (error, results) => {
      if (error) {
        return console.log('Error retrieving Deck! -- Error:', error);
      }
      const decks = JSON.parse(results);
      return decks[id];
    }
  );
};

export const setDeckTitle = async (title) => {
  return await AsyncStorage.mergeItem(
    UDACICARDS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: [],
      },
    }),
    (error) => {
      console.log('Error adding new Deck! -- Error:', error);
    }
  );
};

export const addCardToDeck = async (title, card) => {
  return (
    await AsyncStorage.getItem(UDACICARDS_STORAGE_KEY),
    (error, results) => {
      if (error) {
        return console.log('Error adding new Card! -- Error:', error);
      }
      const decks = JSON.parse(results);
      decks[title].questions.concat(card);
      return AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, decks);
    }
  );
};
