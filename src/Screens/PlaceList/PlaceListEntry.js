/* eslint-disable react/self-closing-comp */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';

export default function PlaceListEntry(props) {
  return (
    <View>
      <Text>{props.list.place}</Text>
      <Text>{props.list.menu}</Text>
      <Text>{props.list.distance}</Text>
      <Button
        title="선택"
        onPress={() => props.handleListClick(props.list)}
      ></Button>
    </View>
  );
}

/*
style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
*/
