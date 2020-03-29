import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import MapView, { Circle, Callout } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
  const mapboxKey =
    'pk.eyJ1IjoibWljaGFlbDAwOTg3IiwiYSI6ImNrODZwMzJmNTAxMjYzZXBqZjlydGFwNWsifQ.xLWG5j1XRzLQ15_hm88O4Q';

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
    console.log('--------', distance);
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
    setDesLocation([]);
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
    // setDesLocation(null);
    setDesLocation([]);
    _carousel.snapToItem(index);
    // setDesLocation([]);
  }

  function renderItem({ item, index }) {
    return (
      <View style={styles.carouselRenderContainer}>
        <View style={styles.imageConstainer}>
          <Image
            source={require('/Users/michael/Desktop/final/MukBank-client/src/Screens/HateFood/memo.jpg')}
            style={styles.renderImage}
          />
        </View>
        <View style={styles.contentsContainer}>
          {item.name > 13 ? (
            <Text style={[styles.contentsText, { fontSize: 12 }]}>
              {index + '. ' + item.name}
            </Text>
          ) : (
            <Text style={[styles.contentsText, { fontSize: 16 }]}>
              {index + '.' + item.name}
            </Text>
          )}
          <Text style={styles.contentsText}>{item.firstchild}</Text>
          <Text style={styles.contentsText}>{item.address}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.contentsText}>{item.address.split(' ')[2]}</Text>
          <Text style={styles.contentsText}>
            {item.distance.toFixed(2) + 'Km'}
          </Text>
          <Icon
            name="bike"
            size={25}
            color="red"
            onPress={() => {
              direction();
            }}
          />
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
      <View style={[styles.carousel, { height: 70 }]}>
        <Carousel
          ref={c => {
            _carousel = c;
          }}
          data={datas}
          renderItem={renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width * 0.9}
          firstItem={0}
          removeClippedSubviews={false}
          layout="stack"
          layoutCardOffset={19}
          onSnapToItem={index => {
            setLastDes(datas[index]);
            // _marker.hideCallout();
            onCarouselItemChange(index);
            // lastDes = datas[index];
          }}
        />
      </View>
      <Buttons find={find} distance={distance} setDistance={setDistance} />
    </View>
  );
}

let styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    flex: 10
  },
  carousel: {
    position: 'absolute',
    flex: 1,
    bottom: '1%'
  },
  carouselBtn: {
    flexDirection: 'row'
    // color: '#feee7d'
  },
  carouselRenderContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1
  },
  imageConstainer: {
    flex: 1.5
  },
  renderImage: {
    width: '100%',
    height: 69,
    borderColor: 'red',
    borderWidth: 1
  },
  contentsContainer: { flex: 6, marginLeft: 5 },
  detailContainer: { flex: 2, alignItems: 'flex-end', marginRight: 10 },
  contentsText: {
    fontSize: 12,
    color: 'black'
  }
});
