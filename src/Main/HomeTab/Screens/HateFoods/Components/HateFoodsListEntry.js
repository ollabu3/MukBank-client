import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row, Grid } from 'react-native-easy-grid';

import styles from '../HateFoodsStyles';
import foodImgs from './foodImgs';

export default function HateFoodsListEntry({
  category, //일식, 중식
  hateList,
  setHateList
}) {
  const [check, setCheck] = useState(false);

  useEffect(() => {
    setCheck(hateList[category]);
  }, [hateList]);

  let checkIcon = null;
  if (check) {
    checkIcon = <Icon name="check-circle-outline" size={25} color="black" />;
  } else {
    checkIcon = (
      <Icon name="checkbox-blank-circle-outline" size={25} color="black" />
    );
  }

  return (
    <View styles={styles.container}>
      <TouchableOpacity
        activeOpacity={1.0}
        style={[styles.Box, styles.boxMargin]}
        onPress={async () => {
          setHateList({ ...hateList, [category]: !check });
        }}
      >
        <Grid>
          <Col size={1} />
          <Col size={3} style={{ justifyContent: 'center' }}>
            <Row
              size={2.5}
              style={{ justifyContent: 'center', alignItems: 'flex-end' }}
            >
              <Image style={styles.categoryImage} source={foodImgs[category]} />
            </Row>
            <Row
              size={1}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </Row>
          </Col>
          <Col size={1} style={{ justifyContent: 'center' }}>
            {checkIcon}
          </Col>
        </Grid>
      </TouchableOpacity>
    </View>
  );
}
