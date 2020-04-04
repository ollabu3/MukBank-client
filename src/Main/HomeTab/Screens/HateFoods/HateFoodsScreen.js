import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

// import { FlatList } from 'react-native-gesture-handler';
// import { fakeData } from './fakeData';
import HateFoodBtn from './Components/HateFoodBtn';
import HateFoodsList from './Components/HateFoodsList';
import HateFoodOverlay from './Components/HateFoodOverlay';

export default function HateFoodsScreen({ navigation, userInfo }) {
  const [foodCategory, setFoodCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');
  const [overlayVisible, setOverlayVisible] = useState(false);
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

  async function getHateList() {
    try {
      const tokenStr = await AsyncStorage.getItem('jwt');
      const token = JSON.parse(tokenStr).jwt;
      const res = await axios('https://mukbank.xyz:5001/user/hatefoodSelect', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.fd_category !== '') {
        const fdArr = res.data.fd_category.split(',');
        const fdObj = fdArr.reduce((acc, cur) => {
          acc[cur] = true;
          return acc;
        }, {});
        setHateList({ ...hateList, ...fdObj });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function postHateList() {
    try {
      const tokenStr = await AsyncStorage.getItem('jwt');
      const token = JSON.parse(tokenStr).jwt;
      await axios({
        method: 'post',
        url: 'https://mukbank.xyz:5001/user/hatefoodUpdate',
        headers: { Authorization: `Bearer ${token}` },
        data: {
          hatefd: hateList
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    axios.get('https://mukbank.xyz:5001/restaurant/category').then(res => {
      setFoodCategory(res.data);
    });
    getHateList();
  }, []);

  useEffect(() => {
    console.log('hateList: ', hateList);
    const hateValueArr = Object.values(hateList);
    const trueValueCnt = hateValueArr.reduce((acc, cur) => {
      if (cur === false) return acc;
      if (cur === true) return acc + 1;
    }, 0);
    console.log('trueValueCnt: ', trueValueCnt);
    if (trueValueCnt === 12) {
      setHateList({ ...hateList, [selectCategory]: false });
      setOverlayVisible(true);
    }
  });

  return (
    <View style={{ backgroundColor: 'white' }}>
      <SafeAreaView>
        <ScrollView>
          <View>
            <HateFoodOverlay
              styles={styles}
              overlayVisible={overlayVisible}
              setOverlayVisible={setOverlayVisible}
            />
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
            setSelectCategory={setSelectCategory}
          />
          <View style={{ marginTop: '5%', marginBottom: '5%' }}>
            <Grid>
              <Col size={3} />
              <Col size={2.4}>
                <HateFoodBtn
                  navigation={navigation}
                  styles={styles}
                  postHateList={postHateList}
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
  },
  overlayTitle: {
    textAlign: 'center',
    fontFamily: 'NanumGothic-ExtraBold',
    fontSize: 28,
    color: '#2c3e50'
  },
  overlayMessage: {
    textAlign: 'center',
    fontFamily: 'NanumGothic-Bold',
    fontSize: 20,
    color: '#130f40'
  }
});
