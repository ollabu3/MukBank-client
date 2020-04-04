/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Row, Grid, Col } from 'react-native-easy-grid';

const selectimgs = {
  카페: require('./selectImages/cafe.png'),
  음식점: require('./selectImages/rest.png')
};

export default function SelectBtn({
  styles,
  PermissionsLocation,
  navi,
  select
}) {
  return (
    <>
      <Col size={1} style={[styles.btnCol, styles.btnMargin]}>
        <TouchableOpacity
          activeOpacity={1.0}
          style={styles.btn}
          onPress={() => PermissionsLocation(navi, select)}
        >
          <Row size={3}>
            <Image style={styles.imgStyle} source={selectimgs[select]} />
          </Row>
          <Row size={1} style={{ alignItems: 'center' }}>
            <Text style={styles.selectText}>{select}</Text>
          </Row>
        </TouchableOpacity>
      </Col>
    </>
  );
}
