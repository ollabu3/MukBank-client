import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';

import MainImg from './Components/MainImg';
import Title from './Components/Title';
import Description from './Components/Description';
import Phone from './Components/Phone';
import Address from './Components/Address';
import Clock from './Components/Clock';
import Option from './Components/Option';
import Menu from './Components/Menu';
import MenuImage from './Components/MenuImg';

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

  // "[\"와이파이\",\"주차장\",\"배달\",\"무료\"]"

  const styles = StyleSheet.create({
    MainImg: {
      width: Dimensions.get('window').width,
      height: 300
    },
    grid: {
      flexDirection: 'row',
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center'
    },
    gridLeft: {
      alignItems: 'center'
    },
    gridLeftSub: {
      fontFamily: 'NanumGothic-ExtraBold'
    },
    gridRightContent: {
      fontFamily: 'NanumGothic'
    }
  });

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
              <Text>이미지 없음</Text>
            </View>
          )}
          <Card>
            <Title name={detail.name} styles={styles} />
          </Card>
          <Card>
            <Description des={detail.restdetail} grid={grid} styles={styles} />
          </Card>
          <Card>
            <Phone phone={detail.phone} grid={grid} styles={styles} />
          </Card>
          <Card>
            <Address address={detail.roadAddress} grid={grid} styles={styles} />
          </Card>
          <Card>
            <Clock clock={detail.clock} grid={grid} styles={styles} />
          </Card>
          <Card>
            <Option option={detail.option} grid={grid} styles={styles} />
          </Card>
          <Card>
            <Menu menu={detail.menu} grid={grid} styles={styles} />
          </Card>
          <MenuImage img={detail.menuImage} style={styles} />
        </View>
      )}
    </ScrollView>
  );
}
