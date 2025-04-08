let searchHistory = [];

export const saveSearchHistory = async places => {
  searchHistory = places;
  // In a real app, you would use AsyncStorage here
  // await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(places));
};

export const getSearchHistory = async () => {
  return [...searchHistory];
  // In a real app, you would use AsyncStorage here
  // const history = await AsyncStorage.getItem(HISTORY_KEY);
  // return history ? JSON.parse(history) : [];
};
