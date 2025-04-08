import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSelector} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DEFAULT_REGION = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const SEARCH_REGION = {
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};

const MapViewComponent = () => {
  const mapRef = useRef(null);
  const selectedPlace = useSelector(state => state.places.selectedPlace);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const animateToRegion = useCallback(region => {
    mapRef.current?.animateToRegion(
      {
        ...region,
        latitudeDelta: SEARCH_REGION.latitudeDelta,
        longitudeDelta: SEARCH_REGION.longitudeDelta,
      },
      1000,
    );
  }, []);

  const fetchCurrentLocation = useCallback(() => {
    setIsLoading(true);
    setError(null);

    Geolocation.getCurrentPosition(
      position => {
        console.log('position', position);
        const {latitude, longitude} = position.coords;
        const location = {latitude, longitude};
        setCurrentLocation(location);
        animateToRegion({...location, ...DEFAULT_REGION});
        setIsLoading(false);
      },
      error => {
        console.error('Location error:', error);
        setError('Could not fetch your current location');
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }, [animateToRegion]);

  const requestLocationPermission = useCallback(async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      console.error('Permission error:', err);
      return false;
    }
  }, []);

  useEffect(() => {
    const initLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        fetchCurrentLocation();
      } else {
        setError('Location permission denied');
        setIsLoading(false);
      }
    };

    initLocation();
  }, [requestLocationPermission, fetchCurrentLocation]);

  useEffect(() => {
    if (selectedPlace?.geometry?.location) {
      const {lat, lng} = selectedPlace.geometry.location;
      animateToRegion({
        latitude: lat,
        longitude: lng,
      });
    }
  }, [selectedPlace, animateToRegion]);

  const renderMarker = (coordinate, iconName, iconColor) => (
    <Marker coordinate={coordinate}>
      <View style={styles.markerContainer}>
        <Icon name={iconName} size={32} color={iconColor} />
      </View>
    </Marker>
  );

  const getInitialRegion = () => {
    if (currentLocation) {
      return {...currentLocation, ...DEFAULT_REGION};
    }
    if (selectedPlace?.geometry?.location) {
      const {lat, lng} = selectedPlace.geometry.location;
      return {latitude: lat, longitude: lng, ...SEARCH_REGION};
    }
    return undefined;
  };

  const initialRegion = getInitialRegion();

  if (isLoading) {
    return (
      <View style={styles.placeholder}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>Finding your location...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.placeholder}>
        <Icon name="error-outline" size={48} color="#EA4335" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={false}
        loadingEnabled={true}
        loadingIndicatorColor="#4285F4"
        loadingBackgroundColor="#F5F5F5">
        {currentLocation &&
          renderMarker(currentLocation, 'person-pin-circle', '#4285F4')}
        {selectedPlace?.geometry?.location &&
          renderMarker(
            {
              latitude: selectedPlace.geometry.location.lat,
              longitude: selectedPlace.geometry.location.lng,
            },
            'place',
            '#EA4335',
          )}
      </MapView>

      {selectedPlace && (
        <View style={styles.infoCard}>
          <Text style={styles.title} numberOfLines={1}>
            {selectedPlace.name}
          </Text>
          <Text style={styles.address} numberOfLines={2}>
            {selectedPlace.formatted_address}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#4285F4',
    textAlign: 'center',
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#EA4335',
    textAlign: 'center',
  },
  markerContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 2,
    elevation: 2,
  },
  infoCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#263238',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#78909C',
  },
});

export default MapViewComponent;
