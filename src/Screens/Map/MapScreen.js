import React, { useState, useEffect } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Image
} from 'react-native';
import MapView, { Marker, Polyline, Callout, Circle } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import Geolocation from 'react-native-geolocation-service';

import { locations } from './fakeData';

export default function MapScreen() {
  const [error, setError] = useState();
  const [location, setLocation] = useState({
    coords: { latitude: 37, longitude: 127 }
  });

  // function renderCarouselItem({ item }) {
  //   <View>
  //     <Text>aaa</Text>
  //   </View>;
  // }

  useEffect(() => {
    Geolocation.getCurrentPosition(
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
  /** */

  function handleSnapToItem(index) {
    console.log('snapped to ', index);
  }
  _carousel = {};
  /** */

  if (!location) {
    return (
      <View>
        <Text>loding</Text>
      </View>
    );
  }

  _renderItem = ({ item, index }) => {
    console.log('rendering,', index, item);
    return (
      <View>
        <View
          onPress={() => {
            _carousel.snapToItem(index);
          }}
        >
          {/* <Image source={{ uri: item.thumbnail }} /> */}
        </View>
        {/* <Image source={{ uri: item.nextVideoId }} /> */}
        <Text>{item.name}</Text>
        <Text>{item.address}</Text>
        <Button
          title="길찾기"
          onPress={() => {
            console.log('찾아가자');
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>zsghfd</Text>
      <MapView
        showsUserLocation
        style={styles.map}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0015,
          longitudeDelta: 0.0021
        }}
      >
        <Circle
          center={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }}
          radius={100}
          fillColor={'rgba(100, 200, 200, 0.3)'}
        />

        <Marker title="현위치" coordinate={location.coords}>
          <Callout>
            <Text>Anasdfasdfaf city</Text>
          </Callout>
        </Marker>
      </MapView>

      <View>
        <Carousel
          ref={c => {
            _carousel = c;
          }}
          data={locations}
          renderItem={_renderItem}
          onSnapToItem={handleSnapToItem}
          sliderWidth={360}
          itemWidth={256}
          layout={'default'}
          firstItem={0}
        />
        {console.log(_carousel)}
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
