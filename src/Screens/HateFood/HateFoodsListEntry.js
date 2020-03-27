import React from 'react';
import { View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default function HateFoodsListEntry(props) {
  console.log(props.category, 'propsssssssssssssssss');

  return (
    <View>
      <Text>{props.category}</Text>
    </View>
  );
}
