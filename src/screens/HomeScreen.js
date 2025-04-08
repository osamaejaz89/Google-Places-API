import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSearchHistory, selectPlace} from '../store/slices/placesSlice';
import SearchBar from '../components/SearchBar';
import MapViewComponent from '../components/MapView';
import PlaceItem from '../components/PlaceItem';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {searchResults, searchHistory, isLoading} = useSelector(
    state => state.places,
  );

  useEffect(() => {
    dispatch(fetchSearchHistory());
  }, []);

  const renderItem = ({ item }) => (
    console.log("item", item),
    <PlaceItem place={item} onSelect={() => dispatch(selectPlace(item))} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapViewComponent />
      </View>
      <View style={styles.searchContainer}>
        <SearchBar />
        <FlatList
          data={searchResults.length > 0 ? searchResults : searchHistory}
          renderItem={renderItem}
          keyExtractor={item => item.place_id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text>
                {isLoading
                  ? 'Searching...'
                  : searchResults.length === 0 && searchHistory.length === 0
                  ? 'Your search history will appear here'
                  : 'No results found'}
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 8,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
});

export default HomeScreen;
