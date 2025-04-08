import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {setSearchResults, setLoading} from '../store/slices/placesSlice';
import {searchPlaces} from '../services/places';
import useDebounce from '../hooks/useDebounce';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const dispatch = useDispatch();

  useEffect(() => {
    const search = async () => {
      if (debouncedQuery.length > 2) {
        dispatch(setLoading(true));
        const results = await searchPlaces(debouncedQuery);
        dispatch(setSearchResults(results));
        dispatch(setLoading(false));
      } else {
        dispatch(setSearchResults([]));
      }
    };
    search();
  }, [debouncedQuery]);

  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#999" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search for places..."
        value={query}
        onChangeText={setQuery}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    margin: 16,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 8,
  },
});

export default SearchBar;
