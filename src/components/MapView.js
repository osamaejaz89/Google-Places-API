import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../theme';

const {width} = Dimensions.get('window');

const MapViewComponent = ({selectedPlace}) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (selectedPlace?.geometry && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: selectedPlace.geometry.location.lat,
          longitude: selectedPlace.geometry.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        500,
      );
    }
  }, [selectedPlace]);

  if (!selectedPlace?.geometry) {
    return (
      <View style={styles.placeholder}>
        <Icon
          name={theme.icons.marker}
          size={48}
          color={theme.colors.textSecondary}
          style={styles.placeholderIcon}
        />
        <Text style={styles.placeholderText}>
          Select a location to view on map
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: selectedPlace.geometry.location.lat,
          longitude: selectedPlace.geometry.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>
        <Marker
          coordinate={{
            latitude: selectedPlace.geometry.location.lat,
            longitude: selectedPlace.geometry.location.lng,
          }}>
          <View style={styles.marker}>
            <Icon
              name={theme.icons.marker}
              size={32}
              color={theme.colors.secondary}
            />
          </View>
        </Marker>
      </MapView>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>{selectedPlace.name}</Text>
        <Text style={styles.infoAddress}>
          {selectedPlace.formatted_address}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  placeholderIcon: {
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  marker: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 4,
  },
  infoCard: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    ...theme.shadows.md,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  infoAddress: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});

export default MapViewComponent;
