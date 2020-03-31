/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import HateFoodsListEntry from './HateFoodsListEntry';

export default function HateFoodsList({ foodCategory }) {
  var oddCategory = [];
  var evenCategory = [];

  for (var i = 0; i < foodCategory.length; i++) {
    if (i % 2 === 0) {
      evenCategory.push(foodCategory[i]);
    } else {
      oddCategory.push(foodCategory[i]);
    }
  }

  return (
    <View>
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
    </View>
  );
}
