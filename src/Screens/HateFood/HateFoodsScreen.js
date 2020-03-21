import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { Col, Row, Grid } from 'react-native-easy-grid';
// import { Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { FlatList } from 'react-native-gesture-handler';
import { fakeData } from './fakeData';
import ScrollList from './ScrollList';

export default function HateFoodsScreen({ navigation }) {
  const [notSelectedList, setNotSelectedList] = useState(fakeData);
  const [selectedList, setSelectedList] = useState([]);

  function plus(selected) {
    let selectedArr = selectedList;
    let notSelectedArr = notSelectedList.filter(item => selected !== item);
    selectedArr.push(selected);
    setNotSelectedList(notSelectedArr);
    setSelectedList(selectedArr);
  }

  function minus(selected) {
    let notSelectedArr = notSelectedList;
    let selectedArr = selectedList.filter(item => selected !== item);
    notSelectedArr.push(selected);

    // Number(newArr[0].slice(newArr.indexOf('~')))
    notSelectedArr.sort();

    setNotSelectedList(notSelectedArr);
    setSelectedList(selectedArr);
  }

  useEffect(() => {
    axios('https://mukbank.xyz:5001/restaurant/category').then(res => {
      setNotSelectedList(res.data.sort());
      console.log('axios 작동 하고 있습니다.');
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
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'blue' }}>
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
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'red' }}>
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
              navigation.navigate('Map');
            }}
          >
            음식 추천
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
