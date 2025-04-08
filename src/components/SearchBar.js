import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../theme';

const SearchBar = ({onSearch}) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const scaleAnim = new Animated.Value(1);

  const animate = toValue => {
    Animated.spring(scaleAnim, {
      toValue,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{scale: scaleAnim}],
          borderColor: focused ? theme.colors.primary : theme.colors.border,
        },
      ]}>
      <Icon
        name={theme.icons.search}
        size={24}
        color={focused ? theme.colors.primary : theme.colors.textSecondary}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder="Search for places..."
        placeholderTextColor={theme.colors.textSecondary}
        value={query}
        onChangeText={text => {
          setQuery(text);
          onSearch(text);
        }}
        onFocus={() => {
          setFocused(true);
          animate(1.02);
        }}
        onBlur={() => {
          setFocused(false);
          animate(1);
        }}
      />
      {query.length > 0 && (
        <Icon
          name={theme.icons.close}
          size={20}
          color={theme.colors.textSecondary}
          onPress={() => {
            setQuery('');
            onSearch('');
          }}
          style={styles.clearIcon}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 16,
    borderWidth: 1,
    ...theme.shadows.md,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    fontSize: 16,
    color: theme.colors.text,
    fontFamily: 'Roboto-Regular',
  },
  icon: {
    marginRight: 8,
  },
  clearIcon: {
    marginLeft: 8,
  },
});

export default SearchBar;
