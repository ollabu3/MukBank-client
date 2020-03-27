import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ScrollList(props) {
  console.log(props);
  return (
    <View
      style={{
        position: 'absolute',
        width: '120%',
        // backgroundColor: 'red',
        alignItems: 'center',
        flexDirection: 'row'
      }}
    >
      <Button
        title="100m"
        style={{ flex: 1 }}
        onPress={() => {
          // setDistance(e.target.value);
          props.find();
          props.setDistance(100 / 1000);
        }}
      />
      <Button
        title="200m"
        style={{ width: 200 }}
        onPress={() => {
          // setDistance(e.target.value);
          props.setDistance(200 / 1000);
          props.find();
        }}
      />
      <Button
        title="300m"
        style={{ width: 100 }}
        onPress={() => {
          // setDistance(e.target.value);
          props.setDistance(300 / 1000);
          props.find();
        }}
      />
      <Button
        title="400m"
        style={{ width: 100 }}
        onPress={() => {
          // setDistance(e.target.value);
          props.setDistance(400 / 1000);
          props.find();
        }}
      />
      <Button
        title="500m"
        style={{ width: 100 }}
        onPress={() => {
          // setDistance(e.target.value);
          props.setDistance(500 / 1000);
          props.find();
        }}
      />
    </View>
  );
}
