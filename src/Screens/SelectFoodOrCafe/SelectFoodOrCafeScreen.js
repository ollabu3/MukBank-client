/* eslint-disable react/prop-types */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import { Row, Grid, Col } from 'react-native-easy-grid';

// import SelectBtn from './SelectBtn';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white'
  },
  headRow: {
    // backgroundColor: 'pink',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  titleText: {
    fontFamily: 'NanumGothic-ExtraBold',
    fontSize: 40,
    color: 'black'
  },
  btnCol: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10
  },
  btnMargin: {
    marginRight: '5%',
    marginLeft: '5%'
  },
  selectText: {
    fontFamily: 'NanumGothic-Bold',
    fontSize: 25,
    color: 'black'
  },
  imgStyle: {
    height: '90%',
    width: '65%',
    position: 'relative',
    marginTop: '5%'
  }
});

export default function SelectFoodOrCafeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Grid>
        <Row size={2} style={[styles.headRow, { marginBottom: '5%' }]}>
          <Text style={styles.titleText}>뭐 먹고 싶어요?</Text>
        </Row>
        <Row size={1.1}>
          <Col size={1} style={[styles.btnCol, styles.btnMargin]}>
            <TouchableOpacity
              activeOpacity={1.0}
              style={styles.btn}
              onPress={() => navigation.navigate('Map')}
            >
              <Row size={3}>
                <Image
                  style={styles.imgStyle}
                  source={require('./selectImages/카페.png')}
                />
              </Row>
              <Row size={1} style={{ alignItems: 'center' }}>
                <Text style={styles.selectText}>카페</Text>
              </Row>
            </TouchableOpacity>
            {/* <SelectBtn btnText={'카페'} navi="Map" /> */}
          </Col>
          <Col size={1} style={[styles.btnCol, styles.btnMargin]}>
            <TouchableOpacity
              activeOpacity={1.0}
              style={styles.btn}
              onPress={() => navigation.navigate('HateFoods')}
            >
              <Row size={3}>
                <Image
                  style={styles.imgStyle}
                  source={require('./selectImages/음식점.png')}
                />
              </Row>
              <Row size={1} style={{ alignItems: 'center' }}>
                <Text style={styles.selectText}>음식점</Text>
              </Row>
            </TouchableOpacity>
            {/* <SelectBtn btnText="음식점" navi="HateFoods" /> */}
          </Col>
        </Row>
        <Row size={2} />
      </Grid>
    </SafeAreaView>
  );
}
