import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {requestLocationPermission} from '../utils/permissions';
import {
  getSourceToDestiDistance,
  getUserCurrentLocation,
} from '../utils/helper';

type CoordinatesType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
} | null;

const MyMap = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<CoordinatesType>(null);
  const mapRef = useRef<MapView>(null);

  const [source, setSource] = useState<CoordinatesType>(null);
  const [destination, setDestination] = useState<CoordinatesType>(null);
  const [isChooseSource, setIsChooseSource] = useState<boolean>(false);
  const [isChooseDesti, setIsChooseDesti] = useState<boolean>(false);

  console.log('location = ', location);
  console.log('loading = ', loading);

  const defaultLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useFocusEffect(
    useCallback(() => {
      const getCurrentLocation = async () => {
        setLoading(true);
        if (await requestLocationPermission()) {
          const myLocation = await getUserCurrentLocation();

          setLocation({
            latitude: myLocation.coords.latitude,
            longitude: myLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });

        }
        setLoading(false);
      };

      getCurrentLocation();
    }, []),
  );

  useEffect(() => {
    if (mapRef.current && location) {
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000,
      );
    }
  }, [location]);

  const handleMapPress = e => {
    const coordinates = e?.nativeEvent?.coordinate;
    console.log('coordinates = ', coordinates);
    if (isChooseSource) {
      setSource(coordinates);
      setIsChooseSource(false);
    } else {
      setDestination(coordinates);
      setIsChooseDesti(false);
    }
  };

  // show distance
  const showCoordinatesDetails = () => {
    if (source && destination) {
      const distance = getSourceToDestiDistance(source, destination);

      Alert.alert(
        'Coordinates and Distance',
        `Source: \nLatitude: ${source?.latitude}, Longitude: ${source?.longitude}` +
          `\n\nDestination: \nLatitude: ${destination?.latitude}, Longitude: ${destination?.longitude}` +
          `\n\nDistance between source and destination: ${distance.toFixed(
            2,
          )} kilometers`,
      );
    } else {
      Alert.alert(
        'Error',
        'Please select both source and destination coordinates.',
      );
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loader}>Loading your current location...</Text>
        </View>
      )}

      <MapView
        style={styles.map}
        showsUserLocation={true}
        onPress={handleMapPress}
        // onRegionChangeComplete={data => console.log('data = ', data)}
        region={location ? location : defaultLocation}>
        {location && <Marker coordinate={location} title="You are here" />}

        {source && (
          <Marker
            coordinate={source}
            title="Start"
            draggable={true}
            onDragEnd={e => setSource(e?.nativeEvent?.coordinate)}
            pinColor="green"
          />
        )}

        {destination && (
          <Marker
            coordinate={destination}
            title="Drop"
            draggable={true}
            onDragEnd={e => setDestination(e?.nativeEvent?.coordinate)}
            pinColor="blue"
          />
        )}

        {/* draw line between source and desti */}
        {source && destination && (
          <Polyline
            coordinates={[source, destination]}
            strokeColor="#000"
            strokeWidth={2}
          />
        )}
      </MapView>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonGroup}>
          {source ? (
            <Button title="Remove Source" onPress={() => setSource(null)} />
          ) : (
            <Button
              title="Choose Source"
              onPress={() => setIsChooseSource(true)}
            />
          )}

          {destination ? (
            <Button
              title="Remove Destination"
              onPress={() => setDestination(null)}
            />
          ) : (
            <Button
              title="Choose Destination"
              onPress={() => setIsChooseDesti(true)}
            />
          )}
        </View>

        <Button
          title="Show coordinates"
          onPress={() => showCoordinatesDetails()}
        />
      </View>
    </View>
  );
};

export default MyMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  map: {
    width: '100%',
    height: '95%',
    // ...StyleSheet.absoluteFillObject,
  },
  loader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  loadingContainer: {
    marginVertical: 5,
  },
});
