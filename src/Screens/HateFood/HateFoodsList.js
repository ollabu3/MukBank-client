/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import HateFoodsListEntry from './HateFoodsListEntry';

export default function HateFoodsList(props) {
  console.log(props.fakedata, 'HATEFOODSLIST');
  return (
    <View>
      <ScrollView>
        {props.fakedata.map((item, idx) => (
          <View>
            <HateFoodsListEntry key={idx} category={item} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
