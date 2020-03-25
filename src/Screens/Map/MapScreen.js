import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Circle, Callout, Polyline } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

import { locations } from './fakeData';

export default function MapScreen() {
  let _carousel;
  let _map;
  let _marker = [];
  // 초기값 => 현재 위치
  const [location, setLocation] = useState({
    latitude: 37,
    longitude: 127
  });
  const [datas, setDatas] = useState(locations); // 식당 데이터 배열      (객체 배열)
  const [desLocation, setDesLocation] = useState([]); // 길찾기 배열     (객체 배열)
  const [lastDes, setLastDes] = useState(null); // 길찾기 목적지        (배열)
  const mapboxKey = '';

  // 길찾기
  function direction() {
    axios(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${location.longitude},${location.latitude};${lastDes.longitude},${lastDes.latitude}?geometries=geojson&access_token=${mapboxKey}`
      // `https://api.mapbox.com/directions/v5/mapbox/driving/${location.longitude},${location.latitude};127.034142509,37.583646125?waypoints=0;2&access_token=${mapboxKey}`
    ).then(res => {
      // console.log(res.data.routes[0].geometry.coordinates);
      let a = res.data.routes[0].geometry.coordinates.map(item => {
        // console.log(a);
        return { latitude: item[1], longitude: item[0] };
      });
      setDesLocation(a);
      console.log('경로', desLocation);
      // console.log(num);
    });
  }

  // 식당 혹은 카페 정보 가져오기
  useEffect(() => {
    axios({
      method: 'post',
      url: 'https://mukbank.xyz:5001/restaurant/distance',
      data: {
        latitude: location.latitude,
        longitude: location.longitude,
        sort: 'review',
        distance: 0.5,
        parent: '음식점'
      }
    }).then(res => {
      setDatas(res.data);
      console.log(res.data.length);
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
  // function handleSnapToItem(index) {
  //   // console.log('snapped to ', index);
  // }
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
      latitude: Number(datas[index].latitude),
      longitude: Number(datas[index].longitude),
      latitudeDelta: 0.007,
      longitudeDelta: 0.007
    });
    // console.log(_marker);
    // _marker.showCallout();
  }

  function onMarkerPressed(item, index) {
    // setNum(index);
    _map.animateToRegion({
      latitude: Number(item.latitude),
      longitude: Number(item.longitude),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    });
    _carousel.snapToItem(index);
  }

  function renderItem({ item, index }) {
    // console.log('rendering,', index, item);
    return (
      <View style={{ alignItems: 'center' }}>
        <View
          onPress={() => {
            _carousel.snapToItem(index);
          }}
        />
        <Text style={{ fontSize: 20 }}>{item.name}</Text>
        <Text
          onPress={() => {
            console.log('aaaaaa', lastDes);
            direction(index);
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
        <Polyline
          coordinates={desLocation}
          strokeColor="red"
          fillColor="rgba(255,0,0,0.5)"
          strokeWidth={5}
        />
        {datas.map((item, index) => {
          return (
            <Marker
              ref={ref => {
                _marker = ref;
              }}
              key={index}
              coordinate={{
                latitude: Number(item.latitude),
                longitude: Number(item.longitude)
              }}
              title={item.name}
              onPress={() => {
                setLastDes(datas[index]);
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
          ref={c => {
            _carousel = c;
          }}
          data={datas}
          renderItem={renderItem}
          // onSnapToItem={handleSnapToItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          layout="default"
          firstItem={0}
          removeClippedSubviews={false}
          onSnapToItem={index => {
            setLastDes(datas[index]);
            onCarouselItemChange(index);
          }}
        />
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
