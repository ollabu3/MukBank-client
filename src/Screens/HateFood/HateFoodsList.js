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

export default function HateFoodsList({ foodCategory }) {
  // console.log(foodCategory, '여귕');
  // console.log(foodCategory.length, '여귕길이');
  /*
그림을 
ㅁ ㅁ
ㅁ ㅁ
ㅁ ㅁ
ㅁ ㅁ
ㅁ ㅁ
ㅁ ㅁ 
이런식으로 UI가 디자인 되었으면 좋겠다.
그러려면..!
엔트리 없이 하는것이 더 편할지도!
HateFoodList에서
prop받은 data를 홀수 짝수 배열로 나누고 Grid로 나눠서 배열해보자
*/
  var oddCategory = [];
  var evenCategory = [];

  for (var i = 0; i < foodCategory.length; i++) {
    if (i % 2 === 0) {
      evenCategory.push(foodCategory[i]);
    } else {
      oddCategory.push(foodCategory[i]);
    }
  }
  console.log('짝수', evenCategory);
  console.log('홀수', oddCategory);

  return (
    <View>
      <ScrollView>
        <Grid>
          <Col size={1}>
            <TouchableOpacity>
              {oddCategory.map(item => (
                <Text>{item}</Text>
              ))}
            </TouchableOpacity>
          </Col>
          <Col size={1}>
            <TouchableOpacity>
              {evenCategory.map(item => (
                <Text>{item}</Text>
              ))}
            </TouchableOpacity>
          </Col>
        </Grid>
      </ScrollView>
    </View>
  );
}

/* {props.fakedata.map((item, idx) => (
          <View>
            <HateFoodsListEntry key={idx} category={item} />
          </View>

        ))} */
