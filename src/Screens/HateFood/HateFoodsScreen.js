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

// import { FlatList } from 'react-native-gesture-handler';
// import { fakeData } from './fakeData';

export default function HateFoodsScreen({ navigation }) {
  const [foodCategory, setFoodCategory] = useState([]);
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
  // useEffect(() => {
  //   axios('https://mukbank.xyz:5001/restaurant/category').then(res => {
  //     setNotSelectedList(res.data.sort());
  //   });
  // }, []);

  // useEffect(() => {
  //   axios.get('https://mukbank.xyz:5001/restaurant/category').then(res => {
  //     // console.log(res.data, '51번째줄');
  //     setFoodCategory(res.data);
  //   });
  // }, []);
  // console.log(foodCategory, '53번째줄');

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
          <HateFoodsList foodCategory={foodCategory} />
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
