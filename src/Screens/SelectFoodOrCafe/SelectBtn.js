/* eslint-disable react/prop-types */
import React, { navigation } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Row, Grid, Col } from 'react-native-easy-grid';

const selectimgs = {
  카페: require('./selectImages/카페.png'),
  음식점: require('./selectImages/음식점.png')
};

export default function SelectBtn({ btnText, navi }) {
  return (
    //
    <View>
      <TouchableOpacity
        activeOpacity={1.0}
        style={styles.btn}
        onPress={() => navigation.navigate(navi)}
      >
        <Row size={3}>
          <Image style={styles.imgStyle} source={selectimgs[btnText]} />
        </Row>
        <Row size={1} style={{ alignItems: 'center' }}>
          <Text style={styles.selectText}>{btnText}</Text>
        </Row>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#feee7d',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
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
