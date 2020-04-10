/* eslint-disable react/prop-types */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  PermissionsAndroid,
  ToastAndroid
} from 'react-native';
import { Row, Grid, Col } from 'react-native-easy-grid';
import styles from './SelectStyles';
import SelectBtn from './Components/SelectBtn';

export default function SelectScreen({ navigation, userInfo }) {
  // console.log('selectScreen userInfo', userInfo);

  // 위치 권한 허용 Alert
  const showToastPermission = () => {
    ToastAndroid.showWithGravity(
      '위치 권한을 허용해 주세요',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const PermissionsLocation = async (navi, select) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '위치 권한 설정',
          message: '"mukbank"에서 위치 권한 설정을 필요로 합니다.',
          buttonPositive: 'OK'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigation.navigate(navi, { parent: select });
      } else {
        showToastPermission();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Grid>
        <Row size={2} style={[styles.headRow, { marginBottom: '5%' }]}>
          <Text style={styles.titleText}>뭐 먹고 싶어요?</Text>
        </Row>
        <Row size={1.1}>
          <SelectBtn
            styles={styles}
            PermissionsLocation={PermissionsLocation}
            navi={'Map'}
            select={'카페'}
          />
          <SelectBtn
            styles={styles}
            PermissionsLocation={PermissionsLocation}
            navi={'HateFoods'}
            select={'음식점'}
          />
          {/*  */}
          {/* <Col size={1} style={[styles.btnCol, styles.btnMargin]}>
            <TouchableOpacity
              activeOpacity={1.0}
              style={styles.btn}
              onPress={() => PermissionsLocation('Map', '카페')}
            >
              <Row size={3}>
                <Image
                  style={styles.imgStyle}
                  source={require('./Components/selectImages/카페.png')}
                />
              </Row>
              <Row size={1} style={{ alignItems: 'center' }}>
                <Text style={styles.selectText}>카페</Text>
              </Row>
            </TouchableOpacity> */}
          {/* <SelectBtn btnText={'카페'} navi="Map" /> */}
          {/* </Col> */}
          {/*  */}
          {/* <Col size={1} style={[styles.btnCol, styles.btnMargin]}>
            <TouchableOpacity
              activeOpacity={1.0}
              style={styles.btn}
              onPress={() => PermissionsLocation('HateFoods', '음식점')}
            >
              <Row size={3}>
                <Image
                  style={styles.imgStyle}
                  source={require('./Components/selectImages/음식점.png')}
                />
              </Row>
              <Row size={1} style={{ alignItems: 'center' }}>
                <Text style={styles.selectText}>음식점</Text>
              </Row>
            </TouchableOpacity> */}
          {/* <SelectBtn btnText="음식점" navi="HateFoods" /> */}
          {/* </Col> */}
          {/*  */}
        </Row>
        <Row size={2} />
      </Grid>
    </SafeAreaView>
  );
}
