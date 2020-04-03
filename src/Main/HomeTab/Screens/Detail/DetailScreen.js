import React, { useEffect, useState } from 'react';
import { Text, View, Alert } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Divider } from 'react-native-elements';

import MainImg from './Components/MainImg';
import Description from './Components/Description';
import Phone from './Components/Phone';
import Address from './Components/Address';
import Clock from './Components/Clock';
import Option from './Components/Option';
import Menu from './Components/Menu';
import styles from './DetailStyles';
// import MenuImage from './Components/MenuImg';

export default function DetailScreen({ route, navigation }) {
  const [detail, setDetail] = useState('');
  useEffect(() => {
    axios({
      method: 'post',
      url: 'https://mukbank.xyz:5001/restaurant/detail',
      data: {
        rest_id: route.params.id
      }
    }).then(res => {
      if (res.data === '') {
        navigation.navigate('Map');
        Alert.alert('이 곳은 상세 데이터가 없습니다.');
      } else {
        setDetail(res.data);
      }
    });
  }, []);

  // 주소, 전화번호, 설명, 영업시간 등 grid 좌우 비율
  const grid = {
    left: 1,
    right: 4
  };

  return (
    <ScrollView>
      {detail === '' ? (
        <>
          <Text>정보가 없음</Text>
        </>
      ) : (
        <View>
          {detail.image ? (
            <MainImg img={detail.image} styles={styles} />
          ) : (
            <View>
              <Text>이미지 준비중</Text>
            </View>
          )}
          <Card title={detail.name} titleStyle={styles.title}>
            <Description des={detail.restdetail} grid={grid} styles={styles} />
            <Divider style={styles.divider} />
            <Phone phone={detail.phone} grid={grid} styles={styles} />
            <Divider style={styles.divider} />
            <Address address={detail.roadAddress} grid={grid} styles={styles} />
            <Divider style={styles.divider} />
            <Clock clock={detail.clock} grid={grid} styles={styles} />
            <Divider style={styles.divider} />
            <Option option={detail.option} grid={grid} styles={styles} />
            <Divider style={styles.divider} />
            <Menu menu={detail.menu} grid={grid} styles={styles} />
          </Card>
          <View style={{ height: 50 }} />
          {/* <MenuImage img={detail.menuImage} style={styles} /> */}
        </View>
      )}
    </ScrollView>
  );
}
