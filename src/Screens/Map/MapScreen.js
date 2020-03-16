import React, { useState } from 'react';
import { Platform, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { ScrollView } from 'react-native-gesture-handler';
import { locations } from './fakeData';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [deslocations, setDesLocations] = useState(locations[0]);
  const [errorMessage, setErrorMessage] = useState(null);

  if (Platform.os === 'android' && !Constants.isDevice) {
    setErrorMessage(
      'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
    );
  } else {
    _getLocationAsync();
  }
  async function _getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setErrorMessage('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  console.log('d', deslocations.coords);

  let text = 'Waiting..';
  if (errorMessage) {
    text = errorMessage;
  } else if (location) {
    text = JSON.stringify(location);
  }
  if (!location) {
    return (
      <View>
        <Text>로딩중</Text>
      </View>
    );
  }
  const points = [
    { latitude: 37.8025259, longitude: -122.4351431 },
    { latitude: 37.7896386, longitude: -122.421646 },
    { latitude: 37.7665248, longitude: -122.4161628 },
    { latitude: 37.7734153, longitude: -122.4577787 },
    { latitude: 37.7948605, longitude: -122.4596065 },
    { latitude: 37.8025259, longitude: -122.4351431 }
  ];

  return (
    <View>
      <Text>{text}zzzaazz</Text>
      <ScrollView>
        <MapView
          showsUserLocation
          style={{
            width: Dimensions.get('window').width,
            height: 600
          }}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
            // latitudeDelta: 110,
            // longitudeDelta: 110
          }}
        >
          <MapView.Polyline
            coordinates={points}
            strokeWidth={10}
            strokeColor="#00a8ff"
            lineCap="around"
          />
        </MapView>
      </ScrollView>
    </View>
  );
}
