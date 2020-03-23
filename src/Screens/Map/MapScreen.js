import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { locations } from './fakeData';

export default function MapScreen({ navigation }) {
  let _carousel;
  let _map;
  let _marker; // 각각의 컴포넌트에서 가져온 것을 저장
  // 초기값 => 현재 위치
  const [location, setLocation] = useState({
    latitude: 37,
    longitude: 127
  });
  const [desLocations, setDesLocations] = useState(locations); // 식당 데이터 배열

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
      setDesLocations(res.data);
    });
  }, [location]);
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
    // console.log('snapped to ', index);
  }

  /** */

  if (!location) {
    return (
      <View>
        <Text>loding</Text>
      </View>
    );
  }

  function onCarouselItemChange(index) {
    _map.animateToRegion({
      latitude: Number(desLocations[index].latitude),
      longitude: Number(desLocations[index].longitude),
      latitudeDelta: 0.0019,
      longitudeDelta: 0.0019
    });
    // _marker[index].showCallout();
  }
  function onMarkerPressed(item, index) {
    _map.animateToRegion({
      latitude: Number(item.latitude),
      longitude: Number(item.longitude),
      latitudeDelta: 0.0019,
      longitudeDelta: 0.0019
    });
    _carousel.snapToItem(index);
  }

  function _renderItem({ item, index }) {
    // console.log('rendering,', index, item);
    return (
      <View style={{ alignItems: 'center' }}>
        {/* <View
          onPress={() => {
            _carousel.snapToItem(index);
          }}
        /> */}
        <Text style={{ fontSize: 20 }}>{item.name}</Text>
        <Text
          onPress={() => {
            navigation.navigate('Direction');
          }}
        >
          길찾기
        </Text>
        <Text
          onPress={() => {
            console.log('따르릉~~~');
          }}
        >
          전화 걸기
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>a</Text>
      <MapView
        showsUserLocation
        ref={map => {
          _map = map;
        }}
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02
        }}
      >
        {desLocations.map((item, index) => {
          return (
            <Marker
              ref={marker => {
                _marker = marker;
                // console.log(marker);
              }}
              key={index}
              coordinate={{
                latitude: Number(item.latitude),
                longitude: Number(item.longitude)
              }}
              title={item.name}
              onPress={() => {
                onMarkerPressed(item, index);
              }}
            >
              <Callout style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                <Text>{item.address}</Text>
              </Callout>
            </Marker>
          );
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
      <View style={{ backgroundColor: 'skyblue', marginTop: 500 }}>
        <Carousel
          // contentContainerStyle={{ bottom: 11111 }} // ?? 이건 모르겠네
          // containerCustomStyle={{ bottom: 0 }} // 안에 있는 내용물들의 속성
          // contentContainerCustomStyle={{ bottom: 0 }} // 내용물이 밖으로 안나가고 안에서...
          ref={c => {
            _carousel = c;
          }}
          data={desLocations}
          renderItem={_renderItem}
          onSnapToItem={handleSnapToItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          layout="default"
          firstItem={0}
          removeClippedSubviews={false}
          onSnapToItem={index => {
            onCarouselItemChange(index);
          }}
        />
        {/* {console.log(_carousel)} */}
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 0,
    marginBottom: 80
  }
});
