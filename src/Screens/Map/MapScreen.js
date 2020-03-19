import React, { useState, useEffect } from 'react';
import { Platform, Text, View, Dimensions, Image } from 'react-native';
import MapView, { Marker, Polyline, Callout, Circle } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
import { locations } from './fakeData';

export default function MapScreen() {
  const [error, setError] = useState();
  const [location, setLocation] = useState({
    coords: { latitude: 32, longitude: 127 }
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation(position);
        setError(null);
      }
      // err => {
      //   setError(err),
      //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 };
      // }
    );
    console.log(location);
  }, []);
  if (!location) {
    return (
      <View>
        <Text>loding</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>zsghfd</Text>
      <MapView
        showsUserLocation
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
        }}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0015,
          longitudeDelta: 0.0021
        }}
      >
        {/* <Polyline
          coordinates={this.state.coordinate}
          fillColor={'rgba(100,100,200,0,3)'}
        /> */}
        {/* <Circle
          center={{ latitude: 37.612285, longitude: 127.031282 }}
          radius={10000}
          fillColor={'rgb(200,300,200,0.5)'}
        /> */}
        <Marker title="현위치" coordinate={location.coords}>
          <Callout>
            <Image
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            />
            <Text>Anasdfasdfaf city</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}
