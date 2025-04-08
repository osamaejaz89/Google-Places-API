import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchBar from '../components/SearchBar';
import MapViewComponent from '../components/MapView';
import PlaceItem from '../components/PlaceItem';
import theme from '../theme';

const HomeScreen = () => {
  const {searchResults, searchHistory} = useSelector(state => state.places);
  const showHistory = searchHistory.length > 0 && searchResults.length === 0;

  return (
    <View style={styles.container}>
      {/* Map Section */}
      <View style={styles.mapContainer}>
        <MapViewComponent />
      </View>

      {/* Search Section */}
      <View style={styles.searchContainer}>
        <SearchBar onSearch={() => {}} />

        <ScrollView style={styles.resultsContainer}>
          {showHistory && (
            <View style={styles.sectionHeader}>
              <Icon
                name={theme.icons.recent}
                size={20}
                color={theme.colors.textSecondary}
                style={styles.sectionIcon}
              />
              <Text style={styles.sectionTitle}>Recent Searches</Text>
            </View>
          )}

          {(searchResults.length > 0 ? searchResults : searchHistory).map(
            (place, index) => (
              <PlaceItem
                key={place.place_id}
                place={place}
                isLast={
                  index === (searchResults.length || searchHistory.length) - 1
                }
                onSelect={() => {}}
              />
            ),
          )}

          {searchResults.length === 0 && searchHistory.length === 0 && (
            <View style={styles.emptyState}>
              <Icon
                name={theme.icons.noResults}
                size={48}
                color={theme.colors.textSecondary}
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyText}>
                {searchResults.length === 0 && searchHistory.length > 0
                  ? 'No results found'
                  : 'Your search history will appear here'}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  mapContainer: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: theme.colors.card,
    paddingTop: 16,
    ...theme.shadows.md,
  },
  resultsContainer: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

export default HomeScreen;
