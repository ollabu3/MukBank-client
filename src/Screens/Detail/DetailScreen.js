import React, { useEffect, useState, cloneElement } from 'react';
import { View, Text, Alert, Image, Dimensions } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

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
  return (
    <ScrollView>
      <View style={{ alignItems: 'center', backgroundColor: 'skyblue' }}>
        <Text style={{ fontSize: 50, color: 'white', fontWeight: 'bold' }}>
          {detail.name}
        </Text>
        <Text>{detail.phone}</Text>
        <Text>{detail.roadAddress}</Text>
        <Text>{detail.clock}</Text>
        <Text>{detail.restdetail}</Text>
        <Image
          source={{ uri: detail.image }}
          style={{
            width: 300,
            height: 300
          }}
        />
        <Image
          source={{ uri: detail.menuImage }}
          style={{ width: 200, height: 200 }}
        />
        <Text>{detail.option}</Text>
        <Text>{detail.menu}</Text>
      </View>
    </ScrollView>
  );
}
