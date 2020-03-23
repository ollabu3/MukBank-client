import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  PermissionsAndroid,
  Alert
} from 'react-native';
import axios from 'axios';
import { Col, Row, Grid } from 'react-native-easy-grid';
// import { Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { FlatList } from 'react-native-gesture-handler';
import { fakeData } from './fakeData';
import ScrollList from './ScrollList';

export default function HateFoodsScreen({ navigation, route }) {
  // console.log('헤이트스크린에서', route.params.isLogin);
  const [notSelectedList, setNotSelectedList] = useState(fakeData);
  const [selectedList, setSelectedList] = useState([]);

  // 싫어하는 목록에 추가 할수 있는 메서드
  function plus(selected) {
    let selectedArr = selectedList;
    let notSelectedArr = notSelectedList.filter(item => selected !== item);
    selectedArr.push(selected);
    setNotSelectedList(notSelectedArr);
    setSelectedList(selectedArr);
  }
  // 좋아하는 목록에 추가 할수 있는 메서드
  function minus(selected) {
    let notSelectedArr = notSelectedList;
    let selectedArr = selectedList.filter(item => selected !== item);
    notSelectedArr.push(selected);

    // Number(newArr[0].slice(newArr.indexOf('~')))
    notSelectedArr.sort();

    setNotSelectedList(notSelectedArr);
    setSelectedList(selectedArr);
  }

  // 위치 권한 허용 Alert
  async function PermissionsLocation() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'ReactNativeCode Location Permission',
        message: 'ReactNativeCode App needs access to your location '
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Alert.alert('Location Permission Granted.');
      navigation.navigate('Map');
    } else {
      Alert.alert('Location Permission Not Granted');
    }
  }

  // 카테고리 정보를 가져옴
  useEffect(() => {
    axios('https://mukbank.xyz:5001/restaurant/category').then(res => {
      setNotSelectedList(res.data.sort());
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        source={require('./memo.jpg')}
      >
        <Grid>
          <Col
            style={{
              marginTop: 10,
              marginRight: 5,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'blue' }}>
              조아 하는거
            </Text>
            <ScrollList notSelectedList={notSelectedList} selItem={plus} />
          </Col>
          <Col
            style={{
              marginTop: 10,
              marginLeft: 5,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>
              시러 하는거
            </Text>
            <ScrollList notSelectedList={selectedList} selItem={minus} />
          </Col>
        </Grid>
        <View
          style={{
            height: 80,
            backgroundColor: 'skyblue',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
            marginTop: 5,
            borderRadius: 30
          }}
        >
          <Text
            style={{ fontSize: 30 }}
            onPress={() => {
              PermissionsLocation();
            }}
          >
            음식 추천
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
