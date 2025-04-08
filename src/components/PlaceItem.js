import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../theme';

const PlaceItem = ({place, onSelect, isLast}) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(place)}
      activeOpacity={0.7}
      style={[styles.container, !isLast && styles.borderBottom]}>
      <View style={styles.iconContainer}>
        <Icon
          name={theme.icons.location}
          size={24}
          color={theme.colors.primary}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.primaryText} numberOfLines={1}>
          {place.structured_formatting.main_text}
        </Text>
        <Text style={styles.secondaryText} numberOfLines={1}>
          {place.structured_formatting.secondary_text}
        </Text>
      </View>
      <Icon
        name={theme.icons.chevronRight}
        size={24}
        color={theme.colors.textSecondary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: theme.colors.card,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  primaryText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: 4,
  },
  secondaryText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});

export default PlaceItem;
