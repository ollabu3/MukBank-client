import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  Button,
  Dimensions,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

import HateFoodsList from './HateFoodsList';

import axios from 'axios';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { FlatList } from 'react-native-gesture-handler';

import { fakeData } from './fakeData';

export default function HateFoodsScreen({ navigation }) {
  // 위치 권한 허용 Alert
  const [fakedata, setFakedata] = useState(fakeData);

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
  // useEffect(() => {
  //   axios('https://mukbank.xyz:5001/restaurant/category').then(res => {
  //     setNotSelectedList(res.data.sort());
  //   });
  // }, []);

  return (
    <View>
      <SafeAreaView>
        <HateFoodsList fakedata={fakedata} />
        <Button
          title="선택 완료"
          onPress={() => {
            PermissionsLocation();
          }}
        />
      </SafeAreaView>
    </View>
  );
}
