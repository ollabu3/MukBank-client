import React from 'react';
import { View, Text } from 'react-native';

export default function MainIng({ name }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text
        style={{
          fontFamily: 'NanumGothic-ExtraBold',
          fontSize: 28,
          color: 'black',
          fontWeight: 'bold'
        }}
      >
        {name}
      </Text>
    </View>
  );
}
