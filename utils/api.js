import { AsyncStorage } from 'react-native';
const UDACICARDS_STORAGE_KEY = 'udacicards';

export const getDecks = async () => {
  try {
    const decks = await AsyncStorage.getItem(UDACICARDS_STORAGE_KEY);
    return JSON.parse(decks);
  } catch (error) {
    console.log('error getting decks!! ', error);
  }
};

export const getDeck = async (id) => {
  try {
    const data = await AsyncStorage.getItem(UDACICARDS_STORAGE_KEY);
    const decks = JSON.parse(data);
    return decks[id];
  } catch (error) {
    console.log('error getting deck!! ', error);
  }
};

export const setDeckTitle = async (title) => {
  try {
    await AsyncStorage.mergeItem(
      UDACICARDS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: [],
        },
      })
    );
  } catch (error) {
    console.log('error setting deck!! ', error);
  }
};

export const addCardToDeck = async (title, card) => {
  await AsyncStorage.getItem(UDACICARDS_STORAGE_KEY),
    (error, results) => {
      if (error) {
        return console.log('Error adding new Card! -- Error:', error);
      }
      const decks = JSON.parse(results);
      decks[title].questions.concat(card);
      return AsyncStorage.setItem(
        UDACICARDS_STORAGE_KEY,
        JSON.stringify(decks)
      );
    };
};
