/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import HateFoodsListEntry from './HateFoodsListEntry';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function HateFoodsList({ foodCategory }) {
  const [check, setCheck] = useState(false);
  // console.log(foodCategory, '여귕');
  // console.log(foodCategory.length, '여귕길이');

  var oddCategory = [];
  var evenCategory = [];

  for (var i = 0; i < foodCategory.length; i++) {
    if (i % 2 === 0) {
      evenCategory.push(foodCategory[i]);
    } else {
      oddCategory.push(foodCategory[i]);
    }
  }
  // console.log('짝수', evenCategory);
  // console.log('홀수', oddCategory);

  return (
    <View>
      <ScrollView>
        <Grid>
          <Col size={1}>
            {oddCategory.map((item, idx) => (
              <View>
                <HateFoodsListEntry key={idx} category={item} />
              </View>
            ))}
          </Col>
          <Col size={1}>
            {evenCategory.map((item, idx) => (
              <View>
                <HateFoodsListEntry key={idx} category={item} />
              </View>
            ))}
          </Col>
        </Grid>
      </ScrollView>
    </View>
  );
}

/* {oddCategory.map(item => (
              <TouchableOpacity>
                {checkIcon}
                <Text>{item}</Text>
              </TouchableOpacity>
            ))} */
