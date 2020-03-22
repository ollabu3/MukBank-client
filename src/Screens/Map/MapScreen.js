import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { locations } from './fakeData';

export default function MapScreen({ navigation }) {
  // 초기값 => 현재 위치
  const [location, setLocation] = useState({
    latitude: 37,
    longitude: 127
  });
  const [desLocations, setDesLocations] = useState(locations); // 식당 데이터

  // 식당 혹은 카페 정보 가져오기
  useEffect(() => {
    axios({
      method: 'post',
      url: 'https://mukbank.xyz:5001/restaurant/distance',
      data: {
        latitude: location.latitude,
        longitude: location.longitude,
        sort: 'distance',
        distance: 0.5,
        parent: '음식점'
      }
    }).then(res => {
      setDesLocations(locations);
      setDesLocations(res.data);
    });
  });
  // 현재위치 가져오기
  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      // console.log('현재 위치는 --------', position);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  }, []);

  // 스냅헸을때 가리키는 인덱스를 가지고 맵의 보이는 위치를 변환한다.
  function handleSnapToItem(index) {
    console.log('snapped to ', index);
  }
  let _carousel = {};
  /** */

  if (!location) {
    return (
      <View>
        <Text>loding</Text>
      </View>
    );
  }

  function _renderItem({ item, index }) {
    // console.log('rendering,', index, item);
    return (
      <View>
        <View
          onPress={() => {
            _carousel.snapToItem(index);
          }}
        ></View>
        <Text>{item.name}</Text>
        <Text>{item.address}</Text>
        <Text
          onPress={() => {
            navigation.navigate('Direction');
          }}
        >
          길찾기
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>zsghfd</Text>
      <MapView
        showsUserLocation
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        {desLocations.map((item, index) => {
          if (item.latitude && item.longitude) {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: Number(item.latitude),
                  longitude: Number(item.longitude)
                }}
                title={item.name}
              />
            );
          }
        })}
        <Circle
          radius={500}
          center={{
            latitude: location.latitude,
            longitude: location.longitude
          }}
          fillColor={'rgba(100, 200, 200, 0.3)'}
        />
      </MapView>
      <View style={{ backgroundColor: 'skyblue' }}>
        <Carousel
          ref={c => {
            _carousel = c;
          }}
          data={desLocations}
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
