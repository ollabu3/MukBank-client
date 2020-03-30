import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import MapView, { Circle, Callout } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

import Buttons from './Components/Buttons';
import { locations } from './fakeData';

export default function MapScreen({ navigation }) {
  let _carousel;
  let _map;
  let _btn;
  let _marker;
  const [circle, setCircle] = useState(null); //
  // 초기값 => 현재 위치
  const [location, setLocation] = useState({
    latitude: 37,
    longitude: 127
  });
  const [datas, setDatas] = useState(locations); // 식당 데이터 배열      (객체 배열)
  const [direction, setDirection] = useState([]); // 길찾기 배열     (객체 배열)
  const [lastDes, setLastDes] = useState(null); // 길찾기 목적지        (배열)
  const [distance, setDistance] = useState(0.1);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const mapboxKey = '';

  // 길찾기
  function getDirection() {
    axios(
      `https://api.mapbox.com/directions/v5/mapbox/walking/
      ${location.longitude},${location.latitude};${lastDes.longitude},${lastDes.latitude}
      ?geometries=geojson&access_token=${mapboxKey}`
    ).then(res => {
      const coords = res.data.routes[0].geometry.coordinates.map(item => {
        return { latitude: item[1], longitude: item[0] };
      });
      coords.push({
        latitude: Number(lastDes.latitude),
        longitude: Number(lastDes.longitude)
      });
      setDirection(coords);
    });
  }

  // 식당 및 카페 데이터
  function getMarkers() {
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
    });
  }
  // 식당 혹은 카페 정보 가져오기

  useEffect(() => {
    getMarkers();
  }, [location, distance]);

  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      setCircle({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  }, []);

  function onCarouselItemChange(index) {
    const item = datas[index];
    _map.animateToRegion({
      latitude: Number(item.latitude),
      longitude: Number(item.longitude),
      latitudeDelta: distance * 0.03,
      longitudeDelta: distance * 0.03
    });
    _marker.hideCallout();
  }

  function renderItem({ item, index }) {
    return (
      <View style={styles.carouselRenderContainer}>
        <View style={styles.imageConstainer}>
          <Image
            source={require('../HateFood/memo.jpg')}
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
            {`${item.distance.toFixed(2)}Km`}
          </Text>
          <Icon
            name="bike"
            size={25}
            color="red"
            onPress={() => {
              getDirection();
            }}
          />
        </View>
      </View>
    );
  }

  if (!datas || !lastDes) {
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
          _marker = map;
        }}
        style={styles.map}
        region={{
          latitude: Number(location.latitude),
          longitude: Number(location.longitude),
          latitudeDelta: distance * 0.03,
          longitudeDelta: distance * 0.03
        }}
      >
        <MapView.Polyline
          coordinates={direction}
          strokeColor="red"
          fillColor="rgba(255,0,0,0.5)"
          strokeWidth={5}
        />
        <MapView.Marker
          ref={ref => (_map = ref)}
          coordinate={{
            latitude: Number(datas[selectedIndex].latitude),
            longitude: Number(datas[selectedIndex].longitude)
          }}
          onPress={() => {
            getDirection();
          }}
        />
        {circle ? (
          <Circle
            radius={distance * 1000}
            center={{
              latitude: circle.latitude,
              longitude: circle.longitude
            }}
            fillColor="rgba(100, 200, 200, 0.3)"
          />
        ) : (
          <></>
        )}
      </MapView>
      <View style={styles.carousel}>
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
          onSnapToItem={async index => {
            setDirection([]);
            setSelectedIndex(index);
            setLastDes(datas[index]);
            onCarouselItemChange(index);
          }}
        />
      </View>
      <Buttons setDistance={setDistance} distance={distance} />
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
    bottom: '1%',
    height: 110
  },
  carouselRenderContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 15
  },
  imageConstainer: {
    flex: 2,
    justifyContent: 'center'
  },
  renderImage: {
    width: '100%',
    height: 80,
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
