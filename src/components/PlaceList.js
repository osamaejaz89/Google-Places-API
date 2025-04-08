import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import PlaceItem from './PlaceItem';

const PlaceList = () => {
  const {searchResults, searchHistory, isLoading} = useSelector(
    state => state.places,
  );
  const data =
    isLoading || searchResults.length > 0 ? searchResults : searchHistory;

  if (data.length === 0) {
    return (
      <View style={styles.empty}>
        <Text>No search history yet. Start searching for places!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.place_id}
      renderItem={({item}) => <PlaceItem place={item} />}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default PlaceList;
