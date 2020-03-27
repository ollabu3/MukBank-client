import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import MapView, { Circle, Callout } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

import Buttons from './Components/Buttons';
import { locations } from './fakeData';

export default function MapScreen() {
  let _carousel;
  let _map;
  let _marker;
  let _btn;
  // 초기값 => 현재 위치
  const [location, setLocation] = useState({
    latitude: 37,
    longitude: 127
  });
  const [datas, setDatas] = useState(null); // 식당 데이터 배열      (객체 배열)
  const [desLocation, setDesLocation] = useState([]); // 길찾기 배열     (객체 배열)
  const [lastDes, setLastDes] = useState(null); // 길찾기 목적지        (배열)
  const [distance, setDistance] = useState(0.3);
  const mapboxKey = '';

  // 길찾기
  function direction() {
    axios(
      `https://api.mapbox.com/directions/v5/mapbox/walking/
      ${location.longitude},${location.latitude};${lastDes.longitude},${lastDes.latitude}
      ?geometries=geojson&access_token=${mapboxKey}`
    ).then(res => {
      // console.log(res.data.routes[0].geometry.coordinates);
      const coords = res.data.routes[0].geometry.coordinates.map(item => {
        // console.log(a);
        return { latitude: item[1], longitude: item[0] };
      });
      setDesLocation(coords);
      console.log('경로', desLocation);
      // console.log(num);
    });
  }
  // 식당 및 카페 데이터
  function find() {
    axios({
      method: 'post',
      url: 'https://mukbank.xyz:5001/restaurant/distance',
      data: {
        latitude: location.latitude,
        longitude: location.longitude,
        sort: 'review',
        distance,
        parent: '음식점'
      }
    }).then(res => {
      setDatas(res.data);
      setLastDes(res.data[0]);
      console.log('가져오는 데이터의 크기', res.data.length);
    });
  }
  // 식당 혹은 카페 정보 가져오기
  useEffect(() => {
    find();
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

  function onCarouselItemChange(index) {
    _map.animateToRegion({
      latitude: Number(datas[index].latitude),
      longitude: Number(datas[index].longitude),
      latitudeDelta: distance * 0.03,
      longitudeDelta: distance * 0.03
    });
    console.log('케러셀 선택', index);
    // _marker.showCallout(index);
    // _marker.hideCallout(index);
  }

  function onMarkerPressed(item, index) {
    _map.animateToRegion({
      latitude: Number(item.latitude),
      longitude: Number(item.longitude),
      latitudeDelta: distance * 0.03,
      longitudeDelta: distance * 0.03
    });
    console.log('마커 클릭', index);
    // setDesLocation(null);
    _carousel.snapToItem(index);
    // setDesLocation([]);
    console.log('마커 찍었을때 아이템 정보', item);
  }

  function renderItem(item, index) {
    console.log('아이템----------------------------', item.item);
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>{item.item.name}</Text>
        <View
          onPress={() => {
            _carousel.snapToItem(index);
          }}
        />
        <View style={styles.carouselBtn}>
          <Text
            onPress={() => {
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
      </View>
    );
  }
  if (!datas) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        showsUserLocation
        ref={map => {
          _map = map;
        }}
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: distance * 0.03,
          longitudeDelta: distance * 0.03
        }}
      >
        <MapView.Polyline
          coordinates={desLocation}
          strokeColor="red"
          fillColor="rgba(255,0,0,0.5)"
          strokeWidth={5}
        />
        {datas.map((item, index) => {
          return (
            <MapView.Marker
              ref={ref => {
                _marker = ref;
              }}
              key={item.name}
              coordinate={{
                latitude: Number(item.latitude),
                longitude: Number(item.longitude)
              }}
              title={item.name}
              onPress={() => {
                console.log('마커', index);
                setLastDes(datas[index]);
                onMarkerPressed(item, index);
              }}
            >
              <Callout style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                <Text>{item.address}</Text>
              </Callout>
            </MapView.Marker>
          );
        })}
        <Circle
          radius={distance * 1000}
          center={{
            latitude: location.latitude,
            longitude: location.longitude
          }}
          fillColor="rgba(100, 200, 200, 0.3)"
        />
      </MapView>
      <Buttons find={find} setDistance={setDistance} />
      <View style={styles.carousel}>
        <Carousel
          ref={c => {
            _carousel = c;
          }}
          data={datas}
          renderItem={renderItem}
          // onSnapToItem={handleSnapToItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          firstItem={0}
          removeClippedSubviews={false}
          layout="stack"
          layoutCardOffset={1000}
          onSnapToItem={index => {
            setLastDes(datas[index]);
            // _marker.hideCallout();
            onCarouselItemChange(index);
            // lastDes = datas[index];
          }}
        />
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    flex: 7
  },
  carousel: {
    flex: 1,
    height: 100,
    bottom: '0%'
    // borderColor: 'red'
    // backgroundColor: '#feee7d'
  },
  carouselBtn: {
    flexDirection: 'row'
  }
});
