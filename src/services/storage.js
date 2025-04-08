import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = '@places_search_history';

export const getSearchHistory = async () => {
  try {
    const history = await AsyncStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
};

export const saveSearchHistory = async history => {
  try {
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving history:', error);
  }
};
