import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';
import HateFoodsList from './HateFoodsList';
import { Col, Row, Grid } from 'react-native-easy-grid';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

// import { FlatList } from 'react-native-gesture-handler';
// import { fakeData } from './fakeData';

export default function HateFoodsScreen({ navigation, userInfo }) {
  // console.log('hatefood userinfo: ~~  ', userInfo);

  const [foodCategory, setFoodCategory] = useState([]);
  const [hateList, setHateList] = useState({
    한식: false,
    일식: false,
    양식: false,
    남미음식: false,
    치킨: false,
    중식: false,
    술집: false,
    분식: false,
    동남아음식: false,
    인도음식: false,
    아시아음식: false,
    퓨전음식: false
  });

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

  async function getHateList() {
    const tokenStr = await AsyncStorage.getItem('jwt');
    const token = JSON.parse(tokenStr).jwt;
    const res = await axios('http://10.0.2.2:5001/user/hatefoodSelect', {
      headers: { Authorization: `Bearer ${token}` }
    });
    //* res.data ==> Obj {"fd_category": "일식,중식"}
    //* fdArr ==> [일식, 중식]
    //* fdObj ==> {일식: true, 중식: true}
    const fdArr = res.data.fd_category.split(',');
    const fdObj = fdArr.reduce((acc, cur) => {
      acc[cur] = true;
      return acc;
    }, {});
    setHateList({ ...hateList, ...fdObj });
    console.log('gethatelist  : ', fdObj);
    // console.log('hateList: ', hateList);
  }

  async function postHateList() {
    // tokenStr = String {"jwt": "eyfDFE..."}
    console.log('postHateList clik~!!!!');
    const tokenStr = await AsyncStorage.getItem('jwt');
    const token = JSON.parse(tokenStr).jwt;
    console.log('token~~~', token);
    const res = await axios({
      method: 'post',
      url: 'http://10.0.2.2:5001/user/hatefoodUpdate',
      headers: { Authorization: `Bearer ${token}` },
      data: {
        hatefd: hateList
      }
    });
    console.log('hf res.data~~~', res.data);
  }

  // 카테고리 정보를 가져옴
  // useEffect(() => {
  //   axios('https://mukbank.xyz:5001/restaurant/category').then(res => {
  //     setNotSelectedList(res.data.sort());
  //   });
  // }, []);

  useEffect(() => {
    axios.get('https://mukbank.xyz:5001/restaurant/category').then(res => {
      // console.log(res.data, '51번째줄');
      setFoodCategory(res.data);
    });
    // axios.get('http://10.0.2.2:5001/hello').then(res => console.log(res.data));
    // console.log('hateScreen~~~~~');
    getHateList();
  }, []);

  // useEffect(() => {
  //   console.log('-----------', hateList);
  //   getHateList();
  //   setHateList({ ...hateList, ...fdObj });
  // }, [hateList]);

  console.log(foodCategory, '53번째줄');

  return (
    <View style={{ backgroundColor: 'white' }}>
      <SafeAreaView>
        <ScrollView>
          <View>
            <Text
              style={[
                styles.titleText,
                { marginTop: '5%', marginBottom: '5%' }
              ]}
            >
              오늘은 별로..
            </Text>
          </View>
          <HateFoodsList
            foodCategory={foodCategory}
            hateList={hateList}
            setHateList={setHateList}
          />
          <View style={{ marginTop: '5%', marginBottom: '5%' }}>
            <Grid>
              <Col size={3} />
              <Col size={2.4}>
                <Button
                  raised
                  title="선택 완료"
                  style={styles.completeBtn}
                  titleStyle={{
                    fontFamily: 'NanumGothic-Bold',
                    color: 'black',
                    fontSize: 23
                  }}
                  containerStyle={{ height: 77 }}
                  buttonStyle={{
                    height: '100%',
                    backgroundColor: '#feee7d',
                    borderRadius: 10
                  }}
                  onPress={() => {
                    PermissionsLocation();
                    postHateList();
                  }}
                />
              </Col>
              <Col size={3} />
            </Grid>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'NanumGothic-ExtraBold',
    textAlign: 'center',
    fontSize: 35,
    color: 'black'
  },
  completeBtn: {
    backgroundColor: '#feee7d',
    borderRadius: 10
  }
});
